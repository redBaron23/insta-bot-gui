import React, { Component } from "react"
import { Grid } from '@material-ui/core'
import UserCard from './UserCard'


export default class Main extends Component{
  render(){
    return(
      <Grid container>
	<UserCard />
      </Grid>
    )
  }
}
