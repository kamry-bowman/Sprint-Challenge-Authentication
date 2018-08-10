import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  } 

  onSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    axios
      .post('http://localhost:8000/api/login', { username, password })
      .then((response) => {
        window.localStorage.setItem('jwt', response.data);
        history.push('/jokes');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  render() {
    const { username, password } = this.state;
    return (
      <div>
       <form onSubmit={ this.onSubmit }>
         <label htmlFor="username">Username</label>
         <input type="text" name="username" id="username" value={ username } onChange={ this.onChange } />
         <label htmlFor="password">Password</label>
         <input type="text" name="password" id="password" value = { password } onChange={ this.onChange } />
         <input type="submit" />
       </form>
      </div>
    )
  }
}
