import React from 'react';
import {Link} from 'react-router-dom';
import {getToken} from '../service';

export const Header = () => {
  const loggedIn = () => (getToken() ? true : false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        {loggedIn ? (
          <Link className="navbar-brand" to="/">
            Chatty
          </Link>
        ) : (
          <Link className="navbar-brand" to="/channels">
            Chatty
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <i className="fas fa-bars" />
        </button>
        {loggedIn ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users/new">
                  新規登録
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sessions/new">
                  ログイン
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/channels">
                  チャンネル一覧
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  プロフィール
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
