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
  addClubFacility,
  deleteClubCourse,
  updateClubCourse,
  addClubCourse
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
import EditDescription from "./club/EditDescription";
import EditAddress from "./club/EditAddress";
import EditCourse from "./club/EditCourse";
import EditClubName from "./club/EditClubName";
import EditMaintenanceDay from "./club/EditMaintenanceDay";
import ClubContactList from "./ClubContactList";
import ClubSocialMediaList from "./ClubSocialMediaList";

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
      PRFName: "",
      isEditDescription: false,
      isEditName: false,
      isEditAddress: false,
      isEditMaintenanceDay: false,
      isEditCourse: false,
      isAddEditContact: false,
      isAddEditSocialMedia: false,
      isAddContact: false,
      isAddSocialMedia: false
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

  onEditClubName = () => {
    this.setState({ isEditName: !this.state.isEditName });
  };

  onClickEditDescription = () => {
    this.setState({ isEditDescription: !this.state.isEditDescription });
  };

  onClickEditAddress = () => {
    this.setState({ isEditAddress: !this.state.isEditAddress });
  };
  onClickEditCourse = () => {
    this.setState({ isEditCourse: !this.state.isEditCourse });
  };

  onClickEditMaintentnceDay = () => {
    this.setState({ isEditMaintenanceDay: !this.state.isEditMaintenanceDay });
  };

  onClickAddContact = () => {
    this.setState({ isAddContact: !this.state.isAddContact });
  };

  onClickEditContact = () => {
    this.setState({ isAddEditContact: !this.state.isAddEditContact });
  };

  onClickAddSocialMedia = () => {
    this.setState({ isAddSocialMedia: !this.state.isAddSocialMedia });
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
          course.clubid = this.state.club._id;
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
    const {
      name,
      facility_images,
      fairway_images,
      recent_event_albums,
      courses,
      facilities,
      services,
      policies,
      logo,
      description,
      address,
      maintenance_day,
      contact,
      social_media
    } = this.state.club;
    const {
      isEditDescription,
      isEditAddress,
      isEditCourse,
      isEditMaintenanceDay,
      isAddEditContact,
      isAddContact,
      isAddSocialMedia,
      club,
      isEditName
    } = this.state;
    const createMarkUp = () => {
      return { __html: description !== "" ? description : "No Details." };
    };
    return (
      <React.Fragment>
        <Header branding={`Club`} />
        <Sidenav active="club-list" />
        <Row className="club-container" style={{ marginTop: "10px" }}>
          <Col s={12} m={3}>
            <Link
              to={`/clubs`}
              className="btn btn-small grey lighten-5 black-text waves-effect"
            >
              Back
            </Link>
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
                {/* <span className="card-title"> */}
                <strong>Club Name:</strong>{" "}
                {isEditName ? (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect red darken-2"
                    onClick={this.onEditClubName}
                  >
                    <i className="material-icons">close</i>
                  </button>
                ) : (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect blue darken-2"
                    onClick={this.onEditClubName}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                )}
                {isEditName ? (
                  <EditClubName club={club} afterSave={this.onEditClubName} />
                ) : (
                  <span className="card-title">{name} </span>
                )}{" "}
                {/* </span> */}
              </div>
            </div>
            <Collection header="Other Info">
              <CollectionItem>
                <strong>Course:</strong>{" "}
                <button
                  className="btn-floating btn-small action-btn-floating waves-effect blue darken-4"
                  onClick={this.onClickAddCourse}
                >
                  <i className="material-icons">add</i>
                </button>
                {courses ? <EditCourse courses={courses} club={club} /> : ""}
              </CollectionItem>
              <CollectionItem>
                <strong>Address:</strong>{" "}
                {isEditAddress ? (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect red darken-2"
                    onClick={this.onClickEditAddress}
                  >
                    <i className="material-icons">close</i>
                  </button>
                ) : (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect blue darken-2"
                    onClick={this.onClickEditAddress}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                )}
                {isEditAddress ? (
                  <EditAddress
                    club={this.state.club}
                    afterSave={this.onClickEditAddress}
                  />
                ) : (
                  <p>{address}</p>
                )}
              </CollectionItem>
              <CollectionItem>
                <strong>Maintenance Day:</strong>{" "}
                {isEditMaintenanceDay ? (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect red darken-2"
                    onClick={this.onClickEditMaintentnceDay}
                  >
                    <i className="material-icons">close</i>
                  </button>
                ) : (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect blue darken-2"
                    onClick={this.onClickEditMaintentnceDay}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                )}
                {isEditMaintenanceDay ? (
                  <EditMaintenanceDay
                    club={club}
                    afterSave={this.onClickEditMaintentnceDay}
                  />
                ) : (
                  <p>{maintenance_day}</p>
                )}
              </CollectionItem>
              <CollectionItem>
                <strong>Contacts:</strong>{" "}
                {isAddContact ? (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect red darken-4"
                    onClick={this.onClickAddContact}
                  >
                    <i className="material-icons">close</i>
                  </button>
                ) : (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect blue darken-4"
                    onClick={this.onClickAddContact}
                  >
                    <i className="material-icons">add</i>
                  </button>
                )}
                {/* {isAddEditContact ? <EditContact /> : ""} */}
                <ClubContactList
                  contacts={contact ? contact : []}
                  club={club}
                  isAddContact={isAddContact}
                  afterSave={this.onClickAddContact}
                />
              </CollectionItem>
              <CollectionItem>
                <strong>Social Media:</strong>
                {isAddSocialMedia ? (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect red darken-4"
                    onClick={this.onClickAddSocialMedia}
                  >
                    <i className="material-icons">close</i>
                  </button>
                ) : (
                  <button
                    className="btn-floating btn-small action-btn-floating waves-effect blue darken-4"
                    onClick={this.onClickAddSocialMedia}
                  >
                    <i className="material-icons">add</i>
                  </button>
                )}
                {/* {isAddEditContact ? <EditContact /> : ""} */}
                <ClubSocialMediaList
                  social_medias={social_media ? social_media : []}
                  club={club}
                  isAddSocialMedia={isAddSocialMedia}
                  afterSave={this.onClickAddSocialMedia}
                />
              </CollectionItem>
            </Collection>
          </Col>
          <Col s={12} m={9}>
            <h5 className="blue-text darken-4">About</h5>
            <div className="card">
              <div className="card-image">
                {isEditDescription ? (
                  <button
                    className="btn-floating halfway-fab waves-effect waves-light red darken-2"
                    onClick={this.onClickEditDescription}
                  >
                    <i className="material-icons">close</i>
                  </button>
                ) : (
                  <button
                    className="btn-floating halfway-fab waves-effect waves-light blue darken-2"
                    onClick={this.onClickEditDescription}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                )}
              </div>
              <div className="card-content">
                {isEditDescription ? (
                  <EditDescription
                    club={this.state.club}
                    afterSave={this.onClickEditDescription}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={createMarkUp()} />
                )}
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <button
                      className="btn-floating halfway-fab waves-effect blue darken-4"
                      onClick={() => {
                        this.onClickAddPolicy("policy");
                      }}
                    >
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                  <div className="card-content">
                    <span className="card-title blue-text darken-4">
                      Policies{" "}
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
                  <div className="card-image">
                    <button
                      className="btn-floating halfway-fab waves-effect blue darken-4"
                      onClick={() => {
                        this.onClickAddService("service");
                      }}
                    >
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                  <div className="card-content">
                    <span className="card-title blue-text darken-4">
                      Rentals/Services
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
                  <div className="card-image">
                    <button
                      className="btn-floating halfway-fab waves-effect blue darken-4"
                      onClick={() => {
                        this.onClickAddFacility("facility");
                      }}
                    >
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                  <div className="card-content">
                    <span className="card-title blue-text darken-4">
                      Facilities
                    </span>
                    {facilities ? (
                      <ClubFacilityList facilities={facilities} />
                    ) : (
                      <p>No facility record yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h5 className="blue-text darken-4">Gallery</h5>
            <div className="card">
              <div className="card-image">
                <button
                  className="btn-floating halfway-fab waves-effect blue darken-4"
                  onClick={this.onClickAddAlbum}
                >
                  <i className="material-icons">add</i>
                </button>
              </div>
              <div className="card-content">
                <span className="card-title blue-text darken-4">
                  Recent Events
                </span>

                {recent_event_albums ? (
                  <ClubGallery albums={recent_event_albums} />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-image">
                <button
                  className="btn-floating halfway-fab waves-effect blue darken-4"
                  onClick={() => {
                    this.onClickUploadFacilityFairwayImages("facility");
                  }}
                >
                  <i className="material-icons">add</i>
                </button>
              </div>
              <div className="card-content">
                <span className="card-title blue-text darken-4">Facility</span>

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
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-image">
                <button
                  className="btn-floating halfway-fab waves-effect blue darken-4"
                  onClick={() => {
                    this.onClickUploadFacilityFairwayImages("fairway");
                  }}
                >
                  <i className="material-icons">add</i>
                </button>
              </div>
              <div className="card-content">
                <span className="card-title blue-text darken-4">Fairways</span>
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
    addClubFacility,
    addClubCourse,
    deleteClubCourse,
    updateClubCourse
  }
)(Club);
