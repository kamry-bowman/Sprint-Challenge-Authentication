import React, { Component } from "react";
import axios from "axios";
import Joke from './Joke';

axios.defaults.withCredentials = true;

function getToken(history) {
  const token = window.localStorage.getItem("jwt");
  if (!token) {
    history.push("/login");
  } else {
    return token;
  }
  this.getJokes = this.getJokes.bind(this);
}

export default class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  getJokes = () => {
    const context = this;
    const token = getToken(this.props.history);
    axios
      .get('http://localhost:8000/api/jokes', { headers: { authorization: token } })
      .then(res => {
        const { data: jokes } = res;
        context.setState({ jokes });
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/login");
      });
  };

  componentDidMount() {
    this.getJokes();
  }

  render() {
    const { jokes } = this.state;
    const jokesElems = jokes.map(joke => (
      <li key={joke.id}>
        <Joke joke={joke} />
      </li>
    ));
    return (
      <div>
        <h2>Joke List</h2>
        <ul>{jokesElems}</ul>
      </div>
    );
  }
}
