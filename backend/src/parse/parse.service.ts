// import {Inject, Injectable} from '@nestjs/common';
// import * as puppeteer from 'puppeteer';
// import {ClientProxy} from "@nestjs/microservices";
// import {firstValueFrom} from "rxjs";
// import {Page} from "puppeteer";
//
//
//
// @Injectable()
// export class ParseService {
//     constructor(@Inject('DB_SERVICE') private dbClient: ClientProxy) {
//     }
//
//     async parse() {
//         const urls = [];
//         const browser = await puppeteer.launch({
//             headless: false,
//             defaultViewport: null,
//         });
//
//         for (let i = 1; i < 15; i++) {
//             let pageUrl = `https://www.kinopoisk.ru/lists/movies/?page=${i}`
//             let page = await browser.newPage();
//             await page.goto(pageUrl, {
//                 waitUntil: 'domcontentloaded'
//             });
//
//             const movies = await page.$$('.styles_root__ti07r');
//             for (const movie of movies) {
//                 const linkEl = await movie.$('.styles_root__wgbNq');
//                 const link = await linkEl.evaluate(el => el.getAttribute('href'));
//                 const url = 'https://www.kinopoisk.ru/' + link;
//                 urls.push(url);
//             }
//
//             for (const url of urls) {
//                 const randomDelay = Math.floor(Math.random() * 1500) + 1000;
//                 let movieDto = {
//                     title: null,
//                     originalTitle: null,
//                     ageRate: null,
//                     description: null,
//                     yearSince: null,
//                     yearTill: null,
//                     verticalPhoto: null,
//                     horizontalPhoto: null,
//                     trailer: null,
//                     country: null,
//                     premierRussia: null,
//                     premier: null,
//                     seasons: null,
//                     rate: null,
//                     rateQuantity: null
//                 }
//
//                 let actors = [];    //Актеры
//                 let directors = []; //Режиссеры
//                 let producers = []; //Продюсеры
//                 let operators = []; //Оперы
//                 let writers = [];   //Писатели
//                 let genres = []; // Жанры
//                 let isSeries = false;
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 await page.goto(url, {
//                     waitUntil: 'domcontentloaded',
//                 });
//
//                 let titleEl = await page.$('.styles_title__65Zwx');
//                 if (!titleEl) {
//                     titleEl = await page.$('[data-tid="2da92aed"]');
//                     movieDto.title = await page.evaluate((el: HTMLElement) => el.innerText, titleEl)
//                     isSeries = true;
//                 } else {
//                     const titleText = await page.evaluate((el: HTMLElement) => el.innerText, titleEl);
//                     const title = titleText.split(' ');
//                     title.pop();
//                     movieDto.title = title.join(' ');
//
//                 }
//
//                 const originalTitleEl = await page.$('.styles_originalTitle__JaNKM');                                   //второе название
//                 if (originalTitleEl) {
//                     movieDto.originalTitle = await page.evaluate((el: HTMLElement) => el.innerText.trim(), originalTitleEl);
//                 }
//
//                 const ageRateEl = await page.$('.styles_ageRate__340KC');
//                 const ageRate = await page.evaluate((el: HTMLElement) => el.innerText.trim(), ageRateEl);
//                 movieDto.ageRate = parseInt(ageRate);
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 const elements = await page.$$('[data-test-id="encyclopedic-table"] .styles_row__da_RK');
//                 for (const element of elements) {
//                     const titleEl = await element.$('.styles_title__b1HVo');
//                     const title = await page.evaluate((el: HTMLElement) => el.innerText.trim(), titleEl);
//                     switch (title) {
//                         case 'Год производства':
//                             if (isSeries) {
//                                 const yearEl = await page.$('.styles_title___itJ6');
//                                 const yearRaw = await page.evaluate((el: HTMLElement) => el.innerText, yearEl);
//                                 let years = yearRaw.split("сериал")[1].match(/\d{4}/g);
//                                 movieDto.yearSince = years[0];
//
//                                 if (years[1]) {
//                                     movieDto.yearTill = years[1];
//                                 } else {
//                                     movieDto.yearTill = new Date().getFullYear();
//                                 }
//
//                                 const seasonsEl = await element.$('.styles_value__g6yP4');
//                                 const seasonRaw = await page.evaluate((el: HTMLElement) => el.innerText.trim(), seasonsEl);
//                                 movieDto.seasons = Number(seasonRaw.split('(')[1].replace(/\D/g, ""));
//                                 break;
//                             }
//                             const yearEl = await element.$('.styles_value__g6yP4');
//                             const year = await page.evaluate((el: HTMLElement) => el.innerText.trim(), yearEl);
//                             movieDto.yearSince = Number(year);
//                             movieDto.yearTill = Number(year);
//                             break;
//                         case 'Жанр':
//                             const genreEl = await element.$('.styles_value__g6yP4 .styles_value__g6yP4');
//                             const genre = await page.evaluate((el: HTMLElement) => el.innerText.trim(), genreEl);
//                             genres = genre.split(',');
//                             for (let index = 0; index < genres.length; index++) {
//                                 if (genres[index][0] == " ") {
//                                     genres[index] = genres[index].slice(1);
//                                 }
//
//                             }
//                             break;
//                         case 'Страна':
//                             const countryEl = await element.$('.styles_value__g6yP4');
//                             const country = await page.evaluate((el: HTMLElement) => el.innerText.trim(), countryEl);
//                             movieDto.country = country;
//                             break;
//                         case 'Премьера в России':
//                             const premierRussiaEl = await element.$('.styles_value__g6yP4 .styles_link__3QfAk');
//                             const premierRussia = await page.evaluate((el: HTMLElement) => el.innerText.trim(), premierRussiaEl);
//                             movieDto.premierRussia = premierRussia;
//                             break;
//                         case 'Премьера в мире':
//                             const premierEl = await element.$('.styles_value__g6yP4 .styles_link__3QfAk');
//                             const premier = await page.evaluate((el: HTMLElement) => el.innerText.trim(), premierEl);
//                             movieDto.premier = premier;
//                             break;
//                     }
//
//
//                 }
//                 const descriptionEl = await page.$('.styles_paragraph__wEGPz');
//                 movieDto.description = await page.evaluate((el: HTMLElement) => el.innerText, descriptionEl);
//
//                 const rateEl = await page.$('.styles_root__2kxYy .styles_md_17__FaWtp .styles_lg_6__eGSDb .film-rating-value')
//
//                 if (rateEl) {
//                     const rate = await page.evaluate((el: HTMLElement) => el.innerText, rateEl)
//                     movieDto.rate = Number(rate);
//                 }
//
//                 const rateQuantityEl = await page.$('.styles_root__2kxYy .styles_md_17__FaWtp .styles_lg_6__eGSDb .styles_countBlock__jxRDI')
//
//                 if (rateQuantityEl) {
//                     const rateQuantityRaw = await page.evaluate((el: HTMLElement) => el.innerText, rateQuantityEl);
//                     let rateQuantity = rateQuantityRaw.split(' ');
//                     rateQuantity.pop();
//                     let rateQuantityCorrect = rateQuantity.join('')
//                     movieDto.rateQuantity = Number(rateQuantityCorrect);
//                 }
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 actors = await this.stealCreators(page, `${url}cast/who_is/actor/`, 'Актёр')
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 directors = await this.stealCreators(page, `${url}cast/who_is/director/`, 'Режиссёр');
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//
//                 producers = await this.stealCreators(page, `${url}cast/who_is/producer/`, 'Продюсер');
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 writers = await this.stealCreators(page, `${url}cast/who_is/writer/`, 'Сценарист');
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 operators = await this.stealCreators(page, `${url}cast/who_is/operator/`, 'Оператор');
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 movieDto.verticalPhoto = await this.stealVerticalPhoto(page, `${url}covers/`);
//
//                 await new Promise(resolve => setTimeout(resolve, randomDelay));
//
//                 movieDto.horizontalPhoto = await this.stealHorizontalPhoto(page, `${url}wall/`)
//
//                 if (!movieDto.horizontalPhoto) {
//                     movieDto.horizontalPhoto = movieDto.verticalPhoto;
//                 }
//                 const movie = await firstValueFrom(this.dbClient.send('create_movie', movieDto));
//                 await this.dbClient.emit('create_genres', {id: movie.id, arr: genres});
//                 await this.dbClient.emit('create_peoples', {id: movie.id, arr: directors});
//                 await this.dbClient.emit('create_peoples', {id: movie.id, arr: actors});
//                 await this.dbClient.emit('create_peoples', {id: movie.id, arr: producers});
//                 await this.dbClient.emit('create_peoples', {id: movie.id, arr: writers});
//                 await this.dbClient.emit('create_peoples', {id: movie.id, arr: operators});
//
//             }
//             urls.length = 0;
//             await page.close();
//
//         }
//     }
//
//     private async stealCreators(page, url, profession: string) {
//         let array = [];
//
//
//         url = url.replace('series', "film");
//
//         await page.goto(url, {
//             waitUntil: 'domcontentloaded',
//         });
//
//         const itemsEl = await page.$$('.dub .actorInfo');
//
//         if (!itemsEl) {
//             return array;
//         }
//
//         for (const items of itemsEl) {
//             let humanDto = {
//                 fullName: null,
//                 fullNameOrig: null,
//                 profession: null,
//                 photo: null
//             }
//             const nameEl = await items.$('.info .name a')
//             const name = await page.evaluate((el: HTMLElement) => el.innerText.trim(), nameEl);
//             const origNameEl = await items.$('.info .name span');
//             const origNameRaw = await page.evaluate((el: HTMLElement) => el.innerText.trim(), origNameEl);
//             const picEl = await items.$('.photo a')
//             let picLink = await picEl.evaluate(el => el.getAttribute('href'));
//             picLink = 'https://www.kinopoisk.ru' + picLink;
//
//
//             if (origNameRaw != " ") {
//                 let origName = origNameRaw.split("(")[0];
//                 if (origName[origName.length - 1] == " ") {
//                     origName = origName.slice(0, (origName.length - 1));
//                 }
//                 humanDto.fullNameOrig = origName;
//             }
//             humanDto.fullName = name;
//             humanDto.profession = profession;
//             humanDto.photo = picLink;
//
//             array.push(humanDto);
//         }
//
//         array = await this.stealPplImg(page, array);
//         return array;
//     }
//
//     private async stealPplImg(page, array) {
//         const noImgLink = 'https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-logo/placeholder.svg';
//         const randomDelay = Math.floor(Math.random() * 1500) + 1000;
//         await new Promise(resolve => setTimeout(resolve, randomDelay));
//         let newArr = [];
//         for (const element of array) {
//             await page.goto(element.photo, {
//                 waitUntil: 'domcontentloaded',
//             });
//
//             const linkEl = await page.$('.styles_photo__Is7OJ .styles_root__DZigd');
//             const cutLink = await linkEl.evaluate(el => el.getAttribute('src'));
//             if (cutLink != noImgLink) {
//                 const img = 'https:' + cutLink;
//                 newArr.push({ ...element, photo: img });
//             } else {
//                 newArr.push({ ...element, photo: null });
//             }
//         }
//         return newArr;
//     }
//
//     private async stealVerticalPhoto(page: Page, url: string) {
//         url = url.replace('series', "film");
//         await page.goto(url, {
//             waitUntil: 'domcontentloaded'
//         })
//         const elements = await page.$$('.styles_root__iY1K3 .styles_root__oV7Oq')
//         for (const element of elements) {
//             const imgEl = await element.$('.styles_root__OQv_q')
//             const img = await imgEl.evaluate(el => el.getAttribute('href'));
//             const resolutionEl = await element.$('.styles_root__zVSCC')
//             const [width, height] = await resolutionEl.evaluate((el: HTMLElement) => el.innerText.split('×'));
//             if (Number(width) >= 1000 && Number(height) > 1000) {
//                 return 'https:' + img;
//             }
//         }
//     }
//
//     private async stealHorizontalPhoto(page: Page, url: string) {
//         url = url.replace('series', "film");
//         await page.goto(url, {
//             waitUntil: 'domcontentloaded'
//         })
//         const elements = await page.$$('.styles_root__iY1K3 .styles_root__oV7Oq')
//         for (const element of elements) {
//             const imgEl = await element.$('.styles_root__OQv_q')
//             const img = await imgEl.evaluate(el => el.getAttribute('href'));
//             const resolutionEl = await element.$('.styles_root__zVSCC')
//             const [width, height] = await resolutionEl.evaluate((el: HTMLElement) => el.innerText.split('×'));
//             if (Number(width) >= 1600 && Number(height) >= 900) {
//                 return 'https:' + img;
//             }
//         }
//     }
// }
//
