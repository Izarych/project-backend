import { PeopleService } from "../people.service";
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from "@nestjs/sequelize";
import { People } from "../people.model";
import { Movie } from "../../movie/movie.model";

describe('MovieService', () => {
  let peopleService: PeopleService;

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

  const movies = [
    {
      "id": 1,
      "title": "1+1",
      "people": []
    },
    {
      "id": 2,
      "title": "Джентльмены",
      "people": []
    }
  ];

  const mockPeopleRepository = {
    findOrCreate: jest.fn((
      filter: {
        where: {
          fullName: string,
          profession: string,
        }
      }
    ) => {

      const foundHuman = people.find((human) =>
        human.fullName === filter.where.fullName &&
        human.profession === filter.where.profession
      )

      return Promise.resolve([foundHuman]);
    }),

    findAll: jest.fn(() => people)
  }

  const mockMovieRepository = {

    findByPk: jest.fn((id: number) => {
      const foundMovie = movies.find((movie) => movie.id === id);
      return {
        ...foundMovie,
        $get(propertyKey: string) {
          return Promise.resolve(this[propertyKey]);
        },
        $set(propertyKey: string, updatedPeople: People[]) {
          this[propertyKey] = updatedPeople;
        }
      }
    }

    ),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getModelToken(People),
          useValue: mockPeopleRepository
        },

        {
          provide: getModelToken(Movie),
          useValue: mockMovieRepository
        },

      ],
      imports: [
      ]
    }).compile();
    peopleService = moduleRef.get<PeopleService>(PeopleService);
  });

  describe('Check created test module', () => {
    it('should be defined', () => {
      expect(peopleService).toBeDefined();
    });
  });

  describe('createGenres', () => {

    describe('when findOrCreate and findByPk called', () => {
      let response, spyFindByPk, spyFindOrCreate;

      beforeAll(async () => {
        spyFindByPk = jest.spyOn(mockMovieRepository, 'findByPk');
        spyFindOrCreate = jest.spyOn(mockPeopleRepository, 'findOrCreate');
        response = await peopleService.createPeoples(1, [
          {
            fullName: "Арно Бертран",
            profession: "Продюсер",
            photo: null
          }
        ]);
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findByPk of mockMovieRepository', async () => {
        expect(spyFindByPk).toHaveBeenCalledTimes(1);
      });

      it('should call findOrCreate of mockGenresRepository', async () => {
        expect(spyFindOrCreate).toHaveBeenCalledTimes(1);
      });

      it('should return undefined ', async () => {
        expect(response).toBeUndefined();
      });

    });
  });

  describe('getPeople', () => {

    describe('when findAll called', () => {
      let response, spy;

      beforeAll(async () => {
        spy = jest.spyOn(mockPeopleRepository, 'findAll');
        response = await peopleService.getPeople()
      });

      afterAll(async () => {
        jest.clearAllMocks();
      });

      it('should call findAll of mockPeopleRepository', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should return undefined ', async () => {
        expect(response).toEqual(people);
      });

    });
  });
});
