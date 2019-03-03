import React from 'react';
import axios from 'axios';
import {getToken} from '../service';
import {BASE_URL} from '../consts';

export class AddChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        description: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const data = this.state.data;
    switch (event.target.name) {
      case 'name':
        data.name = event.target.value;
        break;
      case 'description':
        data.description = event.target.value;
        break;
      default:
        return;
    }
    this.setState({data: data});
  }

  channelRegister() {
    // あとで共通化する
    const request = axios.create({
      baseURL: BASE_URL,
    });

    request
      .post('/api/channels', {
        params: {
          token: getToken(),
        },
      })
      .then(function(response) {
        if (response.data.token) {
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
    this.channelRegister();
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>チャンネル登録</h2>

        {this.state.alertMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.alertMessage}
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>チャンネル名</label>
            <input
              name="name"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Enter id"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={this.handleChange}
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
