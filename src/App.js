import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import MainNavbar from './layout/MainNavbar';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import LootBoxCalc from './pages/LootBoxCalc';


const App = () => (
  <>
    <BrowserRouter>
      <MainNavbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about-me">
          <AboutMe />
        </Route>
        <Route path="/loot-box-calc">
          <LootBoxCalc />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
