import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Movie } from '../src/movie/movie.model';
import { AppModule } from '../src/app.module';
import { People } from '../src/people/people.model';
import { ConfigModule } from '@nestjs/config';
import { MovieGenres } from '../src/genres/moviegenres.model';
import { Genres } from '../src/genres/genres.model';
import { MoviePeople } from '../src/people/moviepeople.model';

describe('Movie (e2e)', () => {

  let app: INestApplication;

  const movies = [
    {
      "id": 1,
      "title": "1+1",
      "originalTitle": "Intouchables",
      "ageRate": 16,
      "country": "Франция",
      "rate": 8.8,
      "rateQuantity": 1570549,
      "genres": [
        {
          "id": 3,
          "title": "биография"
        },
        {
          "id": 2,
          "title": "комедия"
        },
        {
          "id": 1,
          "title": "драма"
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
      "country": "Великобритания, США",
      "rate": 8.5,
      "rateQuantity": 1369010,
      "genres": [
        {
          "id": 5,
          "title": "боевик"
        },
        {
          "id": 2,
          "title": "комедия"
        },
        {
          "id": 4,
          "title": "криминал"
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

    findOne: jest.fn(),

    findAll: jest.fn().mockResolvedValue(movies),

    findByPk: jest.fn((id: number) =>
      movies.find((movie) => movie.id == id)
    ),
  }


  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [Movie, Genres, People, MoviePeople, MovieGenres],
          autoLoadModels: true
        }),
        AppModule],
    })
      .overrideProvider(getModelToken(Movie))
      .useValue(mockMovieRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET movie', () => {

    it(`should return all movie records`, () => {
      return request(app.getHttpServer())
        .get(`/movie`)
        .expect(200)
        .expect(movies);
    });
  })

  describe('/GET movie/age/:ageRate', () => {

    const ageRate = 16;

    beforeAll(async () => {
      jest.spyOn(mockMovieRepository, 'findAll').mockResolvedValueOnce([]);
    });

    afterAll(async () => {
      jest.clearAllMocks();
    });

    it(`should return movies whose age rate does not exceed the specified age rate`, () => {
      return request(app.getHttpServer())
        .get(`/movie/age/${ageRate}`)
        .expect(200)
        .expect([]);
    });
  })

  describe('/GET movie/country/:countries', () => {

    const countries = 'США';

    it(`should return array containing movies that match the country`, () => {
      return request(app.getHttpServer())
        .get(`/movie/country/${encodeURIComponent(countries)}`)
        .expect(200)
        .expect([movies[1]]);
    });
  })

  describe('/GET movie/genre/:genre', () => {

    it(`should return array containing movies that match the genre`, () => {
      return request(app.getHttpServer())
        .get(`/movie/genre/${encodeURIComponent('комедия')}`)
        .expect(200)
        .expect(movies);
    });
  })

  describe('/GET movie/rate/:rate', () => {

    const rate = 8.8;

    beforeAll(async () => {
      jest.spyOn(mockMovieRepository, 'findAll').mockResolvedValueOnce([movies[0]]);
    });

    afterAll(async () => {
      jest.clearAllMocks();
    });

    it(`should return movies whose rate is not less than the given rate`, () => {
      return request(app.getHttpServer())
        .get(`/movie/rate/${rate}`)
        .expect(200)
        .expect([movies[0]]);
    });
  })

  describe('/GET movie/ratequan/:ratequan', () => {

    const ratequan = 1500000;

    beforeAll(async () => {
      jest.spyOn(mockMovieRepository, 'findAll').mockResolvedValueOnce([movies[0]]);
    });

    afterAll(async () => {
      jest.clearAllMocks();
    });

    it(`should return movies whose rate quantity is not less than the given rate quantity`, () => {
      return request(app.getHttpServer())
        .get(`/movie/ratequan/${ratequan}`)
        .expect(200)
        .expect([movies[0]]);
    });
  })

  describe('/GET movie/human/:fullName', () => {

    it(`should return the movies in which the human with the given full name is involved`, () => {
      return request(app.getHttpServer())
        .get(`/movie/human/${encodeURIComponent('Гай Ричи')}`)
        .expect(200)
        .expect([movies[1]]);
    });
  })

  describe('/GET movie/:id', () => {

    const id = 1;

    it(`should return a movie record with the given id`, () => {
      return request(app.getHttpServer())
        .get(`/movie/${id}`)
        .expect(200)
        .expect(movies[0]);
    });
  })

  describe('/GET movie/:id/people', () => {

    const id = 1;

    it(`should find movie record with given id and return the people who match it`, () => {
      return request(app.getHttpServer())
        .get(`/movie/${id}/people`)
        .expect(200)
        .expect(movies[0].people);
    });
  })

  describe('/GET movie/:id/genre', () => {

    const id = 1;

    it(`should find movie record with given id and return the genres that match it`, () => {
      return request(app.getHttpServer())
        .get(`/movie/${id}/genres`)
        .expect(200)
        .expect(movies[0].genres);
    });
  })

  describe('/GET movie/title/:title', () => {

    const title = '1+1';

    beforeAll(async () => {
      jest.spyOn(mockMovieRepository, 'findOne').mockResolvedValueOnce(movies[0]);
    });

    afterAll(async () => {
      jest.clearAllMocks();
    });

    it(`should return movie with sent title`, () => {
      return request(app.getHttpServer())
        .get(`/movie/title/${title}`)
        .expect(200)
        .expect(movies[0]);
    });
  })

  afterAll(async () => {
    await app.close();
  });
});