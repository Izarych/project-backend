import { MovieService } from "../movie.service";
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/sequelize";
import { Movie } from "../movie.model";

describe('MovieService', () => {
  let movieService: MovieService;

  const movies = [
    {
      "id": 1,
      "title": "1+1",
      "originalTitle": "Intouchables",
      "ageRate": 16,
      "rate": 8.8,
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
      "rate": 8.5,
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

})