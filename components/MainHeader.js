import classes from './MainHeader.module.css'
import React from 'react';
import Navigation from './Navigation';

const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation   />
    </header>
  );
};

export default MainHeader;
