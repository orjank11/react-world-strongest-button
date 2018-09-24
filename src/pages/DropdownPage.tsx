import * as React from 'react';
import Button from '../Button';

const dropdown = [{
  label: 'Item 1',
  icon: <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
    <path id="Time" className="cls-1" d="M278,1419a22,22,0,1,0,22,22A22.025,22.025,0,0,0,278,1419Zm0,41a19,19,0,1,1,19-19A19,19,0,0,1,278,1460Zm10-20h-9v-11a1.5,1.5,0,0,0-3,0v14h12A1.5,1.5,0,0,0,288,1440Z" transform="translate(-256 -1419)" />
  </svg>,
  href: "something"
}];

class ModalPage extends React.Component {

  render() {
    return (
      <div>
        <Button dropdown={dropdown}>
          Dropdown en amazing
        </Button>
      </div>
    );
  }
}

export default ModalPage;