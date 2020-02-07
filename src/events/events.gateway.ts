import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  checkList = true;
  checkListData: any = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  testEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

  @SubscribeMessage('event')
  handleEvent(
    @MessageBody() data: object,
    @ConnectedSocket() client: Socket,
  ): object {
      return this.checkListData;
  }

  @SubscribeMessage('adicionaChecklist')
  consultandoFila(
    @MessageBody() data: object,
  ): object {
    if(this.checkList == true){
      this.checkListData.push(data);
      return this.checkListData;
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
