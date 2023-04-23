import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { MovieService } from "../movie/movie.service";
import { GenresService } from "../genres/genres.service";
import { PeopleService } from "../people/people.service";
import { ImagesService } from 'src/imgs/imgs.service';


@Injectable()
export class ParseService {
    constructor(private movieService: MovieService,
        private genreService: GenresService,
        private peopleService: PeopleService,
        private imagesService: ImagesService) {
    }

    //Данные: Рейтинг MPAA?, Награды?, Рейтинги?
    async parse() {
        const urls = [];
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        // перехожу на страницу со списком фильмов, 2 страницы для теста делал, в идеале 15-20 спарсить
        for (let i = 1; i < 2; i++) {
            let pageUrl = `https://www.kinopoisk.ru/lists/movies/?page=${i}`
            let page = await browser.newPage();
            await page.goto(pageUrl, {
                waitUntil: 'domcontentloaded'
            });
            // пушу ссылки фильмов в массив
            const movies = await page.$$('.styles_root__ti07r');
            for (const movie of movies) {
                const linkEl = await movie.$('.styles_root__wgbNq');
                const link = await linkEl.evaluate(el => el.getAttribute('href'));
                const url = 'https://www.kinopoisk.ru/' + link;
                urls.push(url);
            }
            // по каждой ссылке все тяну с фильма
            for (const url of urls) {
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



                let actors = [];    //актеры
                let directors = []; //Режисеры
                let producers = []; //Проды
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
                    const titleText = await page.evaluate((el: HTMLElement) => el.innerText, titleEl);
                    movieDto.title = titleText
                    isSeries = true;
                } else {
                    const titleText = await page.evaluate((el: HTMLElement) => el.innerText, titleEl);
                    const title = titleText.split(' ');
                    title.pop();
                    movieDto.title = title.join(' ');

                }

                // console.log(title[0]);

                const originalTitleEl = await page.$('.styles_originalTitle__JaNKM');                                   //второе название
                if (originalTitleEl) {
                    movieDto.originalTitle = await page.evaluate((el: HTMLElement) => el.innerText.trim(), originalTitleEl);
                    // console.log(originalTitle);
                }


                const ageRateEl = await page.$('.styles_ageRate__340KC');
                movieDto.ageRate = await page.evaluate((el: HTMLElement) => el.innerText.trim(), ageRateEl);
                // console.log(ageRate);

                await new Promise(resolve => setTimeout(resolve, 1000));

                const elements = await page.$$('[data-test-id="encyclopedic-table"] .styles_row__da_RK');
                for (const element of elements) {
                    const titleEl = await element.$('.styles_title__b1HVo');
                    const title = await page.evaluate((el: HTMLElement) => el.innerText.trim(), titleEl);



                    switch (title) {
                        case 'Год производства':
                            if (isSeries) {
                                const yearEl = await page.$('.styles_title___itJ6');
                                const yearRaw = await page.evaluate((el: HTMLElement) => el.innerText, yearEl);
                                let year = yearRaw.split('(')[1].replace(")", "").replace("сериал", "").slice(1);
                                movieDto.year = year;
                                const seasonsEl = await element.$('.styles_value__g6yP4');
                                const seasonRaw = await page.evaluate((el: HTMLElement) => el.innerText.trim(), seasonsEl);
                                let season = seasonRaw.split('(')[1].replace(/\D/g, "");
                                movieDto.seasons = season;
                                break;
                            }
                            const yearEl = await element.$('.styles_value__g6yP4');
                            const year = await page.evaluate((el: HTMLElement) => el.innerText.trim(), yearEl);
                            movieDto.year = year;
                            //console.log(year);
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
                            //console.log(genres);
                            break;
                        case 'Страна':
                            const countryEl = await element.$('.styles_value__g6yP4');
                            const country = await page.evaluate((el: HTMLElement) => el.innerText.trim(), countryEl);
                            movieDto.country = country;
                            // console.log(country.split(','));
                            break;
                        case 'Премьера в России':
                            const premierRussiaEl = await element.$('.styles_value__g6yP4 .styles_link__3QfAk');
                            const premierRussia = await page.evaluate((el: HTMLElement) => el.innerText.trim(), premierRussiaEl);
                            movieDto.premierRussia = premierRussia;
                            // console.log(premierRussia);
                            break;
                        case 'Премьера в мире':
                            const premierEl = await element.$('.styles_value__g6yP4 .styles_link__3QfAk');
                            const premier = await page.evaluate((el: HTMLElement) => el.innerText.trim(), premierEl);
                            movieDto.premier = premier;
                            // console.log(premier);
                            break;
                    }


                }
                const descriptionEl = await page.$('.styles_paragraph__wEGPz');
                movieDto.description = await page.evaluate((el: HTMLElement) => el.innerText, descriptionEl);

                // console.log(description);

                await new Promise(resolve => setTimeout(resolve, 1500));

                actors = await this.stealCreators(page, `${url}cast/who_is/actor/`, 'Актёр')

                await new Promise(resolve => setTimeout(resolve, 1500));

                directors = await this.stealCreators(page, `${url}cast/who_is/director/`, 'Режиссёр');

                await new Promise(resolve => setTimeout(resolve, 1500));


                producers = await this.stealCreators(page, `${url}cast/who_is/producer/`, 'Продюсер');

                await new Promise(resolve => setTimeout(resolve, 1500));

                writers = await this.stealCreators(page, `${url}cast/who_is/writer/`, 'Сценарист');

                await new Promise(resolve => setTimeout(resolve, 1500));

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

                await new Promise(resolve => setTimeout(resolve, 1500));

                posters = await this.stealFilmImgs(page, `${url}posters/`);


                await new Promise(resolve => setTimeout(resolve, 1500));

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
        const array = [];


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
            picLink = 'https://www.kinopoisk.ru/' + picLink;


            if (origNameRaw != " ") {
                let origName = origNameRaw.split("(")[0];
                if (origName[origName.length - 1] == " ") {
                    origName = origName.slice(0, (origName.length - 1));
                }
                humanDto.fullNameOrig = origName;
            }
            humanDto.fullName = name;
            humanDto.profession = profession;

            // await new Promise(resolve => setTimeout(resolve, 1500));
            // humanDto.photo = await this.stealPplImg(picLink);
            
            array.push(humanDto);


        }
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

    // private async stealPplImg(url) {
    //     const browser = await puppeteer.launch({
    //         headless: false,
    //         defaultViewport: null,
    //     });
    //     let page = await browser.newPage();

    //     await page.goto(url, {
    //         waitUntil: 'domcontentloaded'
    //     });
    //     let link;

    //     await page.goto(url, {
    //         waitUntil: 'domcontentloaded',
    //     });

    //     const imgEl = await page.$$('.styles_photoWrapper__zJrQf');
    //     for (const img of imgEl) {
    //         const cutLinkEl = await img.$('.styles_image__lSxoD')
    //         link = await cutLinkEl.evaluate(el => el.getAttribute('src'));

    //     }
    //     await browser.close();
    //     return link;
    // }


}

