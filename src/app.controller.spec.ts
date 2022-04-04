import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import anything = jasmine.anything;

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return user profile', () => {
      const req: { user: jasmine.Any } = { user: anything() };
      expect(appController.getProfile(req)).toBe(req.user);
    });
  });
});
