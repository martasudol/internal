import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
// import Moment from 'moment';
// import moment = require('moment');

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

class Stopwatch extends Component {
  state = {
    status: false,
    runningTime: 0,
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // componentDidMount() {
  //   setInterval( () => {
  //     this.setState({
  //       runningTime : this.state.runningTime.toLocaleString()
  //     })
  //   },1000)
  // }

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } 
      else {
        // const startTime = Date.now() - this.state.runningTime;
        const startTime = new Date() - this.state.runningTime.toLocaleString();
        this.timer = setInterval(() => {
          // this.setState({ runningTime: Date.now() - startTime });
          this.setState({ runningTime: new Date().toLocaleString() - startTime })
        });
      }
      return { status: !state.status };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  };

  render() {
      const { status, runningTime } = this.state;
      return (
        <div id="stopwatch-wrapper">
          <p>{new Date().getSeconds()}</p>
          <p>{runningTime}ms</p>
          <Button className="btn btn-outline-danger" onClick={this.handleClick}>{status ? 'Stop' : 'Start'}</Button>
          <Button className="btn btn-primary" onClick={this.handleReset}>Reset</Button>
        </div>
      );
      }
}

export default App;
