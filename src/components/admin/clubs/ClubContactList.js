import React, { Component } from "react";

import EditContact from "./club/EditContact";
class ClubContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: this.props.contacts ? this.props.contacts : [],
      club: this.props.club,
      isAddContact: this.props.isAddContact ? true : false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.contacts !== prevProps.contacts) {
      this.setState({ contacts: this.props.contacts });
    }
    if (this.props.isAddContact !== prevProps.isAddContact) {
      this.setState({ isAddContact: !this.state.isAddContact });
    }
  }
  render() {
    const { contacts, club, isAddContact } = this.state;
    return (
      <ul className="collection mc-collection">
        {contacts
          ? contacts.map(contact => (
              <EditContact contact={contact} clubId={club._id} isEdit={false} />
            ))
          : ""}
        {isAddContact ? (
          <EditContact
            contact={{}}
            clubId={club._id}
            isEdit={false}
            isAdd={isAddContact}
          />
        ) : (
          ""
        )}
      </ul>
    );
  }
}

export default ClubContactList;
