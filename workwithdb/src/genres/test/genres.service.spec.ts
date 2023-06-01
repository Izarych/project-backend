import { GenresService } from "../genres.service";
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/sequelize";
import { Genres } from "../genres.model";
import { Movie } from "../../movie/movie.model";

describe('MovieService', () => {
  let genresService: GenresService;

  const genres = [
    {
      "id": 1,
      "title": "биография",
    },
    {
      "id": 2,
      "title": "комедия",
    },
    {
      "id": 3,
      "title": "драма",
    },
    {
      "id": 4,
      "title": "боевик",
    },
    {
      "id": 5,
      "title": "криминал",
    }
  ];

  const movies = [
    {
      "id": 1,
      "title": "1+1",
      "genres": [
        {
          "id": 1,
          "title": "биография"
        }
      ]
    },
    {
      "id": 2,
      "title": "Джентльмены"
    }
  ];

  const mockGenresRepository = {
    findOrCreate: jest.fn((
      filter: {
        where: {
          genre: any,
        }
      }
    ) => {

      const foundGenre = genres.find((genre) =>
        genre.title === filter.where.genre
      )

      return Promise.resolve([foundGenre]);
    }),
  }

  const mockMovieRepository = {

    findByPk: jest.fn((id: number) => {
      const foundMovie = movies.find((movie) => movie.id === id);
      return {
        ...foundMovie,
        $get(propertyKey: string) {
          return Promise.resolve(this[propertyKey]);
        },
        $set(propertyKey: string, updatedGenre: Genres[]) {
          this[propertyKey] = updatedGenre;
        }
      }
    }

    ),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        {
          provide: getModelToken(Genres),
          useValue: mockGenresRepository
        },

        {
          provide: getModelToken(Movie),
          useValue: mockMovieRepository
        },

      ],
      imports: [
      ]
    }).compile();
    genresService = moduleRef.get<GenresService>(GenresService);
  });

  describe('Check created test module', () => {
    it('should be defined', () => {
      expect(genresService).toBeDefined();
    });
  });

  describe('createGenres', () => {

    describe('when findOrCreate and findByPk called', () => {
      let response, spyFindByPk, spyFindOrCreate;

      beforeAll(async () => {
        spyFindByPk = jest.spyOn(mockMovieRepository, 'findByPk');
        spyFindOrCreate = jest.spyOn(mockGenresRepository, 'findOrCreate');
        response = await genresService.createGenres(1, ['комедия', 'драма']);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findByPk of mockMovieRepository', async () => {
        expect(spyFindByPk).toHaveBeenCalledTimes(1);
      });

      it('should call findOrCreate of mockGenresRepository', async () => {
        expect(spyFindOrCreate).toHaveBeenCalledTimes(2);
      });

      it('should return undefined ', async () => {
        expect(response).toBeUndefined();
      });

    });
  });

});
