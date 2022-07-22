import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Card } from "@material-ui/core";

import Header from "./header";

import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import axios from "axios";
import AddComment from "./addComment";
import { Icon, Divider } from "antd";

const useStyles = {
  mainBox: {
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "orange"
  },
  body: {
    width: "100%",
    height: "870px",
    backgroundColor: "#f1f1f1",
    overflow: "auto"
  },
  bodyIG: {
    width: "60%",
    height: "auto",
    backgroundColor: "#f9f9f9",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  mainCard: {
    height: "1200px",
    width: "65%",
    margin: "30px 0"
  },
  cardHead: {
    width: "100%",
    height: "6%",
    display: "inline-flex",
    justifyContent: "center",
    boxShadow: "1px 1px 3px #999"
  },
  cardheadLeft: {
    width: "48%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardheadRight: {
    width: "48%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  iconCard: {
    fontSize: "30px",
    cursor: "pointer"
  },
  profileCard: {
    width: "60%",
    height: "70%",
    display: "inline-flex"
  },
  profileLeft: {
    width: "30%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  profileRight: {
    width: "70%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  avatar: {
    width: "65%",
    height: "90%",
    borderRadius: "50%"
  },
  cardBody: {
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  profName: {
    fontWeight: "bold",
    fontSize: "13px"
  },
  profLoc: {
    fontSize: "12px"
  },
  postImg: {
    width: "100%",
    height: "97%"
  },
  cardFoot: {
    width: "97%",
    height: "34%",
    margin: "0 auto"
  },
  footActions: {
    height: "18%",
    display: "flex"
  },
  footLeft: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  footRight: {
    width: "50%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bookIcon: {
    fontSize: "35px",
    cursor: "pointer"
  },
  actionIcon: {
    fontSize: "30px",
    margin: "0 10px",
    cursor: "pointer"
  },
  likes: {
    height: "7%",
    display: "flex",
    marginLeft: "15px",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  caption: {
    height: "20%",
    marginLeft: "15px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  comment: {
    height: "40%",
    marginLeft: "15px"
  },
  addComment: {
    height: "15%",
    display: "flex",
    marginLeft: "15px",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    border: "none",
    width: "100%",
    height: "30px",
    outline: "none"
  },
  postBtn: {
    color: "#3897f0",
    fontWeight: "bold",
    fontSize: "15px"
  }
};

var ip = window.location.href.split(":")[1].substr(2);

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      theme: false,
      postBtn: "0.5",
      value: "",
      cursor: "not-allowed",
      posts: [],
      users: [],
      open: false,
      selectedPost: null
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    localStorage.getItem("user")
      ? this.props.history.push("/")
      : this.props.history.push("/login");
    if (localStorage.getItem("user")) {
      axios
        .get(`http://${ip}:3001/ig/posts/getAllPost/`)
        .then(res => {
          var data = res.data.sort(() => Math.random() - 0.5);
          data.map(item => {
            axios
              .get(`http://${ip}:3001/ig/users/getUser/${item.user_id}`)
              .then(data => {
                data.data.map(user => {
                  axios
                    .get(
                      `http://${ip}:3001/ig/likes/getLike/${item.id}/${
                        JSON.parse(localStorage.getItem("user")).id
                      }`
                    )
                    .then(res => {
                      this.setState({
                        posts: this.state.posts.concat({
                          caption: item.caption,
                          date: item.date,
                          id: item.id,
                          image: item.image,
                          info_id: item.info_id,
                          post_id: item.post_id,
                          user_id: item.user_id,
                          username: user.username,
                          fullname: user.fullname,
                          profile_img: user.profile_img,
                          liked: res.data ? "yes" : "no"
                        })
                      });
                    });
                });
              });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleClick(e) {
    console.log(e);
  }

  handleInputClick() {
    alert();
  }

  handleClose(e) {
    console.log(e);
    this.setState({ open: false, value: e });
  }

  handleLike(e, id) {
    axios
      .get(
        `http://${ip}:3001/ig/likes/getLike/${e.id}/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      )
      .then(res => {
        res.data === null
          ? axios
              .post(`http://${ip}:3001/ig/likes/addLike/${e.id}`, {
                id: JSON.parse(localStorage.getItem("user")).id,
                post_id: e.post_id
              })
              .then(res => {
                console.log(res.data);
                let posts = [...this.state.posts];
                let post = { ...posts[id] };
                post.liked = "yes";
                posts[id] = post;
                this.setState({ posts });
              })
              .catch(err => console.log(err))
          : axios
              .delete(`http://${ip}:3001/ig/likes/delLike/${res.data.id}`)
              .then(res => {
                let posts = [...this.state.posts];
                let post = { ...posts[id] };
                post.liked = "no";
                posts[id] = post;
                this.setState({ posts });
              });
      })
      .catch(err => console.log(err));
  }

  loadAgain() {
    let arr = [];
    this.setState({ posts: [] });
    axios
      .get(`http://${ip}:3001/ig/posts/getAllPost/`)
      .then(res => {
        res.data.map(item => {
          axios
            .get(`http://${ip}:3001/ig/users/getUser/${item.user_id}`)
            .then(data => {
              data.data.map(user => {
                axios
                  .get(
                    `http://${ip}:3001/ig/likes/getLike/${item.id}/${
                      JSON.parse(localStorage.getItem("user")).id
                    }`
                  )
                  .then(res => {
                    this.setState({
                      posts: this.state.posts.concat({
                        caption: item.caption,
                        date: item.date,
                        id: item.id,
                        image: item.image,
                        info_id: item.info_id,
                        post_id: item.post_id,
                        user_id: item.user_id,
                        username: user.username,
                        fullname: user.fullname,
                        profile_img: user.profile_img,
                        liked: res.data ? "yes" : "no"
                      })
                    });
                  });
              });
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.mainBox}>
        {<Header />}
        {
          <AddComment
            visible={this.state.open}
            close={this.handleClose}
            post={this.state.selectedPost}
          />
        }
        <div className={classes.body} onScroll={this.handleOnScroll}>
          <div className={classes.bodyIG}>
            {this.state.posts.map((item, i) => (
              <Card key={i} className={classes.mainCard}>
                <div className={classes.cardHead}>
                  <div className={classes.cardheadLeft}>
                    <div className={classes.profileCard}>
                      <div className={classes.profileLeft}>
                        <img
                          src={item.profile_img}
                          className={classes.avatar}
                        />
                      </div>
                      <div className={classes.profileRight}>
                        <span className={classes.profName}></span>
                        <span className={classes.profLoc}>New York</span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.cardheadRight}>
                    <Icon className={classes.iconCard} type="ellipsis" />
                  </div>
                </div>

                <div className={classes.cardBody}>
                  <img src={item.image} className={classes.postImg} />
                </div>

                <div className={classes.cardFoot}>
                  <div className={classes.footActions}>
                    <div className={classes.footLeft}>
                      <span
                        style={{
                          color: item.liked === "yes" ? "red" : "black",
                          transition: "0.5s"
                        }}
                      >
                        {}
                        <Icon
                          theme={item.liked === "yes" ? "filled" : false}
                          onClick={() => this.handleLike(item, i)}
                          type="heart"
                          className={classes.actionIcon}
                        />
                      </span>
                      <Icon type="message" className={classes.actionIcon} />
                      <Icon type="upload" className={classes.actionIcon} />
                    </div>
                    <div className={classes.footRight}>
                      <TurnedInNotIcon className={classes.bookIcon} />
                    </div>
                  </div>

                  <div className={classes.likes}>
                    <b>1,290,451 likes</b>
                  </div>

                  <div className={classes.caption}>
                    <span>
                      <b>{item.username}</b> {item.caption}
                    </span>
                  </div>

                  <div className={classes.comment}></div>
                  <Divider type="horizontal" style={{ margin: "0" }} />
                  <div className={classes.addComment}>
                    <input
                      value={this.state.value}
                      placeholder="Add a comment..."
                      className={classes.input}
                      onClick={() =>
                        this.setState({ open: true, selectedPost: item })
                      }
                      readOnly
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Box>
    );
  }
}

export default withStyles(useStyles)(Home);
