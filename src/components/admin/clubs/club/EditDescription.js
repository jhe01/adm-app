import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import { updateGolfClub } from "../../../../actions/clubActions";

class EditDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.club.description,
      club: this.props.club,
      clubid: this.props.club._id,
      handleAfterSave: this.props.afterSave
    };
  }
  quillOnChange = (content, delta, source, editor) => {
    this.setState({ description: content === "<p><br></p>" ? "" : content });
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

  handleClickSaveDescription = () => {
    const { clubid, description, handleAfterSave } = this.state;
    const data = { description, _id: clubid };
    this.props.updateGolfClub(data);
    handleAfterSave();
  };

  render() {
    const { description } = this.state;
    return (
      <React.Fragment>
        <button
          className="btn btn-small btn-action blue darken-4"
          style={{ marginBottom: "5px" }}
          onClick={this.handleClickSaveDescription}
        >
          SAVE
        </button>
        <ReactQuill
          modules={this.modules}
          format={this.format}
          onChange={this.quillOnChange}
          value={description}
        />
      </React.Fragment>
    );
  }
}

EditDescription.propTypes = {
  updateGolfClub: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateGolfClub }
)(EditDescription);
