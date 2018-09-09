import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './Button';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <Button>Test button</Button>
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
