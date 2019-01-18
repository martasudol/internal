import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import moment from 'moment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stoper</h1>
        <Stopwatch />
      </div>
    );
  }
}

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runningTime: 0,
      status: false,
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } 
      else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: moment(Date.now() - startTime).format('HH:mm:ss') });
        });
      }
      return { status: !state.status };
    });
  }

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  }

  render() {
    return (
      <div id="stopwatch-wrapper">
        <p>{this.state.runningTime}</p>
        <Button className="btn btn-outline-danger" onClick={this.handleClick}>{this.state.status ? 'Stop' : 'Start'}</Button>
        <Button className="btn btn-primary" onClick={this.handleReset}>Reset</Button>
      </div>
    );
  }
}

export default App;