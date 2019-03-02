import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Header} from './components/header';
import {UserNew} from './pages/user_new';
import {SessionsNew} from './pages/sessions_new';

const App = () => (
  <div className="container bg-light">
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/users/new" component={UserNew} />
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

export default App;
