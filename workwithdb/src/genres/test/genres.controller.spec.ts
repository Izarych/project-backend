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

});