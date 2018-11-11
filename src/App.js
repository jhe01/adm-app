import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./common/PrivateRoute";

import Calendar from "./components/admin/calendar/Calendar";
// Events
import EventList from "./components/admin/events/EventList";
import AddEvent from "./components/admin/events/AddEvent";
import EditEvent from "./components/admin/events/EditEvent";
// Test
import Contact from "./components/Contact";
import User from "./components/User";
// Golf Club
import ClubsList from "./components/admin/clubs/ClubsList";
import AddClub from "./components/admin/clubs/AddClub";
import EditClub from "./components/admin/clubs/EditClub";
// User
import UsersList from "./components/admin/users/UsersList";
import AddUser from "./components/admin/users/AddUser";
import EditUser from "./components/admin/users/EditUser";
import ChangePassword from "./components/admin/users/ChangePassword";
// Auth
import Login from "./components/auth/Login";

import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import "./App.css";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/userActions";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Calendar of Events"
    };
    //console.log(dsGetList("list_records/events"));
  }

  componentWillUnmount() {}

  setBrand = brand => {
    this.setState({ brand: brand });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="main-content">
              {/* <Header branding={this.state.brand} /> */}
              <Switch>
                {/* @route - Calendar */}
                <Route exact path="/calendar" component={Calendar} />
                {/* @route - Events */}
                <PrivateRoute exact path="/events" component={EventList} />
                <PrivateRoute exact path="/add-event" component={AddEvent} />
                <PrivateRoute
                  exact
                  path="/edit-event/:id"
                  component={EditEvent}
                />
                {/* @route - Clubs */}
                <PrivateRoute exact path="/clubs" component={ClubsList} />
                <PrivateRoute exact path="/add-club" component={AddClub} />
                <PrivateRoute
                  exact
                  path="/edit-club/:id"
                  component={EditClub}
                />
                {/* @route - Users */}
                <PrivateRoute exact path="/users" component={UsersList} />
                <PrivateRoute exact path="/add-user" component={AddUser} />
                <PrivateRoute
                  exact
                  path="/edit-user/:id"
                  component={EditUser}
                />
                <PrivateRoute
                  exact
                  path="/change-pass/:id"
                  component={ChangePassword}
                />
                {/* @route - Auth */}
                <Route exact path="/login" component={Login} />

                {/* @route - Tests */}
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/users/:id" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
