import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import {
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { incomingMessage } from './dtos/incomingMessage.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (soc) => {
      console.log(`${soc.id} Connected`);
      soc.on('disconnect', () => {
        console.log(`${soc.id} disconnected`);
      });
    });
  }

  @SubscribeMessage('createRoom')
  createRoom(socket: Socket, roomId: string) {
    socket.join(roomId);
    console.log(`User with id: ${socket.id} Joined room: ${roomId}`);
    socket.to(roomId).emit('roomCreated', { room: roomId });
    // return { event: 'roomCreated', room: 'aRoom' };
  }

  @SubscribeMessage('newMessage')
  onNewMeassge(socket: Socket, messageBody: incomingMessage) {
    console.log(messageBody);
    socket.to(messageBody.room).emit('onMessage', messageBody);
  }
}
