import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
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
export class VoteGateway implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private server: Server;
  private lastPayload: Office[];

  constructor(private voteService: VoteService) {}

  async afterInit() {
    this.lastPayload = await this.voteService.getVotingResults();
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id)
    client.emit('message', this.lastPayload);
  }

  @SubscribeMessage('message')
  broadCastResult(payload: Office[]) {
    this.server.emit('message', payload);
  }
}
