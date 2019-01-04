import React, { Component } from "react";

import EditSocialMedia from "./club/EditSocialMedia";
import AddSocialMedia from "./club/AddSocialMedia";

class ClubSocialMediaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      social_medias: [],
      club: {},
      isAdd: this.props.isAddSocialMedia ? true : false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.social_medias !== prevProps.social_medias) {
      this.setState({
        ...this.state.social_medias,
        social_medias: this.props.social_medias
      });
    }
    if (this.props.isAddSocialMedia !== prevProps.isAddSocialMedia) {
      this.setState({ isAdd: !this.state.isAdd });
    }
    if (this.props.club !== prevProps.club) {
      this.setState({ club: this.props.club });
    }
  }
  render() {
    const { social_medias, club, isAdd } = this.state;
    return (
      <ul className="collection mc-collection">
        {social_medias
          ? social_medias.map(sm => (
              <EditSocialMedia
                key={sm._id}
                social_media={sm}
                clubId={club._id}
              />
            ))
          : ""}
        {isAdd ? (
          <AddSocialMedia clubId={club._id} afterSave={this.props.afterSave} />
        ) : (
          ""
        )}
      </ul>
    );
  }
}

export default ClubSocialMediaList;
