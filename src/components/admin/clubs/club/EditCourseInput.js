import React, { Component } from "react";

class EditCourseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course,
      name: this.props.course.name,
      isEdit: false
    };
  }
  handleOnCourseNameChange = e => {
    this.setState({ name: e.target.value });
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
          >
            <i class="material-icons">delete</i>
          </button>
          <button
            href="#!"
            className="btn-flat secondary-content blue-text text-darken-2"
          >
            <i class="material-icons">edit</i>
          </button>
        </div>
      </li>
    );
  }
}

export default EditCourseInput;
