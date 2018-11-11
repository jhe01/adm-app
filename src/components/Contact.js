import createDeepstream from "deepstream.io-client-js";
import React, { Component } from "react";
import Cont from "../components/Cont";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users_list: []
    };
    this.ds = createDeepstream("localhost:6020");
    this.client = this.ds.login();
  }

  componentDidMount() {
    const record = this.ds.record.getList("list_users/user");
    record.subscribe(this._setEntries.bind(this));
  }

  _setEntries(entries) {
    this.setState({ users_list: entries });
  }

  getUser(u) {}

  render() {
    const { users_list } = this.state;

    return (
      <div>
        <h4>List of Users</h4>
        {users_list.map((u, idx) => (
          <Cont key={idx} user={u} />
        ))}
      </div>
    );
  }
}

export default Contact;