    // Надо вытянуть всю подобную инфу типо страна, слоган и т д
    // Но миллион ифов не варик писать, нужно будет с сайта много что тянуть
    // Пока что такие варианты (придумал на сонную голову, если что придет в голову пиши в тг или если с каким-то согласен):
    // 1. Сделать через switch/case (все равно много кода, но не так плохо выглядит)
    // 2. Создать массив с тайтлами которые нужно вытянуть, потом сделать цикл по массиву и как только тайтл совпадет
    // с названием в массиве тянуть его и переходить на следующий элемент цикла (слишком много кода и будет не особо читаемо)
    // 3. Не придумывать велосипед, вытянуть все тайтлы и дернуть с каждого инфу, так то нам все равно
    // нужна инфа со всех тайтлов в "О фильме" (как по мне норм варик, надо будет попробовать)
    // Если будешь что-то менять/делать и пушить файл, коммить тогда что изменил, будем привыкать потиху
    // Пока работаем с "О фильме", как только сделаем это по красоте, остальные колонки спарсим по аналогии
    // и перейдем уже к тому, что сделаем цикл который будет на каждый фильм переходить и все парсить
    // Таймауты пока не пишем, будем писать только когда надо будет постоянно страницы менять, пока работаем с одной
    // Комменты из функции можешь удалить, я их оставил чтобы тебе проще было влиться в puppeteer
    // Эти комменты не удаляй пусть будут, будем еще добавлять сюда инфу/способы, потом удалим их

