import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  getRecentEventAlbum,
  getClub,
  uploadClubImage,
  uploadClubFacilityFairwayImage,
  deleteClubFacilityFairwayImage,
  addClubAlbum,
  addClubPolicy,
  addClubService,
  addClubFacility
} from "../../../actions/clubActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";

import Header from "../../template/Header";
import Sidenav from "../../template/Aside";
import ImageButton from "../util/ImageButton";

import ClubFacilityImages from "./ClubFacilityImages";
import ClubFairwaysImages from "./ClubFairwaysImages";
import ClubPolicyList from "./policy/ClubPolicyList";
import ClubServicesList from "./services/ClubServicesList";
import ClubFacilityList from "./facility/ClubFacilityList";
import ClubGallery from "./ClubGallery";
import ClubImage from "../util/ClubImage";

import {
  Button,
  Icon,
  Row,
  Col,
  Collection,
  CollectionItem
} from "react-materialize";

class Club extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club: {},
      filesToUpload: [],
      PRFName: ""
    };

    this.swAlert = withReactContent(Swal);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getClub(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.club !== this.props.club) {
      this.setState({ ...this.state.club, club: this.props.club });
    }
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
          const clb = {};
          clb.id = this.state.club._id;
          clb.file = result.value;
          this.props.uploadClubImage(clb);
        }
      });
  };

  onFileInputChange = e => {
    this.setState({ filesToUpload: e.target.files });
  };

  onInputChange = e => {
    this.setState({ PRFName: e.target.value });
  };

  onClickUploadFacilityFairwayImages = type => {
    this.swAlert
      .fire({
        title: "Select Image",
        html: (
          <input
            type="file"
            className="swal2-file"
            accept="image/*"
            onChange={this.onFileInputChange}
            multiple
          />
        )
      })
      .then(result => {
        if (result.value) {
          const clb = {};
          if (this.state.filesToUpload) {
            clb.id = this.state.club._id;
            clb.imageType = type;
            clb.files = this.state.filesToUpload;
            this.props.uploadClubFacilityFairwayImage(clb);
          }
        }
      });
  };

  onClickDeleteFacilityFairwayImage = (image, type) => {
    this.swAlert
      .fire({
        title: (
          <div>
            <h5>Are you sure?</h5>
            <p>Image will be deleted permanently!</p>
          </div>
        ),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonClass: "blue darken-2"
      })
      .then(result => {
        if (result.value) {
          let img = {};
          img._id = image.upid;
          img.clubid = this.state.club._id;
          img.imageType = type;

          this.props.deleteClubFacilityFairwayImage(img);
        }
      });
  };

  onClickAddPolicy = type => {
    this.swAlert
      .fire({
        title: `Add ${type.toUpperCase()}`,
        input: "text",
        inputPlaceholder: `${type.toUpperCase()} Name ...`,
        inputValidator: value => {
          return !value && "Name is Required!";
        }
      })
      .then(result => {
        if (result.value) {
          let prf = {};
          prf.clubid = this.state.club._id;
          prf.name = result.value;
          prf.type = type;

          this.props.addClubPolicy(prf);
        }
      });
  };

  onClickAddService = type => {
    this.swAlert
      .fire({
        title: `Add ${type.toUpperCase()}`,
        input: "text",
        inputPlaceholder: `${type.toUpperCase()} Name ...`,
        inputValidator: value => {
          return !value && "Name is Required!";
        }
      })
      .then(result => {
        if (result.value) {
          let prf = {};
          prf.clubid = this.state.club._id;
          prf.name = result.value;
          prf.type = type;

          this.props.addClubService(prf);
        }
      });
  };

  onClickAddFacility = type => {
    this.swAlert
      .fire({
        title: `Add ${type.toUpperCase()}`,
        input: "text",
        inputPlaceholder: `${type.toUpperCase()} Name ...`,
        inputValidator: value => {
          return !value && "Name is Required!";
        }
      })
      .then(result => {
        if (result.value) {
          let prf = {};
          prf.clubid = this.state.club._id;
          prf.name = result.value;
          prf.type = type;

          this.props.addClubFacility(prf);
        }
      });
  };

  onClickAddAlbum = () => {
    this.swAlert
      .fire({
        title: "Add Album",
        input: "text",
        inputPlaceholder: "Album Name ...",
        inputValidator: value => {
          return !value && "Album Name is Required!";
        }
      })
      .then(result => {
        if (result.value) {
          let album = {};
          album.clubid = this.state.club._id;
          album.name = result.value;

          this.props.addClubAlbum(album);
        }
      });
  };

  render() {
    const {
      name,
      facility_images,
      fairway_images,
      recent_event_albums,
      courses,
      facilities,
      services,
      policies,
      logo
    } = this.state.club;
    return (
      <React.Fragment>
        <Header branding={`Club`} />
        <Sidenav active="club-list" />
        <Row className="club-container">
          <Col s={12} m={3}>
            <div className="card">
              <div className="card-image">
                {logo ? <ClubImage img={logo} /> : ""}

                <button
                  className="btn-floating halfway-fab waves-effect waves-light blue darken-2"
                  onClick={() => {
                    this.onClickUploadImage();
                  }}
                >
                  <i className="material-icons">photo_camera</i>
                </button>
              </div>
              <div className="card-content">
                <span className="card-title">{name}</span>
              </div>
            </div>
            <Collection header="Other Info">
              <CollectionItem>
                <strong>Course:</strong>{" "}
                {courses
                  ? courses.map((course, idx) => {
                      return <p key={idx}>{course.name}</p>;
                    })
                  : ""}
              </CollectionItem>
              <CollectionItem>
                <strong>Address:</strong>{" "}
                <p>Sample Address na mahaba, Maiksi City</p>
              </CollectionItem>
              <CollectionItem>
                <strong>Maintenance Day:</strong> <p>Monday</p>
              </CollectionItem>
            </Collection>
          </Col>
          <Col s={12} m={9}>
            <h5 className="blue-text darken-4">About</h5>
            <div className="card">
              <div className="card-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda modi vero voluptates eveniet corporis fugit quas.
                  Minus dolore possimus soluta laborum magnam sequi. Commodi
                  iure repellat dicta earum vel voluptatum, modi illo temporibus
                  repellendus, rerum fugit amet ea quod ratione suscipit ipsum!
                  Aliquam aut suscipit id commodi vitae ipsam itaque! Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Laborum
                  accusamus repellat obcaecati iure fugiat nulla sed corporis
                  quae dolor voluptatum. Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Nihil quo rerum nesciunt aliquid facilis,
                  debitis aperiam sint quas qui exercitationem voluptates
                  pariatur, reprehenderit magnam porro maiores in quod
                  veritatis, provident beatae ex cumque suscipit. Numquam unde
                  veniam saepe, facere perferendis maxime. Ullam dolor, cumque
                  consequuntur temporibus fugit corporis perspiciatis atque
                  optio omnis dolores odit dolorum quos, ipsum aperiam, qui non?
                  Doloribus, totam recusandae. Fuga alias quidem deserunt
                  ratione eos perferendis architecto quos a dicta impedit omnis
                  dignissimos quam aut rerum quae reiciendis ipsum aperiam eius
                  ullam, molestias hic maiores minus officiis. At magni nobis
                  cupiditate suscipit velit ea cum accusantium?
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title blue-text darken-4">
                      Policies{" "}
                      <button
                        className="btn action-btn blue darken-4"
                        onClick={() => {
                          this.onClickAddPolicy("policy");
                        }}
                      >
                        <i className="material-icons">add</i>
                      </button>
                    </span>
                    {policies ? (
                      <ClubPolicyList policies={policies} />
                    ) : (
                      <p>No Policy Record yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title blue-text darken-4">
                      Rentals/Services{" "}
                      <button
                        className="btn action-btn blue darken-4"
                        onClick={() => {
                          this.onClickAddService("service");
                        }}
                      >
                        <i className="material-icons">add</i>
                      </button>
                    </span>
                    {services ? (
                      <ClubServicesList services={services} />
                    ) : (
                      <p>No Service Record yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title blue-text darken-4">
                      Facilities{" "}
                      <button
                        className="btn action-btn blue darken-4"
                        onClick={() => {
                          this.onClickAddFacility("facility");
                        }}
                      >
                        <i className="material-icons">add</i>
                      </button>
                    </span>
                    {facilities ? (
                      <ClubFacilityList facilities={facilities} />
                    ) : (
                      <p>No Service Record yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h5 className="blue-text darken-4">Gallery</h5>
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">
                  Recent Events{" "}
                  <button
                    className="btn action-btn blue darken-4"
                    onClick={this.onClickAddAlbum}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </span>

                {recent_event_albums ? (
                  <ClubGallery albums={recent_event_albums} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">
                  Facility{" "}
                  <button
                    className="btn action-btn blue darken-4"
                    onClick={() => {
                      this.onClickUploadFacilityFairwayImages("facility");
                    }}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </span>

                <div className="row">
                  <div className="col s12 cards-container">
                    {facility_images ? (
                      <ClubFacilityImages
                        facilities={facility_images}
                        onClickDeleteImage={
                          this.onClickDeleteFacilityFairwayImage
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">
                  Fairways{" "}
                  <button
                    className="btn action-btn blue darken-4"
                    onClick={() => {
                      this.onClickUploadFacilityFairwayImages("fairway");
                    }}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </span>
                <div className="row">
                  <div className="col s12 cards-container">
                    {fairway_images ? (
                      <ClubFairwaysImages
                        fairways={fairway_images}
                        onClickDeleteImage={
                          this.onClickDeleteFacilityFairwayImage
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Club.propTypes = {
  getRecentEventAlbum: PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  uploadClubImage: PropTypes.func.isRequired,
  uploadClubFacilityFairwayImage: PropTypes.func.isRequired,
  deleteClubFacilityFairwayImage: PropTypes.func.isRequired,
  addClubAlbum: PropTypes.func.isRequired,
  addClubPolicy: PropTypes.func.isRequired,
  addClubService: PropTypes.func.isRequired,
  addClubFacility: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club
});

export default connect(
  mapStateToProps,
  {
    getRecentEventAlbum,
    getClub,
    uploadClubImage,
    uploadClubFacilityFairwayImage,
    deleteClubFacilityFairwayImage,
    addClubAlbum,
    addClubPolicy,
    addClubService,
    addClubFacility
  }
)(Club);
