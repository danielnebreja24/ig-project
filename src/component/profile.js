import React from "react";
import { withStyles } from "@material-ui/styles";
import Header from "./header";
import Undef from "./img/undef.gif";
import { Icon, Button, Tabs, message } from "antd";
import ProfileTabs from "./profileTabs";
import ProfileSettings from "./profileSettings";
import EditProfile from "./profileEdit";
import AddPost from "./addPost";
import axios from "axios";

const { TabPane } = Tabs;

const useStyles = {
  mainBody: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f9f9f9"
  },
  body: {
    width: "60%",
    height: "91%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    // alignItems: 'center'
    flexDirection: "column"
  },
  headBody: {
    height: "35%",
    width: "100%",
    display: "inline-flex",
    borderBottom: "1px ridge #d9d9d9"
    // backgroundColor: 'red'
  },
  leftBody: {
    width: "35%",
    height: "100%",
    // backgroundColor: 'blue',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  imgProf: {
    width: "70%",
    height: "80%",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px #666"
  },
  rightBody: {
    width: "65%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  rightOne: {
    width: "100%",
    height: "33.33%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
    // backgroundColor: 'orange'
  },
  rightTwo: {
    width: "100%",
    height: "33.33%",
    // backgroundColor: '#fff',
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rightThree: {
    width: "100%",
    height: "33.33%",
    // backgroundColor: 'brown',
    display: "inline-flex"
  },

  posts: {
    width: "33.33%",
    height: "100%",
    // backgroundColor: 'red',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  followers: {
    width: "33.33%",
    height: "100%",
    // backgroundColor: 'orange',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  following: {
    width: "33.33%",
    height: "100%",
    // backgroundColor: 'yellow',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  spanTxt: {
    fontSize: "19px",
    letterSpacing: "1.2px"
  },
  userProf: {
    fontSize: "25px",
    marginRight: "50px",
    // fontWeight: 'bold',
    textShadow: "0.3px 0.3px 1px #444"
  },
  profQuote: {
    width: "80%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
    // backgroundColor: 'red'
  },
  addPost: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    // "@media (max-width: 425px)": {
    //   backgroundColor: "red"
    // }
  }
};

var ip = window.location.href.split(":")[1].substr(2);
const user = JSON.parse(localStorage.getItem("user"));

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      posts: [],
      IP: ""
    };
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("user"));

    this.setState({ userInfo: user });

    axios
      .get(`http://${ip}:3001/ig/posts/getPost/` + user.id)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));

    localStorage.getItem("user")
      ? this.props.history.push("/profile")
      : this.props.history.push("/login");
  }

  handleAddPost = e => {
    var user = JSON.parse(localStorage.getItem("user"));
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      (today.getHours() > 12 ? today.getHours() - 12 : today.getHours()) +
      ":" +
      today.getMinutes() +
      " " +
      (today.getHours() > 12 ? "PM" : "AM");
    var dateTime = date + " " + time;

    var post_id =
      user.post_id === null ? (user.post_id = 1) : (user.post_id += 1);

    e.url.map(item => {
      const val = e.value;
      const urL = item.newUrl;
      const data = { val, urL, dateTime, post_id };

      axios
        .post(`http://${ip}:3001/ig/posts/addPost/` + user.id, data)
        .then(res => {
          this.loadAgain("addPost");
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  loadAgain = e => {
    axios
      .get(`http://${ip}:3001/ig/users/getUser/` + user.id)
      .then(res => {
        this.setState({ userInfo: res.data[0] });
        localStorage.setItem("user", JSON.stringify(res.data[0]));
      })
      .catch(err => {
        console.log(err);
      });

    e == "editProf"
      ? message.info("Account updated!", 3)
      : message.success("Posted an update", 3);

    axios
      .get(`http://${ip}:3001/ig/posts/getPost/` + user.id)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  editProfile = e => {
    axios
      .patch(`http://${ip}:3001/ig/users/edit/` + user.id, e)
      .then(res => {
        this.loadAgain("editProf");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const info = this.state.userInfo;
    // console.log(info.profile_img);
    return (
      <div className={classes.mainBody}>
        <Header />
        <div className={classes.body}>
          <div className={classes.headBody}>
            <div className={classes.leftBody}>
              {!info.profile_img ? (
                <img
                  src={Undef}
                  title="Profile Image"
                  alt="Profile Image"
                  className={classes.imgProf}
                />
              ) : (
                <img
                  src={info.profile_img}
                  title="Profile Image"
                  alt="Profile Image"
                  className={classes.imgProf}
                />
              )}
            </div>
            <div className={classes.rightBody}>
              <div className={classes.rightOne}>
                <span className={classes.userProf}>{info.username}</span>
                <EditProfile editProfile={this.editProfile} />
                <ProfileSettings />
              </div>
              <div className={classes.rightTwo}>
                <span className={classes.spanTxt}>
                  <b>212</b> posts
                </span>
                <span className={classes.spanTxt}>
                  <b>599</b> followers
                </span>
                <span className={classes.spanTxt}>
                  <b>90</b> following
                </span>
              </div>
              <div className={classes.rightThree}>
                <div className={classes.profQuote}>
                  <span>
                    <b>{info.fullname}</b>
                  </span>
                  <span style={{ marginTop: "5px" }}>
                    {info.bio !== "null" ? info.bio : "Tell me about yourself"}
                  </span>
                </div>
                <div className={classes.addPost}>
                  <AddPost addNow={this.handleAddPost} />
                  {/* <Button onClick={() => this.props.history.push("/sample")}>
                    LeBron
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
          <ProfileTabs posts={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Profile);
