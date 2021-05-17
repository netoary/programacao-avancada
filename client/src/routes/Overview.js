import React from 'react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      loaded: false
    }
    this.fetchRowsAsync = this.fetchRowsAsync.bind(this);
  }

  async fetchRowsAsync() {
    return axios.get('http://127.0.0.1:3001/api/getRegistredProcess')
      .then((response) => {
        this.setState({rows: response.data });
        this.setState({loaded: true });
    });
  }

  render() {
    return (
        <div>
            <h1>Overview</h1>
            {this.state.loaded ? <Dashboard rows={this.state.rows}/> : null}
        </div>
    );
  }

  componentDidMount()
  {
    this.fetchRowsAsync();
  }
}

export default Overview;