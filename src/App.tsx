import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoadingPage from 'src/pages/LoadingPage';
import ModalPage from 'src/pages/ModalPage';
import DropdownPage from 'src/pages/DropdownPage';
import FetchPage from 'src/pages/FetchPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/loading" component={LoadingPage} />
        <Route path="/modal" component={ModalPage} />
        <Route path="/dropdown" component={DropdownPage} />
        <Route path="/fetch" component={FetchPage} />
      </Switch>
    </Router>
  );
}

export default App;