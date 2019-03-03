import React from 'react';
import axios from 'axios';
import {login} from '../service';

export class UserNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userId: '',
        password: '',
        passwordConfirmation: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const data = this.state.data;
    switch (event.target.name) {
      case 'userId':
        data.userId = event.target.value;
        break;
      case 'password':
        data.password = event.target.value;
        break;
      case 'passwordConfirmation':
        data.passwordConfirmation = event.target.value;
        break;
      default:
        return;
    }
    this.setState({data: data});
  }

  userRegister() {
    // あとで共通化する
    const request = axios.create({
      baseURL: 'http://localhost:8000',
    });

    request
      .post('/api/users', {
        params: {
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        },
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
    this.userRegister();
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>新規登録</h2>

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
              name="userId"
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

          <div className="form-group">
            <label>パスワード再入力</label>
            <input
              type="password"
              name="passwordConfirmation"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            新規登録
          </button>
        </form>
      </div>
    );
  }
}
