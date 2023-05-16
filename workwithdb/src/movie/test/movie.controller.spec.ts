import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from "../movie.controller";
import { MovieService } from "../movie.service";
import { Movie } from '../movie.model';


describe('AppController', () => {
    let movieController: MovieController;
    let movieService: MovieService;

    const movies = [
      {
        "id": 1,
        "title": "1+1",
        "originalTitle": "Intouchables",
        "ageRate": 16,
        "description": "Описание 1+1",
        "yearSince": 2011,
        "yearTill": 2011,
        "country": "Франция",
        "premierRussia": "26 апреля 2012",
        "premier": "23 сентября 2011",
        "seasons": null,
        "rate": 8.8,
        "rateQuantity": 1570549,
        "verticalPhoto": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
        "horizontalPhoto": "https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/56bf76fb-58e9-42b6-94d8-9e3bd4c58e85/orig",
        "trailer": null,
        "createdAt": "2023-04-30T01:45:13.907Z",
        "updatedAt": "2023-04-30T01:45:13.907Z",
        "genres": [
            {
                "id": 3,
                "genre": "биография"
            },
            {
                "id": 2,
                "genre": "комедия"
            },
            {
                "id": 1,
                "genre": "драма"
            }
        ],
        "people": [
            {
                "id": 4,
                "fullName": "Матьё Вадпьед",
                "profession": "Оператор"
            },
            {
                "id": 2,
                "fullName": "Франсуа Клюзе",
                "profession": "Актёр"
            },
            {
                "id": 3,
                "fullName": "Арно Бертран",
                "profession": "Продюсер"
            },
            {
                "id": 5,
                "fullName": "Оливье Накаш",
                "profession": "Сценарист"
            },
            {
                "id": 6,
                "fullName": "Доминик Бутонна",
                "profession": "Продюсер"
            },
            {
                "id": 7,
                "fullName": "Эрик Толедано",
                "profession": "Режиссёр"
            },
            {
                "id": 8,
                "fullName": "Эрик Толедано",
                "profession": "Сценарист"
            },
            {
                "id": 9,
                "fullName": "Омар Си",
                "profession": "Актёр"
            },
            {
                "id": 10,
                "fullName": "Юбер Кайлар",
                "profession": "Продюсер"
            }
        ]
    },
    {
        "id": 2,
        "title": "Джентльмены",
        "originalTitle": "The Gentlemen",
        "ageRate": 18,
        "description": "Описание Джентльмены",
        "yearSince": 2019,
        "yearTill": 2019,
        "country": "Великобритания, США",
        "premierRussia": "13 февраля 2020",
        "premier": "3 декабря 2019",
        "seasons": null,
        "rate": 8.5,
        "rateQuantity": 1369010,
        "verticalPhoto": "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d5cc31da-ec0c-4e4f-9282-614da6a5dbf2/orig",
        "horizontalPhoto": "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d5cc31da-ec0c-4e4f-9282-614da6a5dbf2/orig",
        "trailer": null,
        "createdAt": "2023-04-30T01:49:09.614Z",
        "updatedAt": "2023-04-30T01:49:09.614Z",
        "genres": [
            {
                "id": 5,
                "genre": "боевик"
            },
            {
                "id": 2,
                "genre": "комедия"
            },
            {
                "id": 4,
                "genre": "криминал"
            }
        ],
        "people": [
            {
                "id": 58,
                "fullName": "Мэттью МакКонахи",
                "profession": "Актёр"
            },
            {
                "id": 59,
                "fullName": "Гай Ричи",
                "profession": "Сценарист"
            },
            {
                "id": 60,
                "fullName": "Алан Стюарт",
                "profession": "Оператор"
            },
            {
                "id": 62,
                "fullName": "Чарли Ханнэм",
                "profession": "Актёр"
            },
            {
                "id": 63,
                "fullName": "Айван Эткинсон",
                "profession": "Сценарист"
            },
            {
                "id": 61,
                "fullName": "Айван Эткинсон",
                "profession": "Продюсер"
            },
            {
                "id": 64,
                "fullName": "Генри Голдинг",
                "profession": "Актёр"
            },
            {
                "id": 65,
                "fullName": "Марн Дэвис",
                "profession": "Сценарист"
            },
            {
                "id": 66,
                "fullName": "Билл Блок",
                "profession": "Продюсер"
            },
            {
                "id": 67,
                "fullName": "Хью Грант",
                "profession": "Актёр"
            },
        ]
    }
    ];

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [
                {
                    provide: MovieService,
                    useValue: {
                      getAllMovies: jest.fn().mockResolvedValue({}),
                      getMovieByAgeRate: jest.fn().mockResolvedValue({}),
                      getMovieByCountry: jest.fn().mockResolvedValue({}),
                        
                    },
                },
            ],
            imports: [
      
            ]
        }).compile();

        movieController = moduleRef.get<MovieController>(MovieController);
        movieService = moduleRef.get<MovieService>(MovieService);
    });

    describe('Check created test module', () => {
        it('should be defined', () => {
            expect(movieController).toBeDefined();
        });
    });

    describe('getMovies', () => {
      describe('when getMovies called', () => {

          let response;

          beforeEach(async () => {
            jest.spyOn(movieService, 'getAllMovies').mockResolvedValue(movies as Movie[]);
            response = await movieController.getMovies();
          });

          it('should call app service', async () => {
              expect(movieService.getAllMovies).toHaveBeenCalled();
          });

          it('should return array containing all movies', async () => {
              expect(response).toEqual(movies);
          });
      });
  });

  describe('getMovieByAgeRate', () => {
    describe('when getMovieByAgeRate called', () => {

        let response;
        const ageRate = 16;

        beforeEach(async () => {
          jest.spyOn(movieService, 'getMovieByAgeRate').mockResolvedValue([movies[0]] as Movie[]);
          response = await movieController.getMovieByAgeRate(ageRate);
        });

        it('should call app service with age rate', async () => {
            expect(movieService.getMovieByAgeRate).toHaveBeenCalledWith(ageRate);
        });

        it('should return array containing movies that match the age rate', async () => {
            expect(response).toEqual([movies[0]]);
        });
    });
  });

    describe('getMovieByCountry', () => {
      describe('when getMovieByCountry called', () => {
  
          let response;
          const country = 'Франция';
  
          beforeEach(async () => {
            jest.spyOn(movieService, 'getMovieByCountry').mockResolvedValue([movies[0]] as Movie[]);
            response = await movieController.getMovieByCountry(country);
          });
  
          it('should call app service with country', async () => {
              expect(movieService.getMovieByCountry).toHaveBeenCalledWith(country);
          });
  
          it('should return array containing movies that match the country', async () => {
              expect(response).toEqual([movies[0]]);
          });

      });

    });

});
