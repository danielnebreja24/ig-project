import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Input } from "antd";
import openSocket from "socket.io-client";

const useStyles = {
  input: {
    width: "97%"
  },
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

var ip = window.location.href.split(":")[1].substr(2);

class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.chatMsg(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Input
            size="large"
            value={this.state.value}
            className={classes.input}
            placeholder="Type message here . . ."
            onChange={this.handleChange}
            disabled={this.props.open ? false : true}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(ChatInput);
