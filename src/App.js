import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Header} from './components/header';
import {UserNew} from './pages/user_new';
import {SessionsNew} from './pages/sessions_new';
import {getToken} from './service';
import {Channels} from './pages/index_channels';
import {Messages} from './pages/show_channel';
import {AddChannel} from './pages/add_channel';

const App = () => (
  <div className="container-fluid bg-light">
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/users/new" component={UserNew} />
        <Route path="/sessions/new" component={SessionsNew} />
        <PrivateRoute path="/channel/:id" component={Messages} />
        <PrivateRoute path="/channels" component={Channels} />
        <PrivateRoute path="/profile" component={Home} />
        <PrivateRoute path="/add_channel" component={AddChannel} />
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

const PrivateRoute = ({component: Component, ...rest}) => {
  const loggedIn = () => (getToken() ? true : false);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn() === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sessions/new',
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
};

export default App;
