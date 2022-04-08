import React from 'react';
import classes from './Navigation.module.css'
import { useContext } from 'react';
import AuthContext from '../store/Auth-Context';

const Navigation = () => {
  const ctx = useContext(AuthContext)
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.islogged && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.islogged && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.islogged && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
