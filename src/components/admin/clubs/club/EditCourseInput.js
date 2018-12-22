import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  deleteClubCourse,
  updateClubCourse
} from "../../../../actions/clubActions";

class EditCourseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course,
      name: this.props.course.name,
      isEdit: false,
      clubId: this.props.clubId
    };
    this.swAlert = withReactContent(Swal);
  }
  handleOnCourseNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleOnClickDeleteCourse = () => {
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
          courseToBeDeleted.courseid = this.state.course._id;
          courseToBeDeleted.clubid = this.state.clubId;
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

  handleOnClickUpdateCourse = () => {
    const { course, clubId } = this.state;
    this.swAlert
      .fire({
        title: <span style={{ fontSize: "1.3rem" }}>Course Name</span>,
        input: "text",
        inputValue: course.name,
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        inputValidator: value => {
          return !value && "Invalid Course Name";
        },
        preConfirm: val => {
          const updateCourse = {};
          updateCourse.courseid = course._id;
          updateCourse.name = val;
          updateCourse.clubid = clubId;

          this.props.updateClubCourse(updateCourse);
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

  render() {
    const { course } = this.props;
    const courseInput = (
      <div className="input-field col s12">
        <input
          placeholder="Course Name ..."
          name="name"
          type="text"
          onChange={this.handleOnCourseNameChange}
          value={course.name}
        />
      </div>
    );
    return (
      <li className="collection-item">
        <div>
          {course.name}
          <button
            href="#!"
            className="btn-flat secondary-content red-text text-darken-2"
            onClick={this.handleOnClickDeleteCourse}
          >
            <i className="material-icons">delete</i>
          </button>
          <button
            href="#!"
            className="btn-flat secondary-content blue-text text-darken-2"
            onClick={this.handleOnClickUpdateCourse}
          >
            <i className="material-icons">edit</i>
          </button>
        </div>
      </li>
    );
  }
}

EditCourseInput.propTypes = {
  deleteClubCourse: PropTypes.func.isRequired,
  updateClubCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteClubCourse, updateClubCourse }
)(EditCourseInput);
