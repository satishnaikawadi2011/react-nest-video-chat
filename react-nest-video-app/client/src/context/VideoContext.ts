import React, { createContext } from 'react';
import { CallType, MessageRcvType } from './VideoState';

interface VideoContextInterface {
	call: CallType | undefined;
	callAccepted: boolean;
	myVideo: any;
	userVideo: any;
	stream: MediaStream | undefined;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	callEnded: boolean;
	me: string;
	callUser: any;
	leaveCall: any;
	answerCall: any;
	sendMsg: any;
	msgRcv: MessageRcvType | undefined;
	chat: MessageRcvType[];
	setChat: React.Dispatch<React.SetStateAction<MessageRcvType[]>>;
	setMsgRcv: React.Dispatch<React.SetStateAction<MessageRcvType | undefined>>;
	setOtherUser: React.Dispatch<React.SetStateAction<string>>;
	leaveCall1: any;
	userName: string;
	myVdoStatus: boolean;
	setMyVdoStatus: React.Dispatch<React.SetStateAction<boolean>>;
	userVdoStatus: any;
	setUserVdoStatus: React.Dispatch<React.SetStateAction<any>>;
	updateVideo: any;
	myMicStatus: boolean;
	userMicStatus: any;
	updateMic: any;
	screenShare: boolean;
	handleScreenSharing: any;
	fullScreen: any;
}

const VideoContext = createContext<VideoContextInterface | undefined>(undefined);
export default VideoContext;
