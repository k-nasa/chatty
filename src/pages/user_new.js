import React from 'react';

export class UserNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
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
      case 'email':
        data.email = event.target.value;
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

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>新規登録</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>メールアドレス</label>
            <input
              type="email"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              placeholder="Enter email"
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
