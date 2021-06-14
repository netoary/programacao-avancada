import React from 'react';
import Dashboard from '../components/Dashboard';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      formattedRows: props.rows.map(row => ({
        ...row,
        id: row._id,
      })),
    }
  }

  render() {
    return (
        <div>
            <h1>Overview</h1>
            <Dashboard rows={this.state.formattedRows}/>
        </div>
    );
  }
}

export default Overview;