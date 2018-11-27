import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import { getEvent, uploadBannerEvent } from "../../../actions/eventActions";

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
      id: ""
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
        _id
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
        isWholeDay
      });
    }
  }
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

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
      numberOfPlayers,
      banner,
      details,
      oneDayOnly,
      id,
      timeFrom,
      timeTo,
      isWholeDay
    } = this.state;
    console.log(this.state);
    const createMarkUp = () => {
      return { __html: details };
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

            <Button waves="light" className="red darken-2 action-btn">
              Disable<Icon left>clear</Icon>
            </Button>
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
                        {!isWholeDay
                          ? moment(from, "MM-DD-YYYY").format("DD MMMM, YYYY") +
                            " to " +
                            moment(to, "MM-DD-YYYY").format("DD MMMM, YYYY")
                          : moment(dateOfEvent, "MM-DD-YYYY").format(
                              "DD MMMM, YYYY"
                            )}
                      </strong>
                    </p>
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
  uploadBannerEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { getEvent, uploadBannerEvent }
)(Event);
