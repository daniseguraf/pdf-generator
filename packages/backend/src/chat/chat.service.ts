import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'

interface ConnectedClients {
  [id: string]: Socket
}

@Injectable()
export class ChatService {
  private connectedClients: ConnectedClients = {}

  connectClient(client: Socket) {
    this.connectedClients[client.id] = client
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId]
  }

  getConnectedClients() {
    const clients = Object.keys(this.connectedClients)
    return clients
  }
}
