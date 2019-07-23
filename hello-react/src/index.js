import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import App from './AppOne';
// import App from './AppTwo';
// import App from './AppThree';
// import App from './AppFour';
import App from './AppEndgame';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
