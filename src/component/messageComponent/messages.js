import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Header from "../header";
import MessageSearch from "./messageSearch";
import MessageList from "./messageList";
import axios from "axios";
import MessageConvo from "./messageConvo";

const useStyles = {
  mainDiv: {
    // backgroundColor: "orange",
    width: "100%",
    height: "91.6vh",
    display: "inline-flex"
    // color: "red"
  },
  divLeft: {
    // backgroundColor: "blue",
    height: "100%",
    width: "30%"
  },
  topLeftdiv: {
    width: "100%",
    height: "15%",
    // backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  botLeftdiv: {
    width: "100%",
    height: "85%",
    // backgroundColor: "pink",
    display: "flex",
    justifyContent: "center"
    // alignItems: "center"
  },
  rightDiv: {
    width: "70%",
    height: "100%",
    backgroundColor: "#f1f1f1"
  }
};

class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      openChat: null
    };
  }

  componentDidMount() {
    // console.log(window.location.href.split(":")[1].substr(2), window.location);
  }

  render() {
    const { classes } = this.props;
    // console.log(this.state.openChat);
    return (
      <React.Fragment>
        {<Header location={this.props.history.location.pathname} />}

        <div className={classes.mainDiv}>
          <div className={classes.divLeft}>
            <div className={classes.topLeftdiv}>
              {
                <MessageSearch
                  refresh={this.state.refresh}
                  list={e => this.setState({ list: e })}
                  openChat={(data, key, name, ex) =>
                    this.setState({
                      openChat: { value: data, name: name, exist: ex, key: key }
                    })
                  }
                />
              }
            </div>
            <div className={classes.botLeftdiv}>
              {<MessageList list={this.state.list} />}
            </div>
          </div>
          <div className={classes.rightDiv}>
            {
              <MessageConvo
                loadAgain={e => this.setState({ refresh: e })}
                open={this.state.openChat}
              />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Message);
