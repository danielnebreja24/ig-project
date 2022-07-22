import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Icon, Popover, Modal, Button } from "antd";

const { TabPane } = Tabs;

const useStyles = theme => ({
  mainTab: {
    // backgroundColor: 'red',
    height: "600px",
    width: "90%",
    textAlign: "center"
    // overflow: 'auto'
  },
  mainBodyPost: {
    // backgroundColor: 'red',
    width: "100%",
    height: "500px",
    overflow: "auto"
  },
  img: {
    width: "200px",
    height: "180px",
    margin: "10px",
    border: "1px dotted",
    borderRadius: "5px",
    cursor: "pointer"
  },
  divContent: {
    display: "flex",
    justifyContent: "space-around",
    fontWeight: "bold",
    width: "180px",
    height: "22px"
  },
  line: {
    padding: "6px 1px",
    backgroundColor: "#888"
  },
  spanContent: {
    cursor: "pointer"
  },
  imgPreview: {
    width: "100%"
  }
});

class ProfileTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      border: "",
      border1: "",
      visible: false,
      selectedItem: null
    };
  }

  handlePreview = () => {
    console.log(this.state.selectedItem);
    this.setState({ visible: true });
  };

  handleClick = item => {
    this.setState({ selectedItem: item });
  };

  handleCancel = () => this.setState({ visible: false });

  render() {
    const { classes, posts } = this.props;

    return (
      <Tabs className={classes.mainTab} defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="table" />
              <b>POSTS</b>
            </span>
          }
          key="1"
        >
          <div className={classes.mainBodyPost}>
            {posts.map((item, i) => (
              <Popover
                content={
                  <div className={classes.divContent}>
                    <span
                      style={{ borderBottom: this.state.border }}
                      onMouseEnter={() =>
                        this.setState({ border: "2px ridge #888" })
                      }
                      onMouseLeave={() => this.setState({ border: "" })}
                      className={classes.spanContent}
                      onClick={() => this.handlePreview(item)}
                    >
                      <Icon type="eye" theme="filled" /> Preview
                    </span>
                    <span className={classes.line}></span>
                    <span
                      style={{ borderBottom: this.state.border1 }}
                      onMouseEnter={() =>
                        this.setState({ border1: "2px ridge #888" })
                      }
                      onMouseLeave={() => this.setState({ border1: "" })}
                      className={classes.spanContent}
                    >
                      Delete <Icon type="delete" theme="filled" />
                    </span>
                  </div>
                }
                key={i}
                title={item.caption}
                trigger="focus"
              >
                <input
                  type="image"
                  onClick={() => this.handleClick(item)}
                  src={item.image}
                  className={classes.img}
                />
              </Popover>
            ))}
            <Modal
              visible={this.state.visible}
              title={
                this.state.selectedItem ? this.state.selectedItem.caption : null
              }
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>
              ]}
            >
              <img
                src={
                  this.state.selectedItem ? this.state.selectedItem.image : null
                }
                alt="Preview"
                className={classes.imgPreview}
              />
            </Modal>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="desktop" />
              <b>IGTV</b>
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="book" />
              <b>SAVED</b>
            </span>
          }
          key="3"
        >
          Tab 3
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="contacts" />
              <b>TAGGED</b>
            </span>
          }
          key="4"
        >
          Tab 4
        </TabPane>
      </Tabs>
    );
  }
}

export default withStyles(useStyles)(ProfileTabs);
