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

  render() {
    const { courses } = this.state;
    return (
      <ul className="collection course-collection">
        {courses
          ? courses.map((course, idx) => (
              <EditCourseInput key={idx} course={course} />
            ))
          : "No Course Record"}
      </ul>
    );
  }
}

export default EditCourse;
