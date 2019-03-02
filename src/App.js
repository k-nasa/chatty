import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Header} from './components/header';

const App = () => (
  <div className="container bg-light">
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/user/new" component={UserNew} />
        <Route path="/sessions/new" component={SessionsNew} />
      </div>
    </BrowserRouter>
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ ジャパリパーク</p>
  </div>
);
const UserNew = () => (
  <div>
    <h2>About</h2>
    <p>フレンズに投票するページです</p>
  </div>
);
const SessionsNew = () => (
  <div>
    <h2>Friends</h2>
    <p>ここにフレンズのリストを書きます</p>
  </div>
);

export default App;
