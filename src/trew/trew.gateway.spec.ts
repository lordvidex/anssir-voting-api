import { Test, TestingModule } from '@nestjs/testing';
import { TrewGateway } from './trew.gateway';
import { TrewService } from './trew.service';

describe('TrewGateway', () => {
  let gateway: TrewGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrewGateway, TrewService],
    }).compile();

    gateway = module.get<TrewGateway>(TrewGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
