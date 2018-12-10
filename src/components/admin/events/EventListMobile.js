import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-materialize";
import moment from "moment";

export default function EventListMobile(props) {
  return (
    <React.Fragment>
      <h5 className="hide-on-med-and-up">Events</h5>
      <div className="hide-on-med-and-up">
        {props.events.map(event => {
          return (
            <div className="card card-events" key={event._id}>
              <div className="card-content" style={{ padding: "5px 0 0 0" }}>
                <div className="row">
                  {event.banner.length > 0 ? (
                    <div className="col s3">
                      <img
                        style={{ width: "60px" }}
                        src={`/api/upload/image/${event.banner[0].filename}`}
                        alt="EventPicture"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={event.banner.length > 0 ? "col s9" : "col s12"}
                  >
                    <Dropdown
                      trigger={
                        <Button className="more-btn btn-flat waves-effect waves-teal right">
                          <i className="material-icons">more_vert</i>
                        </Button>
                      }
                      options={{ constrainWidth: false }}
                    >
                      <li>
                        <Link to={`/event/${event._id}`}>VIEW</Link>
                      </li>
                    </Dropdown>
                    <span>
                      <strong>{event.title}</strong>
                    </span>
                    <br />
                    <span>
                      {event.eventType.name} | {event.eventCategory.name}
                    </span>
                    <br />
                    <span>
                      {event.oneDayOnly
                        ? moment(event.dateOfEvent, "MM-DD-YYYY").format(
                            "MMM DD, YYYY"
                          )
                        : moment(event.from, "MM-DD-YYYY").format("MMM DD") +
                          " to " +
                          moment(event.to, "MM-DD-YYYY").format("MMM DD, YYYY")}
                    </span>
                    {event.oneDayOnly && !event.isWholeDay ? (
                      <React.Fragment>
                        <span> | {event.timeFrom + " to " + event.timeTo}</span>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
