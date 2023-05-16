import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from "../movie.controller";
import { MovieService } from "../movie.service";
import { Movie } from '../movie.model';
import { People } from '../../people/people.model';
import { Genres } from '../../genres/genres.model';


describe('AppController', () => {
  let movieController: MovieController;
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
            getMovieByGenre: jest.fn().mockResolvedValue({}),
            getMovieByRate: jest.fn().mockResolvedValue({}),
            getMovie: jest.fn().mockResolvedValue({}),
            getMoviePeople: jest.fn().mockResolvedValue({}),
            getMovieGenres: jest.fn().mockResolvedValue({}),
            getMovieByTitle: jest.fn().mockResolvedValue({}),
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

  describe('getMovieByGenre', () => {
    describe('when getMovieByGenre called', () => {

      let response;
      const genre = 'комедия';

      beforeEach(async () => {
        jest.spyOn(movieService, 'getMovieByGenre').mockResolvedValue([movies[0], movies[1]] as Movie[]);
        response = await movieController.getMovieByGenre(genre);
      });

      it('should call app service with genre', async () => {
        expect(movieService.getMovieByGenre).toHaveBeenCalledWith(genre);
      });

      it('should return array containing movies that match the genre', async () => {
        expect(response).toEqual([movies[0], movies[1]]);
      });

    });
  });

  describe('getMovieByRate', () => {
    describe('when getMovieByRate called', () => {

      let response;
      const rate = 8.5;

      beforeEach(async () => {
        jest.spyOn(movieService, 'getMovieByRate').mockResolvedValue([movies[1]] as Movie[]);
        response = await movieController.getMovieByRate(rate);
      });

      it('should call app service with rate', async () => {
        expect(movieService.getMovieByRate).toHaveBeenCalledWith(rate);
      });

      it('should return array containing movies that match the rate', async () => {
        expect(response).toEqual([movies[1]]);
      });

    });
  });

  describe('getMovie', () => {
    describe('when getMovie called', () => {

      let response;
      const id = 2;

      beforeEach(async () => {
        jest.spyOn(movieService, 'getMovie').mockResolvedValue(movies[1] as Movie);
        response = await movieController.getMovie(id);
      });

      it('should call app service with id', async () => {
        expect(movieService.getMovie).toHaveBeenCalledWith(id);
      });

      it('should return movie with sent id', async () => {
        expect(response).toEqual(movies[1]);
      });

    });
  });

  describe('getMoviePeople', () => {
    describe('when getMoviePeople called', () => {

      let response;
      const id = 2;

      beforeEach(async () => {
        jest.spyOn(movieService, 'getMoviePeople').mockResolvedValue(movies[1].people as People[]);
        response = await movieController.getMoviePeople(id);
      });

      it('should call app service with id', async () => {
        expect(movieService.getMoviePeople).toHaveBeenCalledWith(id);
      });

      it('should return people', async () => {
        expect(response).toEqual(movies[1].people);
      });

    });
  });

  describe('getMovieGenres', () => {
    describe('when getMovieGenres called', () => {

      let response;
      const id = 2;

      beforeEach(async () => {
        jest.spyOn(movieService, 'getMovieGenres').mockResolvedValue(movies[1].genres as Genres[]);
        response = await movieController.getMovieGenres(id);
      });

      it('should call app service with id', async () => {
        expect(movieService.getMovieGenres).toHaveBeenCalledWith(id);
      });

      it('should return genres', async () => {
        expect(response).toEqual(movies[1].genres);
      });

    });
  });

  describe('getMovieByTitle', () => {
    describe('when getMovieByTitle called', () => {

      let response;
      const title = 'Джентльмены';

      beforeEach(async () => {
        jest.spyOn(movieService, 'getMovieByTitle').mockResolvedValue(movies[1] as Movie);
        response = await movieController.getMovieByTitle(title);
      });

      it('should call app service with title', async () => {
        expect(movieService.getMovieByTitle).toHaveBeenCalledWith(title);
      });

      it('should return movie with sent title', async () => {
        expect(response).toEqual(movies[1]);
      });

    });
  });


});
