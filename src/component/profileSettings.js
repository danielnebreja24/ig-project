import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Icon, Modal, List, Popconfirm, message } from "antd";
import { ListItem, Divider } from "@material-ui/core";

const useStyles = theme => ({
  iconSet: {
    marginLeft: "20px",
    fontSize: "25px",
    cursor: "pointer"
  },
  listItem: {
    cursor: "pointer",
    textAlign: "center"
  }
});

class ProfileSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  handleLogout = () => {
    message
      .loading("Logging out, please wait...", 3.5)
      .then(() => {
        localStorage.removeItem("user");
        this.props.history.push("/login");
      })
      .then(() => {
        message.info("Goodbye!", 3);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Icon
          type="setting"
          className={classes.iconSet}
          onClick={() => this.setState({ visible: true })}
        />
        <Modal
          title="Profile Settings"
          width={300}
          bodyStyle={{ padding: 0 }}
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={null}
        >
          <List bordered>
            <ListItem className={classes.listItem}>Change Password</ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              Privacy and Security
            </ListItem>
            <Divider />
            <Popconfirm
              title="Are you sure？"
              onConfirm={this.handleLogout}
              placement="bottom"
              okText="Yes"
              cancelText="No"
            >
              <ListItem className={classes.listItem}>Logout</ListItem>
            </Popconfirm>
          </List>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(useStyles)(ProfileSettings));
