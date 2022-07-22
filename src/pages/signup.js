import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Col, Divider, Input, Button, message } from "antd";

import IgPhone from "../component/img/ig-phone.png";
import Ig from "../component/img/ig.png";
import axios from "axios";

const useStyles = theme => ({
  mainBody: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  signupForm: {
    height: "650px",
    width: "400px",
    backgroundColor: "#fff",
    boxShadow: "1px 2px 3px #ccc"
  },
  loginForm: {
    height: "70px",
    width: "400px",
    backgroundColor: "#fff",
    boxShadow: "1px 2px 3px #ccc",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtn: {
    color: "#3897f0",
    cursor: "pointer"
  },
  rightDiv: {
    height: "100%",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: 'red'
  },
  igPhone: {
    marginRight: "20px",
    height: "600px",
    width: "90%"
  },
  formHead: {
    height: "30%",
    // backgroundColor: 'red',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  igLogo: {
    width: "45%"
  },
  txtLogo: {
    width: "60%",
    textAlign: "center",
    color: "#888",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px"
  },
  span: {
    width: "80%",
    margin: "10px auto"
  },
  dividerTxt: {
    fontSize: "13.5px",
    letterSpacing: "1.2px",
    color: "#777"
  },
  formBody: {
    width: "75%",
    height: "40%",
    margin: "auto",
    //  backgroundColor: 'red',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  formFoot: {
    //  backgroundColor: 'red',
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  footTxt: {
    width: "60%",
    fontSize: "15px",
    textAlign: "center",
    color: "#888"
  }
});

var ip = window.location.href.split(":")[1].substr(2);

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      mobile: "",
      name: "",
      uname: "",
      pwd: "",
      btnState: true,
      IP: ""
    };
  }

  error = () => {
    message.error(
      "Username, email or mobile already exist. Please choose another!",
      5
    );
  };

  success = () => {
    message.success("Successfully created an account. You can now Login", 4);
  };

  handleClick = () => {
    axios
      .post(`http://${ip}:3001/ig/users/create`, this.state)
      .then(res => {
        if (res.data === "duplicate") {
          this.error();
        } else {
          // this.setState({
          //   mobile: "",
          //   name: "",
          //   uname: "",
          //   pwd: "",
          //   btnState: true
          // });
          console.log(res.data);
          this.success();
        }
      })
      .catch(res => {
        console.log("Error");
      });
  };

  handleMobile(e) {
    this.setState({ mobile: e.replace("'", "").toLowerCase() });
    e && this.state.name && this.state.uname && this.state.pwd !== ""
      ? this.setState({ btnState: false })
      : this.setState({ btnState: true });
  }

  handleName(e) {
    this.setState({ name: e.replace("'", "") });
    e && this.state.mobile && this.state.uname && this.state.pwd !== ""
      ? this.setState({ btnState: false })
      : this.setState({ btnState: true });
  }

  handleUname(e) {
    this.setState({ uname: e.replace("'", "").toLowerCase() });
    e && this.state.name && this.state.mobile && this.state.pwd !== ""
      ? this.setState({ btnState: false })
      : this.setState({ btnState: true });
  }

  handlePwd(e) {
    this.setState({ pwd: e.replace("'", "").toLowerCase() });
    e && this.state.name && this.state.uname && this.state.mobile !== ""
      ? this.setState({ btnState: false })
      : this.setState({ btnState: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainBody}>
        <div className={classes.leftDiv}>
          <img src={IgPhone} className={classes.igPhone} />
        </div>
        <div className={classes.rightDiv}>
          <div className={classes.signupForm}>
            <div className={classes.formHead}>
              <img src={Ig} className={classes.igLogo} />
              <span className={classes.txtLogo}>
                Sign up to see photos and videos from your friends.
              </span>
            </div>
            <Col className={classes.span}>
              <Divider>
                <b className={classes.dividerTxt}>OR</b>
              </Divider>
            </Col>
            <div className={classes.formBody}>
              <Input
                size="large"
                value={this.state.mobile}
                onChange={e => this.handleMobile(e.target.value)}
                placeholder="Mobile number or email"
                required
                autoFocus
              />
              <Input
                size="large"
                value={this.state.name}
                onChange={e => this.handleName(e.target.value)}
                placeholder="Fullname"
                required
              />
              <Input
                size="large"
                value={this.state.uname}
                onChange={e => this.handleUname(e.target.value)}
                placeholder="Username"
                required
              />
              <Input.Password
                size="large"
                value={this.state.pwd}
                onChange={e => this.handlePwd(e.target.value)}
                placeholder="Password"
                type="password"
                required
              />
              <Button
                type="primary"
                onClick={this.handleClick}
                disabled={this.state.btnState}
                block
              >
                Sign up
              </Button>
            </div>
            <div className={classes.formFoot}>
              <span className={classes.footTxt}>
                By signing up, you agree to our <strong>Terms</strong> ,{" "}
                <strong>Data Policy</strong> and <strong>Cookies Policy</strong>{" "}
                .
              </span>
            </div>
          </div>

          <div className={classes.loginForm}>
            <span>
              Have an account?{" "}
              <b
                className={classes.loginBtn}
                onClick={() => this.props.history.push("/login")}
              >
                Log in
              </b>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(SignUp);
