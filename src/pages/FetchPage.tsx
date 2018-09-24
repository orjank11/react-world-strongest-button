import * as React from 'react';
import Button from '../Button';

class LoadingButton extends React.Component {
  state = {
    fetchData: 'https://data.brreg.no/enhetsregisteret/api/enheter/987421987',
  }
  render() {
    return (
      <div>
        <Button
          fetch={this.state.fetchData}
        >
          Fetch noe
        </Button>
        <div className="control-panel">
          <button onClick={() => this.setState({ fetchData: 'https://data.brreg.no/enhetsregisteret/api/enheter/987421987' })} className="fail">Hent noe som ikke virker</button>
          <button onClick={() => this.setState({ fetchData: 'https://data.brreg.no/enhetsregisteret/api/enheter/920674461' })} className="success">Hent noe som virker</button>
        </div>
      </div>
    );
  }
}

export default LoadingButton;