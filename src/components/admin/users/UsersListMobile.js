import React from "react";

import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-materialize";

export default function UsersListMobile(props) {
  return (
    <React.Fragment>
      <h5 className="hide-on-med-and-up">Users</h5>
      <div className="hide-on-med-and-up">
        {props.users.map(user => {
          return (
            <div className="card card-users" key={user._id}>
              <div className="card-content" style={{ padding: "5px 0 0 0" }}>
                <div className="row">
                  <div className="col s12">
                    <Dropdown
                      trigger={
                        <Button className="more-btn btn-flat waves-effect waves-teal right">
                          <i className="material-icons">more_vert</i>
                        </Button>
                      }
                      options={{ constrainWidth: false }}
                    >
                      <li>
                        <a
                          href="#!"
                          onClick={() => {
                            props.onClickDisable(user);
                          }}
                        >
                          {user.is_active ? "DISABLE" : "ENABLE"}
                        </a>
                      </li>
                      <li>
                        <Link to={`/change-pass/${user._id}`}>
                          CHANGE PASSWORD
                        </Link>
                      </li>
                      <li>
                        <Link to={`/edit-user/${user._id}`}>EDIT</Link>
                      </li>
                    </Dropdown>
                    <span>
                      <strong>{user.name}</strong>
                    </span>
                    <br />
                    <span className="blue-text text-darken-4">
                      {user.club_id.name}
                    </span>
                    <br />
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
