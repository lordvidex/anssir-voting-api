import { Test, TestingModule } from '@nestjs/testing';
import { TrewService } from './trew.service';

describe('TrewService', () => {
  let service: TrewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrewService],
    }).compile();

    service = module.get<TrewService>(TrewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
