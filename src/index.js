import React from 'react';
import { render } from 'react-dom';

const welcomeMessage = 'Aurthors Haven';

const Welcome = () => <p>{welcomeMessage}</p>;

render(<Welcome />, document.getElementById('app'));
