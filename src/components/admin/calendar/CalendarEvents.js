import React, { Component } from "react";
import moment from "moment";

export default class CalendarEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    };
  }

  componentDidMount() {
    // if (!this.props.noEvent) {
    //   const event = this.props.ds.record.getRecord(
    //     "events/" + this.props.event.ds_key
    //   );
    //   event.subscribe(this._subscribe.bind(this));
    // }
    // this.setState({ event: this.props.event });
  }

  _subscribe(rec) {
    this.setState({ event: rec });
  }

  render() {
    const { event } = this.props;
    if (!this.props.noEvent) {
      return (
        <div>
          <div className="card">
            {event.banner[0] ? (
              <div className="card-image">
                <img
                  src={`/api/upload/image/${event.banner[0].filename}`}
                  alt="Event Img"
                />
              </div>
            ) : (
              ""
            )}
            <div className="card-content">
              <span className="card-title blue-text text-darken-4">
                {event.title}
              </span>
              <p className="blue-text text-darken-4">{event.club.name}</p>
              <p>
                <strong>
                  {event.eventType.name} | {event.eventCategory.name}
                </strong>
              </p>
              <p>
                {event.oneDayOnly
                  ? moment(event.dateOfEvent).format("DD MMMM, YYYY")
                  : `${moment(event.from, "MM-DD-YYYY").format(
                      "DD MMMM, YYYY"
                    )} to ${moment(event.to, "MM-DD-YYYY").format(
                      "DD MMMM, YYYY"
                    )} `}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card">
            <div className="card-content">
              <p>No event on this date.</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
