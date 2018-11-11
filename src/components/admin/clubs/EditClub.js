import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "../../template/Header";
import Sidenav from "../../template/Aside";
import { Row, Input, Col, Icon } from "react-materialize";
import {
  updateGolfClub,
  getClub,
  deleteClubCourse,
  updateClubCourse,
  addClubCourse
} from "../../../actions/clubActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class EditClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      courses: [],
      errors: {}
    };
    console.log(this.props);
    this.swAlert = withReactContent(Swal);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // console.log(nextProps.club);
    const { name, description, courses } = nextProps.club;
    this.setState({
      name,
      description: description ? description : "",
      courses: courses
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getClub(id);
  }
  onSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Club name is Required" } });
      return;
    }
    const updateClub = {
      _id: this.props.match.params.id,
      name,
      description
    };

    this.props.updateGolfClub(updateClub);

    this.setState({
      name: "",
      description: "",
      courses: [],
      errors: {}
    });

    this.swAlert.fire({
      title: "Success",
      type: "success",
      showConfirmButton: false,
      timer: 1300
    });
  };
  onChange = e => {
    if (e.target.name === "name") {
      this.setState({ errors: { name: "" } });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  onDeleteCourse = courseid => {
    this.swAlert
      .fire({
        title: (
          <div>
            <h5>Are you sure?</h5>
            <p style={{ fontSize: "1.3rem" }}>
              Golf Course will be deleted permanently!
            </p>
          </div>
        ),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonClass: "blue darken-2",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const courseToBeDeleted = {};
          courseToBeDeleted.courseid = courseid;
          courseToBeDeleted.clubid = this.props.club._id;
          this.props.deleteClubCourse(courseToBeDeleted);
        },
        allowOutsideClick: () => !this.swAlert.isLoading()
      })
      .then(result => {
        if (result.value) {
          this.swAlert.fire({
            title: "Success",
            type: "success",
            showConfirmButton: false,
            timer: 1300
          });
        }
      });
  };

  onUpdateCourse = courseid => {
    const course = this.props.club.courses.filter(course => {
      return course._id === courseid;
    });
    const name = course[0].name;
    this.swAlert
      .fire({
        title: <span style={{ fontSize: "1.3rem" }}>Course Name</span>,
        input: "text",
        inputValue: name,
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        inputValidator: value => {
          return !value && "Invalid Course Name";
        },
        preConfirm: val => {
          const course = {};
          course.courseid = courseid;
          course.name = val;
          course.clubid = this.props.club._id;
          this.props.updateClubCourse(course);
        },
        allowOutsideClick: () => !this.swAlert.isLoading()
      })
      .then(result => {
        if (result.value) {
          this.swAlert.fire({
            title: "Success",
            type: "success",
            showConfirmButton: false,
            timer: 1300
            // onClose: () => {
            //   this.props.history.push("/clubs");
            // }
          });
        }
      });
  };

  onClickAddCourse = () => {
    this.swAlert
      .fire({
        title: <span style={{ fontSize: "1.3rem" }}>Enter Course Name</span>,
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        inputValidator: value => {
          return !value && "Invalid Course Name";
        },
        preConfirm: val => {
          const course = {};
          course.name = val;
          course.clubid = this.props.club._id;
          this.props.addClubCourse(course);
        },
        allowOutsideClick: () => !this.swAlert.isLoading()
      })
      .then(result => {
        if (result.value) {
          this.swAlert.fire({
            title: "Success",
            type: "success",
            showConfirmButton: false,
            timer: 1300
          });
        }
      });
  };

  render() {
    const { name, description, courses, errors } = this.state;
    return (
      <React.Fragment>
        <Header branding={`Golf Clubs - Edit "${name}"`} />
        <Sidenav active="edit-club" />
        <form onSubmit={this.onSubmit} className="row">
          <div className="col s6">
            <Row>
              <Col s={12}>
                <Row>
                  <Input
                    s={12}
                    m={12}
                    label="Name"
                    type="text"
                    name="name"
                    id="name"
                    labelClassName={name ? "active" : ""}
                    value={name}
                    error={errors.name ? errors.name : ""}
                    onChange={this.onChange}
                    validate={true}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <Row>
                  <Input
                    s={12}
                    m={12}
                    label="Description"
                    type="textarea"
                    name="description"
                    id="description"
                    labelClassName={description ? "active" : ""}
                    value={description}
                    onChange={this.onChange}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <input type="submit" value="Save" className="btn btn-sm" />
            </Row>
          </div>
          <div className="col s6">
            <h4 style={{ fontSize: "1.3rem" }}>
              Courses{" "}
              <a
                href="#!"
                className="btn btn-sm action-btn"
                onClick={this.onClickAddCourse}
              >
                <Icon>add</Icon>
              </a>
            </h4>
            <table>
              <tbody>
                {courses.map(course => {
                  return (
                    <tr key={course._id}>
                      <td>{course.name}</td>
                      <td>
                        <a
                          href="#!"
                          onClick={() => this.onDeleteCourse(course._id)}
                          className="btn btn-sm red darken-2 action-btn"
                        >
                          <Icon>delete</Icon>
                        </a>
                        <a
                          href="#!"
                          onClick={() => this.onUpdateCourse(course._id)}
                          className="btn btn-sm blue darken-2 action-btn"
                        >
                          <Icon>edit</Icon>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

EditClub.propTypes = {
  updateGolfClub: PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  deleteClubCourse: PropTypes.func.isRequired,
  updateClubCourse: PropTypes.func.isRequired,
  addClubCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club
});

export default connect(
  mapStateToProps,
  { getClub, updateGolfClub, deleteClubCourse, updateClubCourse, addClubCourse }
)(EditClub);
