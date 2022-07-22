import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { List, Avatar } from "antd";
import "./message.css";

const data = [
  {
    name: "Bryan Alfuente",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJP2EL340-be1e871d9e32-48",
    message: "Hi poews"
  },
  {
    name: "Ed Caluag",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJ9SJ0LRG-8c267af60148-48",
    message: "Hi poews"
  },
  {
    name: "Rej Roxo",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJ9RYPFBL-957db9009b54-48",
    message: "Hi poews"
  },
  {
    name: "Boss Joms",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJPNUF1JR-6ef2f9e938d3-512",
    message: "Hi poews"
  },
  {
    name: "Xemen",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJPHDT9TQ-bc17ba990596-512",
    message: "Hi poews"
  },
  {
    name: "Vincent Navas",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJEV45XBK-02f94d27ef1a-512",
    message: "Hi poews"
  },
  {
    name: "Xemen",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJPHDT9TQ-bc17ba990596-512",
    message: "Hi poews"
  },
  {
    name: "Vincent Navas",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJEV45XBK-02f94d27ef1a-512",
    message: "Hi poews"
  },
  {
    name: "Xemen",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJPHDT9TQ-bc17ba990596-512",
    message: "Hi poews"
  },
  {
    name: "Vincent Navas",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJEV45XBK-02f94d27ef1a-512",
    message: "Hi poews"
  },
  {
    name: "Xemen",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJPHDT9TQ-bc17ba990596-512",
    message: "Hi poews"
  },
  {
    name: "Vincent Navas",
    avatar: "https://ca.slack-edge.com/T0QG5E3SL-UJEV45XBK-02f94d27ef1a-512",
    message: "Hi poews"
  }
];

const useStyles = {
  // mainDiv: {
  //   width: "85%",
  //   marginTop: "20px",
  //   overflow: "hidden",
  //   height: "90%",
  //   position: "relative",
  //   background: "red"
  // },
  // innerDiv: {
  //   width: "100%",
  //   overflow: "auto",
  //   height: "100%",
  //   position: "absolute"
  //   // background: "orange"
  // }
};

class MessageList extends React.Component {
  constructor() {
    super();
  }

  render() {
    // console.log(this.props.list);
    const { classes } = this.props;
    return (
      <div className="mainDiv">
        <div className="innerDiv">
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.profile_img} />}
                  title={<a href="#">{item.fullname}</a>}
                  description={item.message}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(MessageList);
