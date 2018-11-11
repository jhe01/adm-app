import React, { Component } from "react";
import Sidenav from "../../template/Aside";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import { Row, Input, Col } from "react-materialize";

import Header from "../../template/Header";
import { addEvent } from "../../../actions/eventActions";
import moment from "moment";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dateOfEvent: "",
      from: "",
      to: "",
      timeFrom: "",
      timeTo: "",
      oneDayOnly: false,
      isWholeDay: true,
      golfClub: "",
      eventType: "",
      eventCategory: "",
      numberOfPlayers: 0,
      details: "",
      isPublic: true,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (!this.props.clubs.length > 0) {
      this.props.history.push("/events");
    }

    this.setState({
      golfClub:
        this.props.auth.user.role_id.name === "Global Admin"
          ? ""
          : this.props.auth.user.club_id._id
    });
  }

  onChange = e => {
    if (e.target.name === "isWholeDay") {
      this.setState({ isWholeDay: !this.state.isWholeDay });
    } else if (e.target.name === "isPublic") {
      this.setState({ isPublic: !this.state.isPublic });
    } else if (e.target.name === "oneDayOnly") {
      this.setState({ oneDayOnly: !this.state.oneDayOnly });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    if (this.state.oneDayOnly) {
      this.setState({ from: "", to: "" });
    } else {
      this.setState({
        isWholeDay: false,
        dateOfEvent: "",
        timeFrom: "",
        timeTo: ""
      });
    }
  };

  quillOnChange = (content, delta, source, editor) => {
    this.setState({ details: content });
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

    // if (title === "") {
    //   this.setState({ errors: { title: "Title is Required" } });
    //   return;
    // }
    // if (isWholeDay && dateOfEvent === "") {
    //   this.setState({ errors: { dateOfEvent: "Date of Event is Required" } });
    //   return;
    // }
    // if (!isWholeDay && from === "" && to === "") {
    //   this.setState({
    //     errors: { from: "From date is Required", to: "To date is Required" }
    //   });
    //   return;
    // }
    // if (eventType === "") {
    //   this.setState({ errors: { eventType: "Event Type is Required" } });
    //   return;
    // }
    // if (eventCategory === "") {
    //   this.setState({
    //     errors: { eventCategory: "Event Category is Required" }
    //   });
    //   return;
    // }

    const newEvent = {
      title,
      oneDayOnly,
      dateOfEvent: dateOfEvent
        ? moment(dateOfEvent, "DD MMMM, YYYY").toISOString()
        : "",
      from: from ? moment(from, "DD MMMM, YYYY").toISOString() : "",
      to: to ? moment(to, "DD MMMM, YYYY").toISOString() : "",
      timeFrom,
      timeTo,
      isWholeDay,
      golfClub,
      eventType,
      eventCategory,
      numberOfPlayers,
      details,
      isPublic
    };
    this.props.addEvent(newEvent, this.props.history);

    // this.setState({
    //   title: "",
    //   dateOfEvent: "",
    //   from: "",
    //   to: "",
    //   timeFrom: "",
    //   timeTo: "",
    //   isWholeDay: false,
    //   golfClub: "",
    //   eventType: "",
    //   eventCategory: "",
    //   numberOfPlayers: 0,
    //   details: "",
    //   isPublic: true,
    //   errors: {}
    // });

    //this.props.history.push("/events");
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
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
    "link"
  ];

  render() {
    const { isWholeDay, errors, oneDayOnly, timeFrom, timeTo } = this.state;
    const { clubs, eventTypes, eventCategories, auth } = this.props;
    console.log(auth);
    return (
      <React.Fragment>
        <Header branding="Events - Add" />
        <Sidenav active="add-event" />
        <form onSubmit={this.onSubmit} style={{ marginTop: "10px" }}>
          <Row>
            <Col s={12} m={6}>
              <Row>
                <input type="submit" value="Save" className="btn" />
              </Row>
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
                  name="title"
                  id="title"
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
                  id="golfClub"
                  name="golfClub"
                  type="select"
                  onChange={this.onChange}
                  error={errors.golfClub ? errors.golfClub : ""}
                  validate={true}
                  value={
                    auth.user.role_id.name !== "Global Admin"
                      ? auth.user.club_id._id
                      : ""
                  }
                  disabled={
                    auth.user.role_id.name !== "Global Admin" ? "disabled" : ""
                  }
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
                {/* <Input
                  type="checkbox"
                  name="oneDayOnly"
                  s={12}
                  m={3}
                  label="One day only?"
                  className="chkOneDayOnly"
                  id="chkOneDayOnly"
                  onChange={this.onChange}
                  validate={true}
                /> */}
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
                {/* <Input
                  type="checkbox"
                  name="isWholeDay"
                  s={12}
                  m={3}
                  label="Whole Day?"
                  className="chkIsWholeDay"
                  id="chkIsWholeDay"
                  onChange={this.onChange}
                  validate={true}
                  checked={isWholeDay ? true : false}
                  value={isWholeDay ? true : false}
                /> */}
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
                  className="datepicker"
                  onChange={this.onChange}
                  error={errors.dateOfEvent ? errors.dateOfEvent : ""}
                  validate={true}
                  value={oneDayOnly ? this.state.dateOfEvent : ""}
                />
                <Input
                  name="timeFrom"
                  s={12}
                  m={3}
                  type="date"
                  label="Time From"
                  labelClassName={!isWholeDay ? "" : "hide"}
                  className={!isWholeDay ? "datepicker" : "datepicker hide"}
                  onChange={this.onChange}
                  error={errors.timeFrom ? errors.timeFrom : ""}
                  validate={true}
                  value={isWholeDay ? timeFrom : ""}
                />
                <Input
                  name="timeTo"
                  s={12}
                  m={3}
                  type="date"
                  label="Time To"
                  labelClassName={!isWholeDay ? "" : "hide"}
                  className={!isWholeDay ? "datepicker" : "datepicker hide"}
                  onChange={this.onChange}
                  error={errors.timeTo ? errors.timeTo : ""}
                  validate={true}
                  value={isWholeDay ? timeTo : ""}
                />
              </Row>
              <Row className={oneDayOnly ? "hide" : ""}>
                <Input
                  name="from"
                  s={12}
                  m={6}
                  type="date"
                  label="From"
                  className="datepicker"
                  onChange={this.onChange}
                  error={errors.from ? errors.from : ""}
                  validate={true}
                  value={oneDayOnly ? "" : this.state.from}
                />
                <Input
                  name="to"
                  s={12}
                  m={6}
                  type="date"
                  label="To"
                  onChange={this.onChange}
                  error={errors.to ? errors.to : ""}
                  validate={true}
                  value={oneDayOnly ? "" : this.state.to}
                />
              </Row>
              <Row>
                <Input
                  name="eventType"
                  s={12}
                  m={4}
                  type="select"
                  label="Event Type"
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
                  name="numberOfPlayers"
                  s={12}
                  m={4}
                  type="text"
                  label="Number of Players"
                  onChange={this.onChange}
                  validate={true}
                />
              </Row>
            </Col>
            <Col s={12} m={6}>
              <Row>
                {/**/}
                {/* <Input
                  type="textarea"
                  s={12}
                  id="details"
                  label="Details"
                  name="details"
                  onChange={this.onChange}
                  error={errors.details ? errors.details : ""}
                  style={{ minHeight: "150px" }}
                  validate={true}
                /> */}
                <h6>Details</h6>
                <ReactQuill
                  modules={this.modules}
                  format={this.format}
                  onChange={this.quillOnChange}
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

AddEvent.propTypes = {
  clubs: PropTypes.array.isRequired,
  eventTypes: PropTypes.array.isRequired,
  eventCategories: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clubs: state.club.clubs,
  eventTypes: state.eventType.eventTypes,
  eventCategories: state.eventCategory.eventCategory,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEvent }
)(AddEvent);
