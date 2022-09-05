import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';



// @WebSocketGateway({
//   cors: {origin: '*'}
// })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto)
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  
  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('name') name: string, 
    @ConnectedSocket() clientRef: Socket) {
    return this.messagesService.identify(name, clientRef.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean, 
    @ConnectedSocket() clientRef: Socket
  ) {
    const clientName = this.messagesService.getClientName(clientRef.id)
    clientRef.broadcast.emit('typing', {clientName, isTyping})
    return;
  }
}
