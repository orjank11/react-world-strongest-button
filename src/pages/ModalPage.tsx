import * as React from 'react';
import Button from '../Button';

class ModalPage extends React.Component {

  render() {
    return (
      <div>
        <Button
          modal={<p>Hello world</p>}
        >
          TRIGGER MODAL
        </Button>
      </div>
    );
  }
}

export default ModalPage;