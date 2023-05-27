import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from "../movie.controller";
import { MovieService } from "../movie.service";
import { Genres } from '../../genres/genres.model';


describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

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
      "country": "Великобритания, США",
      "rate": 8.5,
      "rateQuantity": 1369010,
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
            getAllMovies: jest.fn(() => movies),

            getMovieByAgeRate: jest.fn((ageRate: number) =>
              movies.filter((movie) => movie.ageRate <= ageRate)
            ),

            getMovieByCountry: jest.fn((countries: string) =>
              movies.filter((movie) => movie.country === countries)
            ),

            getMovieByGenre: jest.fn((genre: string) =>
              movies.filter((movie) =>
                movie.genres.find((item) => item.genre === genre)
              )
            ),

            getMovieByRate: jest.fn((rate: number) =>
              movies.filter((movie) => movie.rate >= rate)
            ),

            getMovieByHuman: jest.fn((fullName: string) =>
              movies.filter((movie) =>
                movie.people.find((human) => human.fullName === fullName)
              )
            ),

            getMovieByRateQuantity: jest.fn((rateQuantity: number) =>
              movies.filter((movie) => movie.rateQuantity >= rateQuantity)
            ),

            getMovie: jest.fn((id: number) =>
              movies.find((movie) => movie.id === id)
            ),

            getMoviePeople: jest.fn((id: number) =>
              movies.find((movie) => movie.id === id).people
            ),

            getMovieGenres: jest.fn((id: number) =>
              movies.find((movie) => movie.id === id).genres
            ),

            getMovieByTitle: jest.fn((title: string) =>
              movies.find((movie) => movie.title === title)
            ),
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

      let response, spy;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getAllMovies');
        response = await movieController.getMovies();
      });

      it('should call app service', async () => {
        expect(spy).toHaveBeenCalled();
      });

      it('should return array containing all movies', async () => {
        expect(response).toEqual(movies);
      });
    });
  });

  describe('getMovieByAgeRate', () => {
    describe('when getMovieByAgeRate called', () => {

      let response, spy;
      const ageRate = 16;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByAgeRate');
        response = await movieController.getMovieByAgeRate(ageRate);
      });

      it('should call app service with age rate', async () => {
        expect(spy).toHaveBeenCalledWith(ageRate);
      });

      it('should return movies whose age rate does not exceed the specified age rate', async () => {
        expect(response).toEqual([movies[0]]);
      });
    });
  });

  describe('getMovieByRateQuantity', () => {
    describe('when getMovieByRateQuantity called', () => {

      let response, spy;
      const rateQuantity = 2000000;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByRateQuantity');
        response = await movieController.getMovieByRateQuantity(rateQuantity);
      });

      it('should call app service with rateQuantity', async () => {
        expect(spy).toHaveBeenCalledWith(rateQuantity);
      });

      it('should return movies whose rate quantity is not less than the given rate quantity', async () => {
        expect(response).toEqual([]);
      });
    });
  });

  describe('getMovieByHuman', () => {
    describe('when getMovieByHuman called', () => {

      let response, spy;
      const fullName = 'Гай Ричи';

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByHuman');
        response = await movieController.getMovieByHuman(fullName);
      });

      it('should call app service with fullName', async () => {
        expect(spy).toHaveBeenCalledWith(fullName);
      });

      it('should return the movies in which the human with the given full name is involved', async () => {
        expect(response).toEqual([movies[1]]);
      });
    });
  });

  describe('getMovieByCountry', () => {
    describe('when getMovieByCountry called', () => {

      let response, spy;
      const country = 'Франция';

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByCountry');
        response = await movieController.getMovieByCountry(country);
      });

      it('should call app service with country', async () => {
        expect(spy).toHaveBeenCalledWith(country);
      });

      it('should return array containing movies that match the country', async () => {
        expect(response).toEqual([movies[0]]);
      });

    });
  });

  describe('getMovieByGenre', () => {
    describe('when getMovieByGenre called', () => {

      let response, spy;
      const genre = 'комедия';

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByGenre');
        response = await movieController.getMovieByGenre(genre);
      });

      it('should call app service with genre', async () => {
        expect(spy).toHaveBeenCalledWith(genre);
      });

      it('should return array containing movies that match the genre', async () => {
        expect(response).toEqual(movies)
      });

    });
  });

  describe('getMovieByRate', () => {
    describe('when getMovieByRate called', () => {

      let response, spy;
      const rate = 8.5;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByRate');
        response = await movieController.getMovieByRate(rate);
      });

      it('should call app service with rate', async () => {
        expect(spy).toHaveBeenCalledWith(rate);
      });

      it('should return movies whose rate is not less than the given rate', async () => {
        expect(response).toEqual(movies);
      });

    });
  });

  describe('getMovie', () => {
    describe('when getMovie called', () => {

      let response, spy;
      const id = 2;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovie');
        response = await movieController.getMovie(id);
      });

      it('should call app service with id', async () => {
        expect(spy).toHaveBeenCalledWith(id);
      });

      it('should return movie with sent id', async () => {
        expect(response).toEqual(movies[1]);
      });

    });
  });

  describe('getMoviePeople', () => {
    describe('when getMoviePeople called', () => {

      let response, spy;
      const id = 2;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMoviePeople');
        response = await movieController.getMoviePeople(id);
      });

      it('should call app service with id', async () => {
        expect(spy).toHaveBeenCalledWith(id);
      });

      it('should return people', async () => {
        expect(response).toEqual(movies[1].people);
      });

    });
  });

  describe('getMovieGenres', () => {
    describe('when getMovieGenres called', () => {

      let response, spy;
      const id = 2;

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieGenres').mockResolvedValue(movies[1].genres as Genres[]);
        response = await movieController.getMovieGenres(id);
      });

      it('should call app service with id', async () => {
        expect(spy).toHaveBeenCalledWith(id);
      });

      it('should return genres', async () => {
        expect(response).toEqual(movies[1].genres);
      });

    });
  });

  describe('getMovieByTitle', () => {
    describe('when getMovieByTitle called', () => {

      let response, spy;
      const title = 'Джентльмены';

      beforeEach(async () => {
        spy = jest.spyOn(movieService, 'getMovieByTitle');
        response = await movieController.getMovieByTitle(title);
      });

      it('should call app service with title', async () => {
        expect(spy).toHaveBeenCalledWith(title);
      });

      it('should return movie with sent title', async () => {
        expect(response).toEqual(movies[1]);
      });

    });
  });


});
