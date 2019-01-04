import React, { Component } from "react";

import EditContact from "./club/EditContact";
import AddContact from "./club/AddContact";

class ClubContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      club: {},
      isAddContact: this.props.isAddContact ? true : false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.contacts !== prevProps.contacts) {
      this.setState({ ...this.state.contacts, contacts: this.props.contacts });
    }
    if (this.props.isAddContact !== prevProps.isAddContact) {
      this.setState({ isAddContact: !this.state.isAddContact });
    }
    if (this.props.club !== prevProps.club) {
      this.setState({ club: this.props.club });
    }
  }
  render() {
    const { contacts, club, isAddContact } = this.state;
    return (
      <ul className="collection mc-collection">
        {contacts
          ? contacts.map(contact => (
              <EditContact
                key={contact._id}
                contact={contact}
                clubId={club._id}
              />
            ))
          : ""}
        {isAddContact ? (
          <AddContact clubId={club._id} afterSave={this.props.afterSave} />
        ) : (
          ""
        )}
      </ul>
    );
  }
}

export default ClubContactList;
