import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from "../genres.controller";
import { GenresService } from "../genres.service";


describe('MovieController', () => {
  let genresController: GenresController;
  let genresService: GenresService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [
        {
          provide: GenresService,
          useValue: {
            createGenres: jest.fn()
          },
        },
      ],
      imports: [

      ]
    }).compile();

    genresController = moduleRef.get<GenresController>(GenresController);
    genresService = moduleRef.get<GenresService>(GenresService);
  });

  describe('Check created test module', () => {
    it('should be defined', () => {
      expect(genresController).toBeDefined();
    });
  });

  describe('createGenres', () => {
    describe('when createGenres called', () => {

      let response, spy;

      beforeEach(async () => {
        spy = jest.spyOn(genresService, 'createGenres');
        response = await genresController.createGenres({id: 1, arr: ['боевик']});
      });

      it('should call app service with id and array', async () => {
        expect(spy).toHaveBeenCalledWith(1, ['боевик']);
      });

      it('should return undefined', async () => {
        expect(response).toBeUndefined();
      });

    });
  });



});