import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from "../people.controller";
import { PeopleService } from "../people.service";


describe('MovieController', () => {
  let peopleController: PeopleController;
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

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: {
            createPeoples: jest.fn(),
            getPeople: jest.fn(() => people)
          },
        },
      ],
      imports: [

      ]
    }).compile();

    peopleController = moduleRef.get<PeopleController>(PeopleController);
    peopleService = moduleRef.get<PeopleService>(PeopleService);
  });

  describe('Check created test module', () => {
    it('should be defined', () => {
      expect(peopleController).toBeDefined();
    });
  });

  describe('createPeoples', () => {
    describe('when createGenres called', () => {

      let response, spy;

      beforeEach(async () => {
        spy = jest.spyOn(peopleService, 'createPeoples');
        response = await peopleController.createPeoples({
          id: 1, arr: [
            {
              fullName: "Арно Бертран",
              profession: "Продюсер"
            }
          ]
        });
      });

      it('should call app service with id and array', async () => {
        expect(spy).toHaveBeenCalledWith(1, [
          {
            fullName: "Арно Бертран",
            profession: "Продюсер"
          }
        ]);
      });

      it('should return undefined', async () => {
        expect(response).toBeUndefined();
      });

    });
  });

  describe('getPeople', () => {
    describe('when getPeople called', () => {

      let response, spy;

      beforeEach(async () => {
        spy = jest.spyOn(peopleService, 'getPeople');
        response = await peopleController.getPeople();
      });

      it('should call app service', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should return all people', async () => {
        expect(response).toEqual(people);
      });

    });
  });

});