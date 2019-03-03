import React from 'react';
import axios from 'axios';
import {login} from '../service';

export class SessionsNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: '',
        password: '',
      },
      alertMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const data = this.state.data;
    switch (event.target.name) {
      case 'id':
        data.id = event.target.value;
        break;
      case 'password':
        data.password = event.target.value;
        break;
      default:
        return;
    }
    this.setState({data: data});
  }

  getToken() {
    // あとで共通化する
    const request = axios.create({
      baseURL: 'http://localhost:8000',
    });

    request
      .post('/api/authenticate', {
        params: {email: this.email, password: this.password},
      })
      .then(function(response) {
        if (response.data.token) {
          login(response.data.token);
          window.location.href = '/channels';
        } else {
          this.setState({alertMessage: response.data.messages});
        }
      })
      .catch(error => {
        this.setState({alertMessage: error.message});
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getToken();
  }

  render() {
    return (
      <div>
        <h2>ログイン</h2>
        {this.state.alertMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.alertMessage}
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>ユーザーID</label>
            <input
              type="text"
              name="id"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Enter id"
            />
          </div>

          <div className="form-group">
            <label>パスワード</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            ログイン
          </button>
        </form>
      </div>
    );
  }
}
