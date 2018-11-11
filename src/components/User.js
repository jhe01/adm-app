import createDeepstream from "deepstream.io-client-js";
import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };

    this.ds = createDeepstream("localhost:6020");
    this.client = this.ds.login();
    this.usr = this.client.record.getRecord("users/" + props.match.params.id);
  }

  onSubmit = e => {
    e.preventDefault();

    this.usr.set(this.state);
    this.props.history.push("/contact");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.usr.whenReady(() => {
      const user = this.usr.get();
      user.id = "users/" + this.props.match.params.id;
      this.setState(this.usr.get());
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col s4" />
            <div className="col s4">
              <div className="input-field col s12">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="validate"
                  onChange={this.onChange}
                  defaultValue={name}
                />
                <label htmlFor="name" className={name ? "active" : ""}>
                  Name
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="validate"
                  onChange={this.onChange}
                  defaultValue={email}
                />
                <label htmlFor="email" className={email ? "active" : ""}>
                  Email
                </label>
              </div>
              <input
                type="submit"
                className="waves-effect waves-light btn"
                value="Save"
              />
            </div>
            <div className="col s4" />
          </div>
        </form>
      </div>
    );
  }
}

export default User;
