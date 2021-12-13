import React, { Component } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = { displayName: '' }
      }

    // Calls user display name route
    componentDidMount() {
        fetch('/userinfo')
        .then(res => res.json())
        .then(displayName => this.setState({displayName}, () => console.log(displayName)));
    }

      // Renders login/logout link
      render() {
        var name = this.state.displayName;
        var oauthLink;

        // Checks if user logged in
        if(name.length == 0) {
            oauthLink = <a href="http://localhost:5000/auth/google">Sign in with Google</a> 
        } else {
            oauthLink = <a href="http://localhost:5000/logout"> Sign out {name}! </a>
        }

        return (
          <div>
            {oauthLink}
          </div>
        )
    }
}

export default Login