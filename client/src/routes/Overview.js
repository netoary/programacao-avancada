import React from 'react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  }

  async fetchRowsAsync() {
    return axios.get('http://127.0.0.1:3001/api/getRegistredProcess')
      .then((response) => {
        debugger;
        this.setState({rows: response.data});
    });
  }

  render() {
    return (
        <div>
            <h1>Overview</h1>
            <Dashboard rows={this.state.rows}/>
        </div>
    );
  }

  componentDidMount()
  {
    this.fetchRowsAsync();
  }
}

export default Overview;