import React from 'react';
import { Link } from 'react-router-dom';

export class NavButton extends React.PureComponent {
  render() {
    return (
        <li className="nav-item active">
                <Link to="/second" className="unset-anchor nav-link">Second</Link>
        </li>
        );
  }

}