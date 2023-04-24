import {Injectable} from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import {MovieService} from "../movie/movie.service";
import {GenresService} from "../genres/genres.service";
import {PeopleService} from "../people/people.service";
import {ImagesService} from 'src/imgs/imgs.service';


@Injectable()
export class ParseService {
    constructor(private movieService: MovieService,
        private genreService: GenresService,
        private peopleService: PeopleService,
        private imagesService: ImagesService) {
    }

    async parse() {
        const urls = [];
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });

        for (let i = 2; i < 15; i++) {
            let pageUrl = `https://www.kinopoisk.ru/lists/movies/?page=${i}`
            let page = await browser.newPage();
            await page.goto(pageUrl, {
                waitUntil: 'domcontentloaded'
            });

            const movies = await page.$$('.styles_root__ti07r');
            for (const movie of movies) {
                const linkEl = await movie.$('.styles_root__wgbNq');
                const link = await linkEl.evaluate(el => el.getAttribute('href'));
                const url = 'https://www.kinopoisk.ru/' + link;
                urls.push(url);
            }

            for (const url of urls) {
                const randomDelay = Math.floor(Math.random() * 1500) + 1000;
                let movieDto = {
                    title: null,
                    originalTitle: null,
                    ageRate: null,
                    description: null,
                    year: null,
                    country: null,
                    premierRussia: null,
                    premier: null,
                    seasons: null
                }

                let actors = [];    //Актеры
                let directors = []; //Режиссеры
                let producers = []; //Продюсеры
                let operators = []; //Оперы
                let writers = [];   //Писатели
                let genres = [];
                let isSeries = false;
                let posters = [];
                let covers = [];

                // let translators = [];   //переводчик
                // let dubbingActors = []; //дубляж
                // let dubbingDirectors = [];  //реж дубля
                // let composers = [];     //композиторы
                // let editors = [];       //монтажеры
                // let artists = [];       //художники

                await page.goto(url, {
                    waitUntil: 'domcontentloaded',
                });



                let titleEl = await page.$('.styles_title__65Zwx');
                if (!titleEl) {
                    titleEl = await page.$('[data-tid="2da92aed"]');
                    movieDto.title = await page.evaluate((el: HTMLElement) => el.innerText, titleEl)
                    isSeries = true;
                } else {
                    const titleText = await page.evaluate((el: HTMLElement) => el.innerText, titleEl);
                    const title = titleText.split(' ');
                    title.pop();
                    movieDto.title = title.join(' ');

                }

                const originalTitleEl = await page.$('.styles_originalTitle__JaNKM');                                   //второе название
                if (originalTitleEl) {
                    movieDto.originalTitle = await page.evaluate((el: HTMLElement) => el.innerText.trim(), originalTitleEl);
                }


                const ageRateEl = await page.$('.styles_ageRate__340KC');
                movieDto.ageRate = await page.evaluate((el: HTMLElement) => el.innerText.trim(), ageRateEl);

                await new Promise(resolve => setTimeout(resolve, randomDelay));

                const elements = await page.$$('[data-test-id="encyclopedic-table"] .styles_row__da_RK');
                for (const element of elements) {
                    const titleEl = await element.$('.styles_title__b1HVo');
                    const title = await page.evaluate((el: HTMLElement) => el.innerText.trim(), titleEl);



                    switch (title) {
                        case 'Год производства':
                            if (isSeries) {
                                const yearEl = await page.$('.styles_title___itJ6');
                                const yearRaw = await page.evaluate((el: HTMLElement) => el.innerText, yearEl);
                                movieDto.year = yearRaw.split('(')[1].replace(")", "").replace("сериал", "").slice(1);
                                const seasonsEl = await element.$('.styles_value__g6yP4');
                                const seasonRaw = await page.evaluate((el: HTMLElement) => el.innerText.trim(), seasonsEl);
                                movieDto.seasons = seasonRaw.split('(')[1].replace(/\D/g, "");
                                break;
                            }
                            const yearEl = await element.$('.styles_value__g6yP4');
                            const year = await page.evaluate((el: HTMLElement) => el.innerText.trim(), yearEl);
                            movieDto.year = year;
                            break;
                        case 'Жанр':
                            const genreEl = await element.$('.styles_value__g6yP4 .styles_value__g6yP4');
                            const genre = await page.evaluate((el: HTMLElement) => el.innerText.trim(), genreEl);
                            genres = genre.split(',');
                            for (let index = 0; index < genres.length; index++) {
                                if (genres[index][0] == " ") {
                                    genres[index] = genres[index].slice(1);
                                }

                            }
                            break;
                        case 'Страна':
                            const countryEl = await element.$('.styles_value__g6yP4');
                            const country = await page.evaluate((el: HTMLElement) => el.innerText.trim(), countryEl);
                            movieDto.country = country;
                            break;
                        case 'Премьера в России':
                            const premierRussiaEl = await element.$('.styles_value__g6yP4 .styles_link__3QfAk');
                            const premierRussia = await page.evaluate((el: HTMLElement) => el.innerText.trim(), premierRussiaEl);
                            movieDto.premierRussia = premierRussia;
                            break;
                        case 'Премьера в мире':
                            const premierEl = await element.$('.styles_value__g6yP4 .styles_link__3QfAk');
                            const premier = await page.evaluate((el: HTMLElement) => el.innerText.trim(), premierEl);
                            movieDto.premier = premier;
                            break;
                    }


                }
                const descriptionEl = await page.$('.styles_paragraph__wEGPz');
                movieDto.description = await page.evaluate((el: HTMLElement) => el.innerText, descriptionEl);


                await new Promise(resolve => setTimeout(resolve, randomDelay));

                actors = await this.stealCreators(page, `${url}cast/who_is/actor/`, 'Актёр')

                await new Promise(resolve => setTimeout(resolve, randomDelay));

                directors = await this.stealCreators(page, `${url}cast/who_is/director/`, 'Режиссёр');

                await new Promise(resolve => setTimeout(resolve, randomDelay));


                producers = await this.stealCreators(page, `${url}cast/who_is/producer/`, 'Продюсер');

                await new Promise(resolve => setTimeout(resolve, randomDelay));

                writers = await this.stealCreators(page, `${url}cast/who_is/writer/`, 'Сценарист');

                await new Promise(resolve => setTimeout(resolve, randomDelay));

                operators = await this.stealCreators(page, `${url}cast/who_is/operator/`, 'Оператор');


                // await new Promise(resolve => setTimeout(resolve, 1500));
                //
                // dubbingDirectors = await this.stealNamesOfCreators(page, `${url}cast/who_is/voice_director/`);
                //
                // await new Promise(resolve => setTimeout(resolve, 1500));
                //
                // translators = await this.stealNamesOfCreators(page, `${url}cast/who_is/translator/`);
                //
                //
                // await new Promise(resolve => setTimeout(resolve, 1500));
                //
                // dubbingActors = await this.stealNamesOfCreators(page, `${url}cast/who_is/voice/`);
                //
                // await new Promise(resolve => setTimeout(resolve, 1500));
                //
                // composers = await this.stealNamesOfCreators(page, `${url}cast/who_is/composer/`);
                //
                // await new Promise(resolve => setTimeout(resolve, 1500));
                //
                // artists = await this.stealNamesOfCreators(page, `${url}cast/who_is/design/`);


                // await new Promise(resolve => setTimeout(resolve, 1500));
                //
                // editors = await this.stealNamesOfCreators(page, `${url}cast/who_is/editor/`);

                await new Promise(resolve => setTimeout(resolve, randomDelay));

                posters = await this.stealFilmImgs(page, `${url}posters/`);


                await new Promise(resolve => setTimeout(resolve, randomDelay));

                covers = await this.stealFilmImgs(page, `${url}covers/`);

                posters.push(...covers);


                const movie = await this.movieService.createMovie(movieDto);
                await this.genreService.createGenres(movie.id, genres);

                await this.peopleService.createPeoples(movie.id, directors);
                await this.peopleService.createPeoples(movie.id, actors);
                await this.peopleService.createPeoples(movie.id, producers);
                await this.peopleService.createPeoples(movie.id, writers);
                await this.peopleService.createPeoples(movie.id, operators);
                await this.imagesService.createImages(movie.id, posters);
            }
            urls.length = 0;
            await page.close();

        }
    }

    private async stealCreators(page, url, profession: string) {
        let array = [];


        url = url.replace('series', "film");

        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });

        const itemsEl = await page.$$('.dub .actorInfo');

        if (!itemsEl) {
            return [];
        }

        for (const items of itemsEl) {
            let humanDto = {
                fullName: null,
                fullNameOrig: null,
                profession: null,
                photo: null
            }
            const nameEl = await items.$('.info .name a')
            const name = await page.evaluate((el: HTMLElement) => el.innerText.trim(), nameEl);
            const origNameEl = await items.$('.info .name span');
            const origNameRaw = await page.evaluate((el: HTMLElement) => el.innerText.trim(), origNameEl);
            const picEl = await items.$('.photo a')
            let picLink = await picEl.evaluate(el => el.getAttribute('href'));
            picLink = 'https://www.kinopoisk.ru' + picLink;


            if (origNameRaw != " ") {
                let origName = origNameRaw.split("(")[0];
                if (origName[origName.length - 1] == " ") {
                    origName = origName.slice(0, (origName.length - 1));
                }
                humanDto.fullNameOrig = origName;
            }
            humanDto.fullName = name;
            humanDto.profession = profession;

            humanDto.photo = picLink;
            
            array.push(humanDto);


        }
        array = await this.stealPplImg(page, array);
        return array;
    }

    private async stealFilmImgs(page, url) {
        const array = [];

        url = url.replace('series', "film");

        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });

        const imgEl = await page.$$('.styles_content__MF1k9 .styles_root__iY1K3 .styles_root__oV7Oq');

        for (const img of imgEl) {
            const cutLinkEl = await img.$('.styles_root__OQv_q');
            const cutLink = await cutLinkEl.evaluate(el => el.getAttribute('href'));
            array.push('https:' + cutLink);
        }
        return array;
    }

    private async stealPplImg(page, array) {
        const randomDelay = Math.floor(Math.random() * 1500) + 1000;
        let newArr = [];
        for (const element of array) {
            await new Promise(resolve => setTimeout(resolve, randomDelay));

            await page.goto(element.photo, {
                waitUntil: 'domcontentloaded',
            });

            const linkEl = await page.$('.styles_photo__Is7OJ a')
            if (linkEl) {
                await new Promise(resolve => setTimeout(resolve, randomDelay));
                await page.goto(element.photo + 'photos/', {
                    waitUntil: 'domcontentloaded'
                })

                const imgEl = await page.$('.styles_root__iY1K3 .styles_root__oV7Oq');
                const img = await imgEl.$('.styles_root__OQv_q');
                const photo = element.photo = await img.evaluate(el => el.getAttribute('href'))
                newArr.push({...element, photo: photo})
            }
            else newArr.push({...element, photo: null})
        }
        return newArr;

    }


}


