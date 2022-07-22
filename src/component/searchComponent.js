import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Input, Drawer, Tooltip, AutoComplete, Icon } from "antd";
import IG_search from "./img/ig-search.png";
import { Grow, Collapse } from "@material-ui/core";
import axios from "axios";

const useStyles = theme => ({
  ig_search: {
    width: "50px",
    height: "50px",
    cursor: "pointer"
  },
  mainDiv: {
    height: "100%",
    width: "100%",
    backgroundColor: "red"
  },
  autoComplete: {
    width: "70%",
    marginLeft: "20px"
  },
  span: {
    display: "inline-flex",
    alignItems: "center",
    width: "50%"
    // backgroundColor: "red"
  }
});

var ip = window.location.href.split(":")[1].substr(2);
class SearchComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      displayInput: false,
      dataSource: [],
      value: ""
    };
  }

  handleClick = () => {
    this.setState({ displayInput: !this.state.displayInput });
  };

  handleChange = e => {
    const user = e.value;
    this.setState({ value: user });
  };
  handleSearch = user => {
    axios
      .post(`http://${ip}:3001/ig/users/searchUser`, { user })
      .then(res => {
        this.setState({ dataSource: [] });
        res.data.map(i =>
          this.setState({
            dataSource: this.state.dataSource.concat(i.username)
          })
        );
      })
      .catch(err => console.log(err));
  };

  handleSelect = e => {
    console.log(e);
  };

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        title={
          <span className={classes.span}>
            <Tooltip placement="bottom" title="Click to search">
              <img
                onClick={() => this.handleClick()}
                src={IG_search}
                className={classes.ig_search}
              />
            </Tooltip>
            <span style={{ width: "100%" }}>
              <Grow direction="left" in={this.state.displayInput}>
                <AutoComplete
                  dataSource={this.state.dataSource}
                  onSearch={this.handleSearch}
                  className={classes.autoComplete}
                  size="large"
                  onSelect={e => this.handleSelect(e)}
                >
                  <Input
                    placeholder="Search profile . . . "
                    onKeyPress={e => this.handleChange(e.target)}
                    allowClear={true}
                  />
                </AutoComplete>
              </Grow>
            </span>
          </span>
        }
        placement="top"
        height={700}
        closable={true}
        onClose={this.props.cancel}
        visible={this.props.visible}
      >
        <div className={classes.mainDiv}></div>
      </Drawer>
    );
  }
}

export default withStyles(useStyles)(SearchComponent);
