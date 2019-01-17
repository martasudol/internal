import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
// import moment from 'moment';

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
          this.setState({ runningTime: Date.now() - startTime });
        });
      }
      return { status: !state.status };
    });
  }

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  }

  getTime() {
    this.setState({
      runningTime: this.state.runningTime.format('HH:mm:ss')
    });
  }

  render() {
    // const { status, runningTime } = this.state;
    return (
      <div id="stopwatch-wrapper">
        {/* <p>{Math.round(this.state.runningTime/1000)}s</p> */}
        <p>{this.state.runningTime}</p>
        <Button className="btn btn-outline-danger" onClick={this.handleClick}>{this.state.status ? 'Stop' : 'Start'}</Button>
        <Button className="btn btn-primary" onClick={this.handleReset}>Reset</Button>
      </div>
    );
  }
}

export default App;