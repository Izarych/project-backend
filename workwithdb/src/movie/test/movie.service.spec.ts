import { MovieService } from "../movie.service";
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/sequelize";
import { Movie } from "../movie.model";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { Op } from "sequelize";

describe('MovieService', () => {
  let movieService: MovieService;

  const dto = [
    {
      "title": "1+1",
      "originalTitle": "Intouchables",
      "ageRate": 16,
      "description": "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
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
    },
    {
      "title": "Волк с Уолл-стрит",
      "originalTitle": "The Wolf of Wall Street",
      "ageRate": 18,
      "description": "1987 год. Джордан Белфорт становится брокером в успешном инвестиционном банке. Вскоре банк закрывается после внезапного обвала индекса Доу-Джонса. По совету жены Терезы Джордан устраивается в небольшое заведение, занимающееся мелкими акциями. Его настойчивый стиль общения с клиентами и врождённая харизма быстро даёт свои плоды. Он знакомится с соседом по дому Донни, торговцем, который сразу находит общий язык с Джорданом и решает открыть с ним собственную фирму. В качестве сотрудников они нанимают нескольких друзей Белфорта, его отца Макса и называют компанию «Стрэттон Оукмонт». В свободное от работы время Джордан прожигает жизнь: лавирует от одной вечеринки к другой, вступает в сексуальные отношения с проститутками, употребляет множество наркотических препаратов, в том числе кокаин и кваалюд. Однажды наступает момент, когда быстрым обогащением Белфорта начинает интересоваться агент ФБР...",
      "yearSince": 2013,
      "yearTill": 2013,
      "country": "США",
      "premierRussia": "6 февраля 2014",
      "premier": "9 декабря 2013",
      "seasons": null,
      "rate": 8,
      "rateQuantity": 1095012,
      "verticalPhoto": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/orig",
      "horizontalPhoto": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/40edbec8-9611-4a27-bd97-702c49f24df1/orig",
      "trailer": null,
    }
  ]

  const movies = [
    {
      "id": 1,
      ...dto[0],
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
      ]
    },
    {
      "id": 2,
      "title": "Джентльмены",
      "originalTitle": "The Gentlemen",
      "ageRate": 18,
      "description": "Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.",
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
      ]

    }
  ];

  const mockMovieRepository = {

    findOne: jest.fn(filter => {
      const movie = movies.find((movie) =>
        movie.title == filter.where.title &&
        movie.originalTitle == filter.where.originalTitle &&
        movie.ageRate == filter.where.ageRate &&
        movie.yearSince == filter.where.yearSince &&
        movie.yearTill == filter.where.yearTill &&
        movie.country == filter.where.country
      )
      return Promise.resolve(movie);
    }),

    create: jest.fn((dto: CreateMovieDto) => {
      const movie = {
        id: Date.now(),
        ...dto
      }
      return Promise.resolve(movie);
    }),



    findAll: jest.fn(() => {
      return Promise.resolve(movies);
    }),


    findByPk: jest.fn((id: number) =>
      movies.find((movie) => movie.id === id)
    ),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie),
          useValue: mockMovieRepository
        },

      ],
      imports: [
      ]
    }).compile();
    movieService = moduleRef.get<MovieService>(MovieService);
  });

  describe('Check created test module', () => {
    it('should be defined', () => {
      expect(movieService).toBeDefined();
    });
  });

  describe('createMovie', () => {

    describe('when create called', () => {
      let response, spyFindOne, spyCreate;

      beforeAll(async () => {
        spyFindOne = jest.spyOn(mockMovieRepository, 'findOne');
        spyCreate = jest.spyOn(mockMovieRepository, 'create');
        response = await movieService.createMovie(dto[1]);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findOne of mockMovieRepository', async () => {
        expect(spyFindOne).toHaveBeenCalledTimes(1);
      });

      it('should call create of mockMovieRepository', async () => {
        expect(spyCreate).toHaveBeenCalledTimes(1);
      });

      it('should create a new movie record and return that', async () => {
        expect(response).toEqual({ id: expect.any(Number), ...dto[1] });
      });

    });

    describe('when create is not called', () => {
      let response, spyFindOne, spyCreate;

      beforeAll(async () => {
        spyFindOne = jest.spyOn(mockMovieRepository, 'findOne');
        spyCreate = jest.spyOn(mockMovieRepository, 'create');
        response = await movieService.createMovie(dto[0]);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findOne of mockMovieRepository', async () => {
        expect(spyFindOne).toHaveBeenCalledTimes(1);
      });

      it('should`t call create of mockMovieRepository', async () => {
        expect(spyCreate).toHaveBeenCalledTimes(0);
      });

      it('should find a movie record and return that', async () => {
        expect(response).toEqual(movies[0]);
      });

    });

  });

  describe('getAllMovies', () => {

    describe('when getAllMovies called', () => {
      let response, spy;

      beforeAll(async () => {
        spy = jest.spyOn(mockMovieRepository, 'findAll');
        response = await movieService.getAllMovies();
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findAll of mockMovieRepository', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should find all movie records and return them', async () => {
        expect(response).toEqual(movies);
      });

    });

  });

  describe('getMovie', () => {

    describe('when getMovie called', () => {
      let response, spy;
      const id = 1;

      beforeAll(async () => {
        spy = jest.spyOn(mockMovieRepository, 'findByPk');
        response = await movieService.getMovie(id);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findByPk of mockMovieRepository', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should find movie record with given id and return that', async () => {
        expect(response).toEqual(movies[0]);
      });

    });

  });

  describe('getMoviePeople', () => {

    describe('when getMoviePeople called', () => {
      let response, spy;
      const id = 1;

      beforeAll(async () => {
        spy = jest.spyOn(mockMovieRepository, 'findByPk');
        response = await movieService.getMoviePeople(id);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findByPk of mockMovieRepository', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should find movie record with given id and return the people who match it', async () => {
        expect(response).toEqual(movies[0].people);
      });

    });

  });

  describe('getMovieGenres', () => {

    describe('when getMovieGenres called', () => {
      let response, spy;
      const id = 1;

      beforeAll(async () => {
        spy = jest.spyOn(mockMovieRepository, 'findByPk');
        response = await movieService.getMovieGenres(id);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findByPk of mockMovieRepository', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should find movie record with given id and return the genres that match it', async () => {
        expect(response).toEqual(movies[0].genres);
      });

    });

  });

  describe('getMovieByAgeRate', () => {
    describe('when getMovieByAgeRate called', () => {
      let response, spy;
      const ageRate = 16;

      beforeAll(async () => {
        spy = jest.spyOn(mockMovieRepository, 'findAll').mockImplementationOnce((
          filter?: {
            where: {
              ageRate: any,
            }
          }) => {

          const filteredMovies = movies.filter((movie) =>
            movie.ageRate <= filter.where.ageRate[Op.lte]
          )

          return Promise.resolve(filteredMovies);
        });
        response = await movieService.getMovieByAgeRate(ageRate);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findAll of mockMovieRepository', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should return movies whose age rate does not exceed the specified age rate', async () => {
        expect(response).toEqual([movies[0]]);
      });

    });

  });


})