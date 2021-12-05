import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { TrewService } from './trew.service';
import { CreateTrewDto } from './dto/create-trew.dto';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TrewGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('TrewGateway');

  @WebSocketServer()
  private server: Server;

  constructor(private readonly trewService: TrewService) {}

  handleDisconnect(client: any) {
    this.logger.log(`TrewGateway ${client} disconnected`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`TrewGateway ${client} connected`);
  }

  afterInit(server: any) {
    this.logger.log('TrewGateway after init');
  }

  @SubscribeMessage('msgToServer')
  toServer(@MessageBody() createTrewDto: CreateTrewDto): WsResponse {
    this.logger.log(createTrewDto);
    return {
      event: 'msgToServer',
      data: { ...createTrewDto, from: 'server' }};
  }
}
