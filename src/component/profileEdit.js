import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Modal, Icon, message, Progress, Button } from "antd";
import { TextField } from "@material-ui/core";
import { storage } from "./upload/firebase";

import Undef from "./img/undef.gif";

const useStyles = theme => ({
  editBtn: {
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "transparent",
    border: "1px solid #999",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "1.5",
    cursor: "pointer"
  },
  editProfile: {
    height: "400px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "column"
    // backgroundColor: 'red'
  },
  upload: {
    border: "1px ridge #777",
    borderRadius: "3px",
    padding: "5px 15px",
    cursor: "pointer",
    marginLeft: "50px"
  },
  profileImg: {
    width: "100px",
    height: "100px",
    borderRadius: "50%"
  }
});

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      loading: false,
      url: null,
      progress: 0,
      bioVal: "",
      nameVal: "",
      unameVal: "",
      mobile: "",
      btnState: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const info = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      this.setState({
        progress: 0,
        url: info.profile_img,
        bioVal: info.bio,
        nameVal: info.fullname,
        unameVal: info.username,
        mobile: info.mobile_email
      });
    }
  }

  handleChange(e) {
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        const img = e.target.files[0];
        const imgName = img.name;

        const uploadTask = storage.ref(`images/${imgName}`).put(img);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
            this.state.progress === 100
              ? setTimeout(() => {
                  this.setState({ btnState: false });
                }, 3000)
              : this.setState({ btnState: true });
          },
          error => {
            console.log(error);
          },
          complete => {
            storage
              .ref("images")
              .child(imgName)
              .getDownloadURL()
              .then(url => {
                const newUrl = url.toString();
                this.setState({ url: newUrl });
              });
          }
        );
      } else {
        message.info("No image selected!", 2);
      }
    } else {
      var x = e.target.value.match("'");

      if (x) {
        message.error("Invalid character");
      }

      e.target.name === "fname"
        ? this.setState({ nameVal: e.target.value.replace("'", "") })
        : e.target.name === "uname"
        ? this.setState({ unameVal: e.target.value.replace("'", "") })
        : e.target.name === "email"
        ? this.setState({ mobile: e.target.value.replace("'", "") })
        : this.setState({ bioVal: e.target.value.replace("'", "") });
    }
  }

  handleSubmit() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false, progress: 0 });
      this.props.editProfile(this.state);
    }, 3000);
  }

  render() {
    const { classes } = this.props;
    const info = JSON.parse(localStorage.getItem("user"));

    return (
      <React.Fragment>
        <button
          className={classes.editBtn}
          onClick={() => this.setState({ visible: true })}
        >
          Edit Profile
        </button>

        <Modal
          title="Edit Profile"
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false, progress: 0 })}
          onOk={this.handleSubmit}
          footer={[
            <Button
              key="back"
              onClick={() => this.setState({ visible: false, progress: 0 })}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              disabled={this.state.btnState}
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          ]}
        >
          <form onSubmit={this.handleSubmit}>
            <div className={classes.editProfile}>
              <TextField
                label="Fullname"
                value={this.state.nameVal}
                name="fname"
                onChange={e => this.handleChange(e)}
                placeholder="New name"
                fullWidth
                required
              />
              <TextField
                label="Username"
                value={this.state.unameVal}
                name="uname"
                onChange={e => this.handleChange(e)}
                placeholder="New username"
                required
                fullWidth
              />

              <TextField
                label="Mobile or Email"
                value={this.state.mobile}
                name="email"
                onChange={e => this.handleChange(e)}
                placeholder="New mobile number or email"
                required
                fullWidth
              />

              <TextField
                rows="3"
                label="Bio"
                name="bio"
                placeholder="New bio"
                value={this.state.bioVal === null ? "" : this.state.bioVal}
                onChange={e => this.handleChange(e)}
                inputProps={{ maxLength: 100 }}
                multiline
                fullWidth
              />
              <span>
                {this.state.url === null ? (
                  <img src={Undef} className={classes.profileImg} />
                ) : (
                  <img src={this.state.url} className={classes.profileImg} />
                )}
                <label className={classes.upload}>
                  <Icon type="upload" /> Change Profile
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={this.handleChange}
                  />
                </label>
              </span>
              <div style={{ width: "100%" }}>
                <Progress
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068"
                  }}
                  percent={this.state.progress}
                />
              </div>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(EditProfile);
