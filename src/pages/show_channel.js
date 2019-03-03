import React from 'react';
import axios from 'axios';
import {BASE_URL} from '../consts';
import {getToken} from '../service';

const Message = ({props}) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.authro}</h5>
          <p className="card-text">{props.content}</p>
          <p className="card-subtitle mb-2 text-muted">{props.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], alertMessage: '', input_message: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input_message: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const request = axios.create({
      baseURL: BASE_URL,
    });

    request
      .post('/api/messages', {
        params: {token: getToken(), content: this.state.input_message},
      })
      .then(function(response) {
        if (response.data.message) {
          const messages = this.state.messages;
          messages.push(response.data.message);
          this.setState({message: messages});
        } else {
          this.setState({alertMessage: response.data.messages});
        }
      })
      .catch(error => {
        this.setState({alertMessage: error.message});
      });
  }

  getAllMessages() {
    // あとで共通化する
    const request = axios.create({
      baseURL: BASE_URL,
    });

    request
      .get('/api/messages', {
        params: {token: getToken(), channel_id: this.props.match.params.id},
      })
      .then(function(response) {
        if (response.data.messages) {
          this.setState({messages: response.data.messages});
        } else {
          this.setState({alertMessage: response.data.messages});
        }
      })
      .catch(error => {
        this.setState({alertMessage: error.message});
        // TODO delete
        this.setState({messages: this.dummyMessages()});
      });
  }

  dummyMessages() {
    return [
      {
        id: 1,
        author: 'hgoehoge',
        content: 'ぼえーーーーーーーー',
        created_at: '88',
      },
      {
        id: 2,
        author: 'hgoehoge',
        content: 'ぼえーーーーーーーー',
        created_at: '88',
      },
      {
        id: 3,
        author: 'hgoehoge',
        content: 'ぼえーーーーーーーー',
        created_at: '88',
      },
    ];
  }

  componentDidMount() {
    // TODO 定期的にchannelsを取るようにする
    this.getAllMessages();
  }

  render() {
    const messages = [];

    for (let i in this.state.messages) {
      messages.push(<Message key={i} props={this.state.messages[i]} />);
    }

    return (
      <div>
        {this.state.alertMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.alertMessage}
          </div>
        )}

        {messages}

        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                name="message"
                className="form-control"
                onChange={this.handleChange}
                placeholder="message"
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">
                <i class="fas fa-arrow-alt-circle-right" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
