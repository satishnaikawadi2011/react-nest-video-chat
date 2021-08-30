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
import { AnswerCallData, CallUserData } from './types';
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger: Logger = new Logger('ChatGateway');

	@WebSocketServer() server: Server;

	afterInit(server: Server) {
		this.logger.log('Initialized .....');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
		client.emit(EVENTS.me, { socketId: client.id });
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
		client.broadcast.emit(EVENTS.callEnded);
	}

	@SubscribeMessage(EVENTS.callUser)
	handleCallUser(@MessageBody() data: CallUserData, @ConnectedSocket() socket: Socket) {
		const { from, name, signalData } = data;
		this.server.to(data.userToCall).emit(EVENTS.callUser, { signal: signalData, from, name });
	}

	@SubscribeMessage(EVENTS.answerCall)
	handleAnswerCall(@MessageBody() data: AnswerCallData, @ConnectedSocket() socket: Socket) {
		const { signal, to } = data;
		this.server.to(to).emit(EVENTS.callAccepted, { signal });
	}
}
