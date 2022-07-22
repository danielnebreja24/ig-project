import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Input, message, Divider, Col } from "antd";
import logo from "../component/img/ig.png";
import axios from "axios";

const useStyles = theme => ({
  mainBody: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f1f1f1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  loginForm: {
    width: "400px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: "1px 2px 3px #ccc"
  },
  loginHead: {
    width: "100%",
    height: "30%",
    // backgroundColor: 'red',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: "40%",
    height: "40%"
  },
  loginBody: {
    height: "35%",
    // backgroundColor: 'red',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loginFr: {
    height: "100%",
    width: "80%",
    // backgroundColor: 'orange',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
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
  loginFoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    width: "100%",
    height: "20%"
  },
  forgotPwd: {
    cursor: "pointer",
    color: "#003569"
  },
  signUp: {
    height: "60px",
    width: "400px",
    backgroundColor: "#fff",
    marginTop: "20px",
    boxShadow: "1px 2px 3px #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "3px"
  },
  signBtn: {
    color: "#3897f0",
    cursor: "pointer"
  },
  loginBtn: {
    width: "100%",
    height: "30px",
    outline: "none",
    border: "1px #1890ff",
    color: "#fff",
    borderRadius: "5px"
    // backgroundColor: '#1890ff'
  }
});

var ip = window.location.href.split(":")[1].substr(2);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnColor: "none",
      btnCursor: "not-allowed",
      unameVal: "",
      pwdVal: "",
      IP: ""
    };
  }

  componentDidMount() {
    localStorage.getItem("user")
      ? this.props.history.push("/profile")
      : this.props.history.push("/login");
    document.getElementById("btnLogin").disabled = true;
  }

  handleUname = e => {
    this.setState({ unameVal: e });

    if (this.state.pwdVal !== "" && e !== "") {
      document.getElementById("btnLogin").disabled = false;
      this.setState({
        btnColor: "#1890ff",
        btnCursor: "pointer"
      });
    } else {
      document.getElementById("btnLogin").disabled = true;
      this.setState({
        btnColor: "#ddd",
        btnCursor: "not-allowed"
      });
    }
  };

  handlePwd = e => {
    this.setState({ pwdVal: e });

    if (this.state.unameVal !== "" && e !== "") {
      document.getElementById("btnLogin").disabled = false;
      this.setState({
        btnColor: "#1890ff",
        btnCursor: "pointer"
      });
    } else {
      document.getElementById("btnLogin").disabled = true;
      this.setState({
        btnColor: "#ddd",
        btnCursor: "not-allowed"
      });
    }
  };

  success = () => {
    var info = JSON.parse(localStorage.getItem("user"));

    message
      .loading("Verifying account...", 2.5)
      .then(() => message.success("Account Verified", 1.5))
      .then(() => {
        this.props.history.push("/");
        message.info("Welcome " + info.fullname, 4);
      });
  };

  failed = () => {
    message
      .loading("Verifying account...", 2.5)
      .then(() => message.error("Invalid account. Please try again!", 3));
  };

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://${ip}:3001/ig/users/login`, {
        username: this.state.unameVal,
        password: this.state.pwdVal
      })
      .then(res => {
        if (res.data.length !== 0) {
          // console.log(res.data);
          localStorage.setItem("user", JSON.stringify(...res.data));
          this.success();
        } else {
          this.failed();
        }
      });
  }

  render() {
    const { classes } = this.props;
    // console.log(process.env.SECRET_KEY);
    return (
      <div className={classes.mainBody}>
        <div className={classes.loginForm}>
          <div className={classes.loginHead}>
            <img src={logo} className={classes.logo} />
          </div>
          <div className={classes.loginBody}>
            <form
              className={classes.loginFr}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Input
                size="large"
                name="uname"
                value={this.state.unameVal}
                onChange={e => this.handleUname(e.target.value)}
                placeholder="Phone number, username, email"
                autoFocus
              />
              <Input.Password
                size="large"
                name="pwd"
                value={this.state.pwdVal}
                onChange={e => this.handlePwd(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                style={{
                  backgroundColor: this.state.btnColor,
                  cursor: this.state.btnCursor
                }}
                id="btnLogin"
                className={classes.loginBtn}
                onClick={e => this.handleSubmit(e)}
              >
                Log In
              </button>
            </form>
          </div>
          <Col className={classes.span}>
            <Divider>
              <b className={classes.dividerTxt}>OR</b>
            </Divider>
          </Col>
          <div className={classes.loginFoot}>
            <span className={classes.forgotPwd}>Forgot Password?</span>
          </div>
        </div>

        <div className={classes.signUp}>
          <span>
            Don't have an account?{" "}
            <b
              className={classes.signBtn}
              onClick={() => this.props.history.push("/signup")}
            >
              Sign up
            </b>
          </span>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Login);
