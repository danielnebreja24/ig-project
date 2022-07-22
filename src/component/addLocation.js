import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Button, Icon} from 'antd'

const useStyles = theme => ({

})


class AddLocation extends React.Component {
  constructor() {
    super()
  }


  render() {
    return(
      <Button style={{textAlign: 'left'}} block><Icon type='environment' /> Add Location</Button>
    )
  }
}


export default withStyles(useStyles)(AddLocation)

