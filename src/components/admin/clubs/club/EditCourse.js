import React, { Component } from "react";

import EditCourseInput from "./EditCourseInput";

class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: this.props.courses,
      club: this.props.club
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.courses !== prevProps.courses) {
      this.setState({ courses: this.props.courses });
    }
  }

  render() {
    const { courses, club } = this.state;
    return (
      <ul className="collection mc-collection">
        {courses
          ? courses.map((course, idx) => (
              <EditCourseInput key={idx} course={course} clubId={club._id} />
            ))
          : "No Course Record"}
      </ul>
    );
  }
}

export default EditCourse;
