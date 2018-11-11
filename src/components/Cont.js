import createDeepstream from "deepstream.io-client-js";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.ds = createDeepstream("localhost:6020");
    this.client = this.ds.login();
    this.record = this.client.record.getList("list_users/user");

    const usr = this.client.record.getRecord(props.user);
    usr.whenReady(() => {
      const user = usr.get();
      user.id = props.user;
      this.setState({ user: user });
      //console.log(this.state.user);
    });

    usr.subscribe(data => {
      this.setState({ user: data });
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <h3>
          <Link to={`/${user.id}`}>{user.name}</Link>
        </h3>
      </div>
    );
  }
}

export default Cont;
