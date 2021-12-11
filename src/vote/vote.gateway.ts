import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Office } from '../offices/office.schema';
import { VoteService } from './vote.service';

@Injectable()
@WebSocketGateway({ namespace: 'live' })
export class VoteGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger('VoteGateWayLogger');
  private lastPayload: Office[];

  constructor(private voteService: VoteService) {}

  async afterInit() {
    this.lastPayload = await this.voteService.getVotingResults();
    this.broadCastResult(this.lastPayload)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${client.id} connected`)
    client.emit('message', this.lastPayload);
  }

  handleDisconnect(client: any) {
    this.logger.log(`${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  broadCastResult(payload: Office[]) {
    this.lastPayload = payload
    this.server.emit('message', payload);
  }
}
