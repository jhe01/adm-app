import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import {
  getEvent,
  uploadBannerEvent,
  changeStatusEvent
} from "../../../actions/eventActions";

import { Button, Icon } from "react-materialize";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Header from "../../template/Header";
import Sidenav from "../../template/Aside";
import EventImage from "../util/EventImage";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      club: {},
      dateOfEvent: "",
      from: "",
      to: "",
      eventType: {},
      eventCategory: {},
      numberOfPlayers: "",
      details: "",
      oneDayOnly: false,
      banner: [],
      isWholeDay: false,
      timeTo: "",
      timeFrom: "",
      id: "",
      is_active: true
    };
    this.swAlert = withReactContent(Swal);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.event) {
      const {
        title,
        club,
        dateOfEvent,
        from,
        to,
        eventType,
        eventCategory,
        numberOfPlayers,
        details,
        oneDayOnly,
        banner,
        isWholeDay,
        timeTo,
        timeFrom,
        _id,
        is_active
      } = nextProps.event;
      this.setState({
        id: _id,
        title,
        club,
        dateOfEvent,
        from,
        to,
        eventType,
        eventCategory,
        numberOfPlayers,
        details,
        oneDayOnly,
        banner,
        timeTo,
        timeFrom,
        isWholeDay,
        is_active
      });
    }
  }
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }
  onClickDisable = () => {
    if (this.props.event.is_active) {
      this.swAlert
        .fire({
          title: (
            <div>
              <h5>Are you sure?</h5>
              <p style={{ fontSize: "1.3rem" }}>
                Event "{this.props.event.title}" will be disabled!
              </p>
            </div>
          ),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          confirmButtonClass: "blue darken-2"
        })
        .then(result => {
          if (result.value) {
            this.props.changeStatusEvent(this.props.event);
          }
        });
    } else {
      this.props.changeStatusEvent(this.props.event);
    }
  };
  onClickUploadImage = () => {
    this.swAlert
      .fire({
        title: "Select Image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-lable": "Upload Events Banner!"
        }
      })
      .then(result => {
        if (result.value) {
          const evnt = {};
          evnt.id = this.props.event._id;
          evnt.file = result.value;
          this.props.uploadBannerEvent(evnt);
        }
      });
  };
  onClickDeleteImage = () => {
    this.setState({ banner: [] });
  };
  render() {
    const {
      title,
      club,
      dateOfEvent,
      from,
      to,
      eventType,
      eventCategory,
      banner,
      details,
      oneDayOnly,
      id,
      timeFrom,
      timeTo,
      isWholeDay,
      is_active
    } = this.state;

    const createMarkUp = () => {
      return { __html: details !== "" ? details : "No Details." };
    };
    const displayDeleteImgBtn = (
      <button
        className="btn-floating halfway-fab waves-effect waves-light red"
        onClick={this.onClickDeleteImage}
      >
        <i className="material-icons">delete</i>
      </button>
    );
    const displayUploadBtn = (
      <button
        className="btn-floating halfway-fab waves-effect waves-light red"
        onClick={this.onClickUploadImage}
      >
        <i className="material-icons">photo_camera</i>
      </button>
    );
    const displayEnableBtn = (
      <Button
        waves="light"
        className="red darken-2 action-btn"
        onClick={this.onClickDisable}
      >
        Enable <Icon left>check</Icon>
      </Button>
    );
    const displayDisableBtn = (
      <Button
        waves="light"
        className="red darken-2 action-btn"
        onClick={this.onClickDisable}
      >
        Disable <Icon left>clear</Icon>
      </Button>
    );
    return (
      <React.Fragment>
        <Header branding={`Event - ${title}`} />
        <Sidenav active="add-event" />
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col s12">
            <Link
              to={`/edit-event/${id}`}
              className="btn blue darken-2 action-btn"
            >
              EDIT<Icon left>edit</Icon>
            </Link>
            {is_active ? displayDisableBtn : displayEnableBtn}
            <div className="row" style={{ marginTop: "5px" }}>
              <div className="col s12 m3">
                <div className="card">
                  <div className="card-image">
                    <EventImage banner={banner} />
                    {banner.length < 1 ? displayUploadBtn : displayDeleteImgBtn}
                  </div>
                  <div className="card-content">
                    <span className="card-title blue-text text-darken-2">
                      <strong style={{ fontWeight: "400" }}>{title}</strong>
                    </span>
                    <p>
                      Golf Club: <strong>{club.name}</strong>
                    </p>
                    <p>
                      Event Type: <strong>{eventType.name}</strong>
                    </p>
                    <p>
                      Event Category: <strong>{eventCategory.name}</strong>
                    </p>
                    <p>
                      Date:{" "}
                      <strong>
                        {!oneDayOnly
                          ? moment(from, "MM-DD-YYYY").format("DD MMMM, YYYY") +
                            " to " +
                            moment(to, "MM-DD-YYYY").format("DD MMMM, YYYY")
                          : moment(dateOfEvent, "MM-DD-YYYY").format(
                              "DD MMMM, YYYY"
                            )}
                      </strong>
                    </p>
                    {oneDayOnly && !isWholeDay ? (
                      <p>
                        Time: <strong>{timeFrom + " to " + timeTo}</strong>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="card-action">
                    <a href="#!" className="blue-text text-darken-2 disabled">
                      Registration (SOON)
                    </a>
                  </div>
                </div>
              </div>
              <div className="col s12 m9">
                <div className="card-panel">
                  <div dangerouslySetInnerHTML={createMarkUp()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Event.propType = {
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  uploadBannerEvent: PropTypes.func.isRequired,
  changeStatusEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { getEvent, uploadBannerEvent, changeStatusEvent }
)(Event);
