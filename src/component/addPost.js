import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Profile from "./img/keanu.jpg";
import { Button, Icon, Modal, Divider, Popover, Progress, message } from "antd";
import { storage } from "./upload/firebase";

import AddLocation from "./addLocation";

import Emoji from "./img/emojiIcon.png";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const useStyles = theme => ({
  header: {
    height: "100px",
    // backgroundColor: 'red',
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  body: {
    height: "500px"
    // backgroundColor: 'orange'
  },
  textArea: {
    width: "82%",
    resize: "none",
    padding: "10px",
    borderRadius: "5px",
    outline: "none"
    // border: 'none'
  },
  profile: {
    borderRadius: "50%",
    width: "9%",
    height: "40%"
  },
  emoji: {
    width: "20px",
    cursor: "pointer",
    position: "relative"
  },
  bodyBottom: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
    // backgroundColor: 'red'
  },
  inputFile: {
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px groove #888"
  },
  imgUpload: {
    width: "100px",
    height: "100px",
    border: "1px dotted #666",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "5px",
    display: "block"
  },
  popContent: {
    display: "flex",
    justifyContent: "space-around",
    height: "25px",
    width: "180px"
  },
  imgPreview: {
    width: "100%"
  }
});

const { confirm } = Modal;

class AddPost extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      value: "",
      disabledState: true,
      url: [],
      progress: 0,
      previewHover: "",
      deleteHover: "",
      selectedPic: [],
      modalPreview: false,
      selectedName: "",
      newUrl: [],
      displayEmoji: "none",
      loading: false,
      user: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("user"));

    this.setState({ user: user });
  }

  handleClick() {
    this.setState({ visible: true });
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handleClose() {
    this.setState({ visible: false });
  }

  handleValue(e) {
    this.setState({ value: e });
    this.state.url.length === 0 || e === ""
      ? this.setState({ disabledState: true })
      : this.setState({ disabledState: false });
  }

  handleChange = e => {
    var x = [];
    x.push(...e.target.files);

    var length = this.state.url.length + x.length;

    length <= 10
      ? x.map(item => {
          const uploadTask = storage.ref(`images/${item.name}`).put(item);
          uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              this.setState({ progress });
            },
            error => {
              console.log(error);
            },
            complete => {
              storage
                .ref("images")
                .child(item.name)
                .getDownloadURL()
                .then(url => {
                  const newUrl = url.toString();
                  const name = item.name;
                  this.setState({
                    url: this.state.url.concat({ newUrl, name })
                  });
                });
            }
          );
        })
      : alert("You exceeded the maximum image post");

    this.state.value === "" || length === 0
      ? this.setState({ disabledState: true })
      : this.setState({ disabledState: false });
  };

  handlePreview = () => {
    this.setState({ modalPreview: true });
  };

  handleConfirmImg = (e, item) => {
    this.setState({
      selectedPic: e.target.src,
      selectedName: item,
      modalPopover: true
    });
  };

  handleSubmit = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      this.props.addNow(this.state);
      this.setState({
        loading: false,
        visible: false,
        url: [],
        value: "",
        progress: 0
      });
    }, 4000);
  };

  handleDelete = () => {
    const arr = [];
    this.state.url.map(item => {
      var x = item.newUrl;
      if (x != this.state.selectedPic) {
        arr.push(item);
      }
    });
    this.setState({ url: arr });
    arr.length === 0 || this.state.value === ""
      ? this.setState({ disabledState: true })
      : this.setState({ disabledState: false });

    console.log(this.state.value.length);
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleEmoji = e => {
    this.setState({ value: this.state.value + e });
  };

  render() {
    // console.log(this.state.user.profile_img);
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button type="primary" onClick={() => this.handleClick()}>
          <Icon type="plus-circle" />
          Add Post
        </Button>

        <Modal
          title={<b>New Post</b>}
          visible={this.state.visible}
          width={500}
          style={{ zIndex: "10" }}
          onCancel={() => this.handleClose()}
          footer={[
            <Button
              loading={this.state.loading}
              key="submit"
              disabled={this.state.disabledState}
              type="primary"
              onClick={() => this.handleSubmit()}
            >
              Post
            </Button>
          ]}
        >
          <div className={classes.header}>
            <img
              src={this.state.user.profile_img}
              className={classes.profile}
            />
            <textarea
              rows="3"
              value={this.state.value}
              className={classes.textArea}
              placeholder="Write a caption..."
              onChange={e => this.handleValue(e.target.value)}
              autoFocus
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
          <Divider />
          <div style={{ width: "100%", marginBottom: "20px" }}>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068"
              }}
              percent={this.state.progress}
            />
          </div>
          <div className={classes.body}>
            <div className={classes.bodyTop}>
              {this.state.url.length < 10 ? (
                <label className={classes.inputFile}>
                  <Icon type="upload" />
                  &nbsp; Upload
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.handleChange}
                    multiple
                  />
                </label>
              ) : null}
            </div>
            <div className={classes.bodyBottom}>
              {this.state.url.map((item, i) => (
                <Popover
                  content={
                    <div key={i} className={classes.popContent}>
                      <span
                        style={{
                          cursor: "pointer",
                          borderBottom: this.state.previewHover
                        }}
                        onClick={this.handlePreview}
                        onMouseEnter={() =>
                          this.setState({ previewHover: "2px ridge #888" })
                        }
                        onMouseLeave={() => this.setState({ previewHover: "" })}
                      >
                        <Icon type="eye" theme="filled" /> Preview
                      </span>
                      <span
                        style={{ padding: "6px 1.5px", background: "#999" }}
                      ></span>
                      <span
                        style={{
                          cursor: "pointer",
                          borderBottom: this.state.deleteHover
                        }}
                        onMouseEnter={() =>
                          this.setState({ deleteHover: "2px ridge #888" })
                        }
                        onMouseLeave={() => this.setState({ deleteHover: "" })}
                        onClick={this.handleDelete}
                      >
                        Remove <Icon type="delete" theme="filled" />
                      </span>
                    </div>
                  }
                  title={item.name}
                  key={i}
                  trigger="focus"
                >
                  <input
                    type="image"
                    key={i}
                    src={item.newUrl}
                    className={classes.imgUpload}
                    onClick={e => this.handleConfirmImg(e, item.name)}
                  />
                </Popover>
              ))}
            </div>
            <Divider />
            <AddLocation />

            <Button
              type="default"
              style={{ textAlign: "left", marginTop: "10px" }}
              block
            >
              <Icon type="usergroup-add" /> Tag People
            </Button>
          </div>
        </Modal>

        <Modal
          title={this.state.selectedName}
          centered
          visible={this.state.modalPreview}
          onCancel={() => this.setState({ modalPreview: false })}
          footer={[
            <Button
              key={1}
              type="danger"
              onClick={() => this.setState({ modalPreview: false })}
            >
              Back
            </Button>
          ]}
        >
          <img src={this.state.selectedPic} className={classes.imgPreview} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(AddPost);

/* <img 
    key={i} 
    src={item}
    className={classes.imgUpload}                                         
    />
    <Progress 
    key={i}
    strokeColor={{
    '0%': '#108ee9',
    '100%': '#87d068',
    }}
    percent={this.state.progress} 
    />
    <Modal
                    title="Basic Modal"
                    centered
                    visible={this.state.modalPreview}

                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
    */
