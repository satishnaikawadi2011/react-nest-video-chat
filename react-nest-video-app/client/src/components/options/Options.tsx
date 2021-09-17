import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
// import Phone from "../assests/phone.gif";
import Teams from "../../assets/teams.mp3";
import classes from "./options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext, { VideoContextInterface } from "../../context/VideoContext";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { socket } from "../../context/VideoState";
import CallEnd from "../../icons/CallEnd";
import { useHistory } from "react-router";

const Options = () => {
  const history = useHistory();
  const [idToCall, setIdToCall] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio:any = useRef();
    const {
    call,
    callAccepted,
    userVideo,
    name,
    setName,
    me,
    callUser,
    answerCall,
    otherUser,
    setOtherUser,
      leaveCall1,
      otherUserName,
    setOtherUserName
  }: any = useContext<VideoContextInterface | undefined>(VideoContext);

    const callHandler = () => {
    if (!name.length) {
      message.error("Please enter your name to call!");
    } else if (!idToCall.length) {
      message.error("Please enter id of the other user!");
    } else if (!otherUserName.length) {
      message.error("Please enter name of the other user!");
    } else {
       callUser(idToCall);
    }
  }
  
  useEffect(() => {
    if (callAccepted || otherUser) {
      console.log("Here");
      history.push('/meet',{from:'home'});
    }
  },[callAccepted,userVideo,history,otherUser])

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal:boolean) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call) {
      if (call?.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
    }
  }, [call,callAccepted]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Account Info</h2>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{name.length}/15</small>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        />

        <div className={classes.share_options}>
          <CopyToClipboard text={me}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={classes.btn}
              tabIndex={0}
              onClick={() => message.success("Code copied successfully!")}
            >
              Copy code
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Make a call</h2>

        <Input
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
         <Input
          placeholder="Enter name to call"
          size="large"
          className={classes.inputgroup}
          value={otherUserName}
          onChange={(e) => setOtherUserName(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter name of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            onClick={callHandler}
            className={classes.btn}
            tabIndex={0}
          >
            Call
          </Button>
        
      </div>

      {call && call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                {/* <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                /> */}
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex={0}
              >
                Answer
              </Button>
              <Button
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex={0}
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;