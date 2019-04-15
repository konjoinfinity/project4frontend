import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import backendUrl from "./Url";
import axios from "axios";
import { withRouter } from "react-router";
import Communities from "./Communities";
import New from "./New";
import Community from "./Community";
import Edit from "./Edit";
import Meet from "./Meet";
import MyCommunities from "./MyCommunities";
import JoinedCommunities from "./JoinedCommunities";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: "",
      email: "",
      password: "",
      isLoggedIn: false
    };
    this.getCommunities = this.getCommunities.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  getCommunities() {
    fetch(backendUrl + "community")
      .then(res => res.json())
      .then(res => {
        this.setState({ communities: res });
      });
  }

  componentDidMount() {
    this.getCommunities();
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  handleLogOut(e) {
    e.preventDefault();
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false
    });
    localStorage.clear();
    console.log("User has been logged out");
    var username = localStorage.getItem("username");
    console.log(username);
    this.props.history.push("/login");
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignUp(e) {
    e.preventDefault();
    localStorage.setItem("username", this.state.email);
    axios
      .post(backendUrl + "users/signup", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.token;
        this.setState({ isLoggedIn: true });
        console.log("User has signed up");
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  handleLogIn(e) {
    e.preventDefault();
    localStorage.setItem("username", this.state.email);
    axios
      .post(backendUrl + "users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.token;
        this.setState({ isLoggedIn: true });
        console.log("User is logged in");
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand" href="/">
            <img
              src="https://konjoinfinity.github.io/img/logo.png"
              alt="Konjo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li
                className="nav-item active"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === true && (
                  <Link to="/">
                    <h4>Home</h4>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === true && (
                  <Link to="/mycommunities">
                    <h4>My Communities</h4>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === true && (
                  <Link to="/joinedcommunities">
                    <h4>Joined Communities</h4>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === true && (
                  <Link to="/new">
                    <h4>New</h4>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === false && (
                  <Link to="/login">
                    <h4>Login</h4>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === false && (
                  <Link to="/signup">
                    <h4>Sign Up</h4>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === true && (
                  <Link to="/logout">
                    <h4>Logout</h4>
                  </Link>
                )}
              </li>
            </ul>
            <span className="navbar-text text-light">
              Beautiful Communities
            </span>
          </div>
        </nav>
        <main className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={props => {
                return (
                  <Communities {...props} isLoggedIn={this.state.isLoggedIn} />
                );
              }}
            />
            <Route
              path="/new"
              exact
              render={props => (
                <New
                  {...props}
                  getCommunities={this.getCommunities}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/joinedcommunities"
              exact
              render={props => {
                return (
                  <JoinedCommunities
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                  />
                );
              }}
            />
            <Route
              path="/mycommunities"
              exact
              render={props => {
                return (
                  <MyCommunities
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                  />
                );
              }}
            />
            <Route
              path="/community/:id"
              exact
              render={props => (
                <Community
                  {...props}
                  communities={this.state.communities}
                  getCommunities={this.getCommunities}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/community/:id/meet"
              exact
              render={props => (
                <Meet
                  {...props}
                  communities={this.state.communities}
                  getCommunities={this.getCommunities}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/community/:id/edit"
              render={props => (
                <Edit
                  {...props}
                  getCommunities={this.getCommunities}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              path="/signup"
              render={props => {
                return (
                  <Signup
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    handleInput={this.handleInput}
                    handleSignUp={this.handleSignUp}
                  />
                );
              }}
            />
            <Route
              path="/logout"
              render={props => {
                return (
                  <Logout
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    handleLogOut={this.handleLogOut}
                  />
                );
              }}
            />
            <Route
              path="/login"
              render={props => {
                return (
                  <Login
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    handleInput={this.handleInput}
                    handleLogIn={this.handleLogIn}
                  />
                );
              }}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
