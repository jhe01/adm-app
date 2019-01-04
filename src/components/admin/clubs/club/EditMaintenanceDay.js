import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Input } from "react-materialize";

import { updateGolfClub } from "../../../../actions/clubActions";

class EditMaintenanceDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maintenance_day: this.props.club.maintenance_day,
      clubId: this.props.club._id,
      handleAfterSave: this.props.afterSave
    };
  }

  handleOnInputChange = e => {
    this.setState({ maintenance_day: e.target.value });
  };

  handleClickSave = () => {
    const { clubId, maintenance_day, handleAfterSave } = this.state;
    const data = { maintenance_day, _id: clubId };
    this.props.updateGolfClub(data);
    handleAfterSave();
  };

  render() {
    const { maintenance_day } = this.state;
    return (
      <div className="row">
        <div className="col s12">
          <button
            className="btn btn-small blue darken-4 action-btn "
            onClick={this.handleClickSave}
          >
            SAVE
          </button>
        </div>
        <Input
          name="maintenance_day"
          s={12}
          type="select"
          value={maintenance_day}
          onChange={this.handleOnInputChange}
          // error={errors.eventType ? errors.eventType : ""}
        >
          <option value="">- SELECT -</option>
          <option value="MONDAY">MONDAY</option>
          <option value="TUESDAY">TUESDAY</option>
          <option value="WEDNESDAY">WEDNESDAY</option>
          <option value="THURSDAY">THURSDAY</option>
          <option value="FRIDAY">FRIDAY</option>
          <option value="SATURDAY">SATURDAY</option>
          <option value="SUNDAY">SUNDAY</option>
        </Input>
      </div>
    );
  }
}

EditMaintenanceDay.propTypes = {
  updateGolfClub: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateGolfClub }
)(EditMaintenanceDay);
