import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../consts';
import {getToken} from '../service';

const Channel = ({props}) => {
  const onClick = () => {
    window.location.href = '/channel/' + props.id;
  };

  return (
    <div>
      <div className="card" to={'/channel/' + props.id} onClick={onClick}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {channels: [], alertMessage: ''};
  }

  getAllChannels() {
    // あとで共通化する
    const request = axios.create({
      baseURL: BASE_URL,
    });

    request
      .get('/api/channels', {
        params: {token: getToken()},
      })
      .then(function(response) {
        if (response.data.channels) {
          this.setState({channels: response.data.channels});
        } else {
          this.setState({alertMessage: response.data.messages});
        }
      })
      .catch(error => {
        this.setState({alertMessage: error.message});
        // TODO delete
        this.setState({channels: this.dummyChannels()});
      });
  }

  dummyChannels() {
    return [
      {id: 1, title: 'hgoehoge', description: 'description'},
      {id: 2, title: 'hgoehoge', description: 'description'},
      {id: 3, title: 'hgoehoge', description: 'description'},
      {id: 4, title: 'hgoehoge', description: 'description'},
      {id: 5, title: 'hgoehoge', description: 'description'},
    ];
  }

  componentDidMount() {
    // TODO 定期的にchannelsを取るようにする
    this.getAllChannels();
  }

  render() {
    const channels = [];

    for (let i in this.state.channels) {
      console.log(this.state.channels[i].id);
      channels.push(<Channel key={i} props={this.state.channels[i]} />);
    }

    return (
      <div>
        <h2>チャンネル一覧</h2>
        <Link to="/add_channel">
          <button className="btn btn-info">チャンネル追加</button>
        </Link>
        {this.state.alertMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.alertMessage}
          </div>
        )}

        {channels}
      </div>
    );
  }
}
