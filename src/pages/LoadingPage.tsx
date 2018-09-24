import * as React from 'react';
import Button from '../Button';

class LoadingButton extends React.Component {
  state = {
    failed: false,
    success: false,
    loading: false,
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ loading: true })}
          isLoading={this.state.loading}
          isSuccess={this.state.success}
          failure={this.state.failed}
        >
          LOADING
        </Button>
        <div className="control-panel">
          <button onClick={() => this.setState({ failed: true })} className="fail">Fail</button>
          <button onClick={() => this.setState({ success: true })} className="fail">Success</button>
        </div>
      </div>
    );
  }
}

export default LoadingButton;