import { Logger } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENTS } from './constants';
import { messageData } from './types';
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ChatGateway');
	private users: string[] = [];

	@WebSocketServer() server: Server;

	afterInit(server: Server) {
		this.logger.log('Initialized .....');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
		this.users.push(client.id);
	}

	handleDisconnect(client: Socket) {
		this.users = this.users.filter((user) => user != client.id);
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage(EVENTS.message)
	handleMessage(@MessageBody() data: messageData, @ConnectedSocket() socket: Socket) {
		console.log('Message has emiited and passed the following data ', data);
		console.log('Message event is emmiting the send event with data as age.');
		console.log(this.users);
		if (this.users.length > 1) {
			this.server.to(this.users[0]).emit(EVENTS.send, data.age);
		}
	}

	@SubscribeMessage(EVENTS.send)
	handleSend(@MessageBody() data: number, @ConnectedSocket() socket: Socket) {
		console.log('Send has emiited and passed the number ' + data + ' as data.');
		if (this.users.length > 1) {
			this.server.to(this.users[0]).emit(EVENTS.test, 11);
		}
	}

	@SubscribeMessage(EVENTS.test)
	handleTest(@MessageBody() data: number, @ConnectedSocket() socket: Socket) {
		console.log('Test has emiited and passed the number ' + data + ' as data.');
	}
}
