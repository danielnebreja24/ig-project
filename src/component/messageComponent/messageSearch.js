import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Input, AutoComplete } from "antd";
import axios from "axios";

const { Option } = AutoComplete;

const useStyles = {
  input: {
    width: "500px"
  }
};
var ip = window.location.href.split(":")[1].substr(2);
class MessageSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
      this.handleSelect(this.state.values, this.state.child);
    }
  }

  handleSelect = (e, b) => {
    this.setState({ values: e, child: b });
    axios
      .get(
        `http://${ip}:3001/ig/messages/searchMessage/${e}/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      )
      .then(res => {
        res.data.length === 0
          ? this.props.openChat(res.data, e, b.props.children, "not")
          : this.props.openChat(res.data, e, b.props.children, "yes");
      })
      .catch(err => console.log(err));
  };

  handleSearch = e => {
    let user = e;
    axios
      .post(`http://${ip}:3001/ig/users/searchUser`, { user })
      .then(res => {
        // this.props.list(res.data);
        this.setState({ dataSource: [] });
        res.data.map(item => {
          this.setState({
            dataSource: this.state.dataSource.concat({
              key: item.id,
              value: item.username
            })
          });
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const children = this.state.dataSource.map(i => (
      <Option key={i.key}>{i.value}</Option>
    ));
    return (
      <AutoComplete
        size="large"
        dataSource={this.state.dataSource}
        className={classes.input}
        placeholder="Search IG users . . ."
        onSearch={this.handleSearch}
        onSelect={this.handleSelect}
        allowClear
        autoFocus
      >
        {children}
      </AutoComplete>
      // </div>
    );
  }
}

export default withStyles(useStyles)(MessageSearch);
