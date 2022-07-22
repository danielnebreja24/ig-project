import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Icon, Tooltip, Tabs } from "antd";
import Ig from "./img/ig.png";
import Search from "./search";
import dmIcon from "./img/dm.png";
import TelegramIcon from "@material-ui/icons/Telegram";

const useStyles = theme => ({
  header: {
    height: "80px",
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px ridge #ddd"
  },
  line: {
    width: "1.5px",
    height: "inherit",
    backgroundColor: "#888"
  },
  igText: {
    width: "8vw",
    height: "40px",
    marginTop: "10px",
    paddingLeft: "20px"
  },
  headCenter: {
    width: "70%",
    height: "inherit",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
    // backgroundColor: 'orange'
  },
  headRight: {
    width: "15%",
    height: "inherit",
    // backgroundColor: 'brown',
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  headerBody: {
    height: "40px",
    width: "inherit",
    // backgroundColor: '#ccc',
    display: "flex",
    alignItems: "center"
  },
  headLeft: {
    width: "15%",
    height: "inherit",
    // backgroundColor: 'red',
    display: "inline-flex",

    alignItems: "center"
  },
  iconIG: {
    fontSize: "30px",
    padding: "0 20px",
    color: "#111"
  },
  icon: {
    fontSize: "30px",
    // padding: '0 20px',
    color: "#777",
    cursor: "pointer"
  },
  dmIcon: {
    fontSize: "2.6em",
    color: "#777"
  }
});

class Header extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    // console.log(this.props.location);
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.headerBody}>
          <div className={classes.headLeft}>
            <Link href="/">
              <Icon className={classes.iconIG} type="instagram" />
            </Link>
            <span className={classes.line}></span>
            <Link href="/">
              <img src={Ig} className={classes.igText} />
            </Link>
          </div>
          <div className={classes.headCenter}>
            {!this.props.location ? <Search /> : null}
          </div>
          <div className={classes.headRight}>
            <Icon className={classes.icon} type="compass" />
            {/* <Icon className={classes.icon} type="heart" /> */}
            <Link href="/message">
              {/* <img src={dmIcon} className={classes.dmIcon} /> */}
              <TelegramIcon className={classes.dmIcon} />
            </Link>
            <Link href="/profile">
              <Tooltip placement="bottom" title="View profile">
                <Icon className={classes.icon} type="user" />
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Header);
