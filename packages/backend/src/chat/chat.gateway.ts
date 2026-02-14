import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.chatService.connectClient(client)

    this.wss.emit('clients-updated', this.chatService.getConnectedClients())
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected', client.id)
    this.chatService.removeClient(client.id)

    console.log('Connected clients', this.chatService.getConnectedClients())
  }
}
