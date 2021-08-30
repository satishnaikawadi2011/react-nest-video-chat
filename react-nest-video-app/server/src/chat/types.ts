export interface MeData {
	socketId: string;
}

export interface CallUserData {
	userToCall: string;
	signalData: any;
	from: string;
	name: string;
}

export interface AnswerCallData {
	to: string;
	signal: any;
}

export interface CallAcceptedData {
	signal: any;
}
