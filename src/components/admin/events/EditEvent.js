import React, { Component } from "react";
import Sidenav from "../../template/Aside";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Row, Input, Col } from "react-materialize";

import { getEvent, updateEvent } from "../../../actions/eventActions";

import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Header from "../../template/Header";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSet: false,
      title: "",
      dateOfEvent: "",
      from: "",
      to: "",
      timeFrom: "",
      timeTo: "",
      isWholeDay: true,
      golfClub: "",
      eventType: "",
      eventCategory: "",
      numberOfPlayers: 0,
      details: "",
      isPublic: true,
      oneDayOnly: false,
      errors: {}
    };

    this.swAlert = withReactContent(Swal);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {
      title,
      dateOfEvent,
      from,
      to,
      timeFrom,
      timeTo,
      isWholeDay,
      club,
      eventType,
      eventCategory,
      numberOfPlayers,
      details,
      isPublic,
      oneDayOnly
    } = nextProps.event;

    if (!this.state.initialSet) {
      this.setState({
        title,
        dateOfEvent: dateOfEvent
          ? moment(dateOfEvent, "MM-DD-YYYY").format("DD MMMM, YYYY")
          : "",
        from: from ? moment(from, "MM-DD-YYYY").format("DD MMMM, YYYY") : "",
        to: to ? moment(to, "MM-DD-YYYY").format("DD MMMM, YYYY") : "",
        timeFrom: timeFrom ? timeFrom : "",
        timeTo: timeTo ? timeTo : "",
        isWholeDay: isWholeDay ? isWholeDay : true,
        golfClub: club ? club._id : "",
        eventType: eventType ? eventType._id : "",
        eventCategory: eventCategory ? eventCategory._id : "",
        numberOfPlayers,
        details,
        isPublic,
        oneDayOnly,
        initialSet: true
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
    if (!this.props.clubs.length > 0) {
      this.props.history.push("/events");
    }
  }

  onChange = e => {
    if (e.target.name === "isWholeDay") {
      this.setState({ isWholeDay: JSON.parse(e.target.value) });
    } else if (e.target.name === "isPublic") {
      this.setState({ isPublic: !this.state.isPublic });
    } else if (e.target.name === "oneDayOnly") {
      this.setState({ oneDayOnly: JSON.parse(e.target.value) });
      if (this.state.oneDayOnly) {
        this.setState({ to: "", from: "" });
      } else {
        this.setState({ dateOfEvent: "", timeFrom: "", timeTo: "" });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      title,
      oneDayOnly,
      dateOfEvent,
      from,
      to,
      timeFrom,
      timeTo,
      isWholeDay,
      golfClub,
      eventType,
      eventCategory,
      numberOfPlayers,
      details,
      isPublic
    } = this.state;

    const updEvent = {
      _id: this.props.event._id,
      title,
      dateOfEvent: dateOfEvent
        ? moment(dateOfEvent, "DD MMMM, YYYY").format("MM-DD-YYYY")
        : "",
      from: from ? moment(from, "DD MMMM, YYYY").format("MM-DD-YYYY") : "",
      to: to ? moment(to, "DD MMMM, YYYY").format("MM-DD-YYYY") : "",
      timeFrom,
      timeTo,
      isWholeDay,
      golfClub,
      eventType,
      oneDayOnly,
      eventCategory,
      numberOfPlayers,
      details,
      isPublic
    };

    this.props.updateEvent(updEvent, this.props.history);
  };

  quillOnChange = (content, delta, source, editor) => {
    this.setState({ details: content === "<p><br></p>" ? "" : content });
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: ["center", "left", "right"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align"
  ];

  render() {
    const {
      title,
      golfClub,
      dateOfEvent,
      isWholeDay,
      eventType,
      eventCategory,
      numberOfPlayers,
      details,
      timeFrom,
      timeTo,
      from,
      to,
      errors,
      oneDayOnly
    } = this.state;
    const { clubs, eventTypes, eventCategories } = this.props;
    return (
      <React.Fragment>
        <Header branding={`Events - Edit "${title}"`} />
        <Sidenav active="add-event" />
        <form onSubmit={this.onSubmit} style={{ marginTop: "10px" }}>
          <Row>
            <input type="submit" value="SAVE" className="btn" />
          </Row>
          <Row>
            <Col s={12} m={6}>
              <Row>
                <Input
                  type="checkbox"
                  name="isPublic"
                  s={12}
                  m={3}
                  label="Private?"
                  className="isPublic"
                  id="isPublic"
                  onChange={this.onChange}
                  validate={true}
                />
              </Row>
              <Row>
                <Input
                  s={12}
                  m={12}
                  label="Title"
                  labelClassName={title ? "active" : ""}
                  name="title"
                  id="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title ? errors.title : ""}
                  validate={true}
                />
              </Row>
              <Row>
                <Input
                  s={12}
                  m={9}
                  label="Golf Club"
                  labelClassName={golfClub ? "active" : ""}
                  id="golfClub"
                  name="golfClub"
                  type="select"
                  value={golfClub}
                  onChange={this.onChange}
                  error={errors.golfClub ? errors.golfClub : ""}
                  validate={true}
                >
                  <option value="">- SELECT -</option>
                  {clubs.map(club => {
                    return (
                      <option key={club._id} value={club._id}>
                        {club.name}
                      </option>
                    );
                  })}
                </Input>
                <Input
                  type="select"
                  label="One day only?"
                  name="oneDayOnly"
                  m={3}
                  s={12}
                  className="chkOneDayOnly"
                  onChange={this.onChange}
                  id="chkOneDayOnly"
                  value={oneDayOnly}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Input>
              </Row>
              <Row
                className={
                  oneDayOnly ? "row-date-range" : "row-date-range hide"
                }
              >
                <Input
                  type="select"
                  label="Whole day?"
                  name="isWholeDay"
                  m={3}
                  s={12}
                  className="chkIsWholeDay"
                  onChange={this.onChange}
                  id="chkIsWholeDay"
                  value={isWholeDay}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Input>
                <Input
                  name="dateOfEvent"
                  s={12}
                  m={3}
                  type="date"
                  label="Date"
                  labelClassName={dateOfEvent ? "active" : ""}
                  className="datepicker"
                  onChange={this.onChange}
                  error={errors.dateOfEvent ? errors.dateOfEvent : ""}
                  value={dateOfEvent ? dateOfEvent : ""}
                  validate={true}
                />
                <Input
                  name="timeFrom"
                  s={12}
                  m={3}
                  type="time"
                  label="Time From"
                  labelClassName={!isWholeDay ? "" : "hide"}
                  className={!isWholeDay ? "timepipcker" : "timepicker hide"}
                  onChange={this.onChange}
                  value={timeFrom}
                  error={errors.timeFrom ? errors.timeFrom : ""}
                  validate={true}
                />
                <Input
                  name="timeTo"
                  s={12}
                  m={3}
                  type="time"
                  label="Time To"
                  labelClassName={!isWholeDay ? "" : "hide"}
                  className={!isWholeDay ? "timepicker" : "timepicker hide"}
                  onChange={this.onChange}
                  value={timeTo}
                  error={errors.timeTo ? errors.timeTo : ""}
                  validate={true}
                />
              </Row>
              <Row className={oneDayOnly ? "hide" : ""}>
                <Input
                  name="from"
                  s={12}
                  m={6}
                  type="date"
                  label="From"
                  labelClassName={from ? "active" : ""}
                  className="datepicker"
                  onChange={this.onChange}
                  value={from ? from : ""}
                  error={errors.from ? errors.from : ""}
                  validate={true}
                />
                <Input
                  name="to"
                  s={12}
                  m={6}
                  type="date"
                  label="To"
                  labelClassName={to ? "active" : ""}
                  onChange={this.onChange}
                  value={to ? to : ""}
                  error={errors.to ? errors.to : ""}
                  validate={true}
                />
              </Row>
              <Row>
                <Input
                  name="eventType"
                  s={12}
                  m={4}
                  type="select"
                  label="Event Type"
                  value={eventType}
                  onChange={this.onChange}
                  error={errors.eventType ? errors.eventType : ""}
                  validate={true}
                >
                  <option value="">- SELECT -</option>
                  {eventTypes.map(type => {
                    return (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    );
                  })}
                </Input>
                <Input
                  name="eventCategory"
                  s={12}
                  m={4}
                  type="select"
                  value={eventCategory}
                  label="Event Category"
                  onChange={this.onChange}
                  error={errors.eventCategory ? errors.eventCategory : ""}
                  validate={true}
                >
                  <option value="">- SELECT -</option>
                  {eventCategories.map(category => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Input>
                <Input
                  s={12}
                  m={4}
                  label="Number of Players"
                  labelClassName={numberOfPlayers >= 0 ? "active" : ""}
                  name="numberOfPlayers"
                  id="numberOfPlayers"
                  value={numberOfPlayers}
                  onChange={this.onChange}
                  error={errors.numberOfPlayers ? errors.numberOfPlayers : ""}
                  validate={true}
                />
              </Row>
            </Col>
            <Col s={12} m={6}>
              <Row />
              <Row>
                <h6>Details</h6>
                <ReactQuill
                  modules={this.modules}
                  format={this.format}
                  onChange={this.quillOnChange}
                  value={details}
                />
              </Row>
            </Col>
          </Row>
          <Row />
        </form>
      </React.Fragment>
    );
  }
}

EditEvent.propTypes = {
  clubs: PropTypes.array.isRequired,
  eventTypes: PropTypes.array.isRequired,
  eventCategories: PropTypes.array.isRequired,
  getEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clubs: state.club.clubs,
  eventTypes: state.eventType.eventTypes,
  eventCategories: state.eventCategory.eventCategory,
  event: state.event.event,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEvent, updateEvent }
)(EditEvent);
