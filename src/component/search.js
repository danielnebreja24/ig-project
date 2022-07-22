import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Input } from "antd";
import SearchComponent from "./searchComponent";

const { Search } = Input;
const useStyles = theme => ({
  search: {
    width: "300px"
  }
});

class SearchIG extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
  }
  handleVisible = () => {
    this.setState({ visible: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Search
          className={classes.search}
          //   onFocus={() => this.handleVisible()}
          //   onBlur={() => this.setState({ visible: false })}
          onClick={() => this.handleVisible()}
          placeholder="Search"
          readOnly
        />
        <SearchComponent
          visible={this.state.visible}
          cancel={() => this.setState({ visible: false })}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(SearchIG);
