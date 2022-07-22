import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Modal, Input } from "antd";
import { Icon, Divider, Popover } from "antd";
import Emoji from "./img/emojiIcon.png";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const useStyles = theme => ({
  emoji: {
    width: "20px"
  },
  textArea: {
    width: "90%"
  },
  divHead: {
    width: "100%",
    height: "100px",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  postBtn: {
    color: "#3897f0",
    fontWeight: "bold",
    fontSize: "15px"
  }
});

const { TextArea } = Input;

class AddComment extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  handleClick() {}

  handleEmoji(e) {
    this.setState({ value: this.state.value + e });
  }

  handleChange(e) {
    this.setState({ value: e.value });
  }

  render() {
    const { classes, post } = this.props;
    // console.log(this.props.post);
    return (
      <Modal
        title={post ? post.caption : null}
        // centered
        visible={this.props.visible}
        onCancel={() => this.props.close(this.state.value)}
        footer={[
          <span
            key={1}
            className={classes.postBtn}
            style={{
              opacity: this.state.value === "" ? "0.5" : "1",
              cursor: this.state.value === "" ? "not-allowed" : "pointer"
            }}
            onClick={e => this.handleClick()}
          >
            Post
          </span>
        ]}
      >
        <div className={classes.divHead}>
          <TextArea
            value={this.state.value}
            className={classes.textArea}
            onChange={e => this.handleChange(e.target)}
            placeholder="Write a comment..."
            autosize={{ minRows: 3, maxRows: 4 }}
          />
          <Popover
            content={
              <Picker
                title="Choose your Emoji"
                emoji="point_up"
                onSelect={e => this.handleEmoji(e.native)}
              />
            }
            trigger="click"
            bodyStyle={{ padding: 0 }}
          >
            <input
              type="image"
              src={Emoji}
              title="Add emoji"
              className={classes.emoji}
            />
          </Popover>
        </div>
      </Modal>
    );
  }
}

export default withStyles(useStyles)(AddComment);
