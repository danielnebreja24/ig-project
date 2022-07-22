import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Avatar } from "antd";

import openSocket from "socket.io-client";

const useStyles = {
  mainDiv: {
    height: "95%",
    width: "95%",
    backgroundColor: "orange",
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  },
  divConvo: {
    width: "auto",
    maxWidth: "70%",
    // backgroundColor: "red",
    height: "auto",
    display: "flex",
    padding: "20px 0"
  },
  convo: {
    // background: "linear-gradient(to right, #5d4a8e 10%, #009999 100%)",
    padding: "10px 20px",
    wordBreak: "break-all",
    width: "auto",
    maxWidth: "500px",
    // borderRadius: "20px 0px 20px 20px",
    color: "#fff",
    fontWeight: "bold"
  },
  avatar: {
    marginTop: "-20px",
    color: "#f56a00",
    backgroundColor: "#fde3cf",
    cursor: "pointer"
  },
  innerDiv: {
    display: "flex",
    // backgroundColor: "red",
    flexDirection: "column"
    // alignItems: "center"
  },
  date: {
    fontSize: "11px",
    color: "#666",
    fontStyle: "italic"
  }
};

var ip = window.location.href.split(":")[1].substr(2);

class Convo extends React.Component {
  constructor() {
    super();
    this.state = { messages: [] };
    this.socket = openSocket(`http://${ip}:3001/`);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  componentDidMount() {
    this.scrollToBottom();
    this.setState({ messages: this.props.chats.value });
    // console.log()

    this.socket.on("chatMsg", data => {
      // console.log(data);
      // console.log(this.props.chats.value[0]);

      const convo = data[0];
      const r_id = parseInt(this.props.chats.key);
      const s_id = JSON.parse(localStorage.getItem("user")).id;
      console.log(r_id, s_id);
      console.log(convo.receiver_id, convo.sender_id);

      if (
        (r_id === convo.receiver_id && s_id === convo.sender_id) ||
        (r_id === convo.sender_id && s_id === convo.receiver_id)
      ) {
        this.setState({ messages: data });
      } else {
        console.log("False Alarm");
      }
      // console.log(convo.receiver_id, convo.sender_id);
      // console.log(s_id, parseInt(r_id));

      // if (
      //   (s_id == convo.receiver_id && s_id == convo.sender_id) ||
      //   (parseInt(r_id) == convo.receiver_id &&
      //     parseInt(r_id) == convo.sender_id)
      // ) {
      //   console.log("Set The State Nigga!");
      // } else {
      //   console.log("Don't Set The State You Faggot!");
      // }

      // console.log(convo);
      // console.log(s_id, parseInt(r_id));

      // console.log(data[0].sender_id, data[0].receiver_id);
      // console.log(convo.sender_id, convo.receiver_id);
      // if (
      //   (data[0].sender_id == convo.sender_id &&
      //     data[0].receiver_id == convo.sender_id) ||
      //   (data[0].receiver_id == convo.receiver_id &&
      //     data[0].receiver_id == convo.sender_id)
      // ) {
      //   this.setState({ messages: data });
      // }
    });
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.chats);
    this.scrollToBottom();
    if (this.props.chats !== prevProps.chats) {
      this.handleSocket();
      // console.log("Yeah");
      this.setState({ messages: this.props.chats.value });
    }
  }

  handleSocket = () => {
    // console.log("Connected");
    if (this.props.chats.value.length) {
      const index = this.props.chats.value.length - 1;
      const s_id = this.props.chats.value[index].sender_id;
      const r_id = this.props.chats.value[index].receiver_id;
      const msg = this.props.chats.value[index].message;
      this.socket.emit("chatMsg", {
        all: this.props.chats.value
      });
    }
    // console.log(this.props.chat.value);
  };

  render() {
    // console.log(this.state.messages);
    const { classes } = this.props;
    const myId = JSON.parse(localStorage.getItem("user")).id;
    return (
      <div className="chatDiv">
        <div className="innerChatDiv">
          {this.state.messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender_id === myId ? "flex-end" : "flex-start"
              }}
              className={classes.divConvo}
            >
              {msg.sender_id == myId ? (
                <React.Fragment>
                  {/*Right Side Convo*/}
                  <div className={classes.innerDiv}>
                    <span
                      key={i}
                      className={classes.convo}
                      style={{
                        marginRight: "5px",
                        background:
                          "linear-gradient(to right, #5d4a8e 10%, #009999 100%)",
                        borderRadius: "20px 0px 20px 20px"
                      }}
                    >
                      {msg.message}
                    </span>
                    <span
                      style={{ marginRight: "15px", alignSelf: "flex-end" }}
                      className={classes.date}
                    >
                      {msg.date}
                    </span>
                  </div>
                  <Avatar
                    className={classes.avatar}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/*Left Side Convo*/}
                  <Avatar
                    className={classes.avatar}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <div className={classes.innerDiv}>
                    <span
                      key={i}
                      className={classes.convo}
                      style={{
                        marginLeft: "5px",
                        background:
                          "linear-gradient(to left, #33ccff 0%, #ff99cc 100%)",
                        borderRadius: "0px 20px 20px 20px"
                      }}
                    >
                      {msg.message}
                    </span>
                    <span
                      style={{ alignSelf: "flex-start", marginLeft: "15px" }}
                      className={classes.date}
                    >
                      {msg.date}
                    </span>
                  </div>
                </React.Fragment>
              )}
            </div>
          ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Convo);
