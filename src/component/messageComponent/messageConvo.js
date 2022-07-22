import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Icon, Input } from "antd";

import ChatInput from "./chatInput";
import Convo from "./conversationList";
import axios from "axios";
// import { compress } from "emoji-mart/dist-es/utils/data";

const useStyles = {
  mainDiv: {
    width: "100%",
    height: "100%"
    // backgroundColor: "red"
  },
  topDiv: {
    height: "90%",
    width: "100%",
    // backgroundColor: "orange",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  bottomDiv: {
    height: "10%",
    width: "100%",
    // backgroundColor: "brown",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  convoDiv: {
    height: "90%",
    width: "95%",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column"
  },
  igIcon: {
    fontSize: "35em",
    color: "#777"
  },
  convoTxt: {
    fontWeight: "bold",
    fontSize: "18px",
    fontStyle: "italic",
    color: "#555"
  },
  noChat: {
    fontSize: "20px",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#888"
  },
  profileDiv: {
    // backgroundColor: "red",
    height: "7%",
    width: "100%",
    display: "flex",
    alignItems: "flex-end"
  },
  profileName: {
    fontSize: "16px",
    marginLeft: "30px",
    fontWeight: "bold",
    color: "#777"
  }
};

var ip = window.location.href.split(":")[1].substr(2);

class MessageConvo extends React.Component {
  constructor() {
    super();
    this.state = { openChat: false, noConvo: false };
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.props.open.exist === "yes"
        ? this.setState({ openChat: true, noConvo: false })
        : this.setState({ openChat: true, noConvo: true });
    }
  }

  handleChat = e => {
    this.setState({ noConvo: false });

    var today = new Date();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var newDate = date < 10 ? "0" + date : date;
    var newMonth = month < 10 ? "0" + month : month;
    var fullDate = newMonth + "-" + newDate + "-" + today.getFullYear();

    axios
      .post(`http://${ip}:3001/ig/messages/addMessage`, {
        r_id: parseInt(this.props.open.key),
        value: e,
        s_id: JSON.parse(localStorage.getItem("user")).id,
        date: fullDate
      })
      .then(res => this.props.loadAgain(res.data))
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    // console.log(this.props.open);
    return (
      <React.Fragment>
        <div className={classes.mainDiv}>
          <div className={classes.topDiv}>
            <div className={classes.profileDiv}>
              <span className={classes.profileName}>
                {this.state.openChat ? this.props.open.name : null}
              </span>
            </div>
            <div className={classes.convoDiv}>
              {this.state.openChat ? (
                this.state.noConvo ? (
                  <span className={classes.noChat}>Type to begin chat</span>
                ) : (
                  <Convo chats={this.props.open} />
                )
              ) : (
                <React.Fragment>
                  <Icon type="instagram" className={classes.igIcon} />
                  <span className={classes.convoTxt}>
                    Search and Select chat to start
                  </span>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className={classes.bottomDiv}>
            <ChatInput open={this.state.openChat} chatMsg={this.handleChat} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(MessageConvo);
