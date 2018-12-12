import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";

import Header from "../../template/Header";
import Sidenav from "../../template/Aside";
import ImageButton from "../util/ImageButton";

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
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Header branding={`Club`} />
        <Sidenav active="club-list" />
        <Row className="club-container">
          <Col s={12} m={3}>
            <div className="card">
              <div className="card-image">
                <img
                  src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                  alt="Club"
                />

                <button className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </button>
              </div>
              <div className="card-content">
                <span className="card-title">Sample Golf and Country Club</span>
              </div>
            </div>
            <Collection header="Other Info">
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
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">About</span>
                <p>Sample Details</p>
              </div>
            </div>
            <h5 className="blue-text darken-4">Gallery</h5>
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">
                  Recent Events
                </span>
                <Row>
                  <Col s={12} m={3}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                          alt="Club"
                        />
                        <span className="card-title">
                          Sample Golf and Country Club
                        </span>
                        <button className="btn-floating halfway-fab waves-effect waves-light red">
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col s={12} m={3}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                          alt="Club"
                        />
                        <span className="card-title">
                          Sample Golf and Country Club
                        </span>
                        <button className="btn-floating halfway-fab waves-effect waves-light red">
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col s={12} m={3}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                          alt="Club"
                        />
                        <span className="card-title">
                          Sample Golf and Country Club
                        </span>
                        <button className="btn-floating halfway-fab waves-effect waves-light red">
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col s={12} m={3}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                          alt="Club"
                        />
                        <span className="card-title">
                          Sample Golf and Country Club
                        </span>
                        <button className="btn-floating halfway-fab waves-effect waves-light red">
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col s={12} m={3}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                          alt="Club"
                        />
                        <span className="card-title">
                          Sample Golf and Country Club
                        </span>
                        <button className="btn-floating halfway-fab waves-effect waves-light red">
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col s={12} m={3}>
                    <div className="card">
                      <div className="card-image">
                        <img
                          src="http://www.cavite.info/custom/domain_1/image_files/sitemgr_photo_1546.jpg"
                          alt="Club"
                        />
                        <span className="card-title">
                          Sample Golf and Country Club
                        </span>
                        <button className="btn-floating halfway-fab waves-effect waves-light red">
                          <i className="material-icons">add</i>
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">Facility</span>
                <p>Sample Details</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <span className="card-title blue-text darken-4">Fairways</span>
                <p>Sample Details</p>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Club;
