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

describe('People (e2e)', () => {

  let app: INestApplication;

  const people = [
    {
      "id": 1,
      "fullName": "Матьё Вадпьед",
      "profession": "Оператор"
    },
    {
      "id": 2,
      "fullName": "Арно Бертран",
      "profession": "Продюсер"
    },
    {
      "id": 3,
      "fullName": "Мэттью МакКонахи",
      "profession": "Актёр"
    }
  ];

  const mockPeopleRepository = {
    findAll: jest.fn().mockResolvedValue(people)
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
      .overrideProvider(getModelToken(People))
      .useValue(mockPeopleRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET people', () => {

    it(`should return all people records`, () => {
      return request(app.getHttpServer())
        .get(`/people`)
        .expect(200)
        .expect(people);
    });
  })

  describe('/GET people/:fullName', () => {

    const fullName = 'Мэттью МакКонахи';

    beforeAll(async () => {
      jest.spyOn(mockPeopleRepository, 'findAll').mockResolvedValueOnce(people[2]);
    });

    afterAll(async () => {
      jest.clearAllMocks();
    });

    it(`should return people by full name`, () => {
      return request(app.getHttpServer())
        .get(`/people/${encodeURIComponent(fullName)}`)
        .expect(200)
        .expect(people[2]);
    });
  })

  afterAll(async () => {
    await app.close();
  });
});
