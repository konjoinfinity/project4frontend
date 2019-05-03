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
import Search from "./Search";
import logo from "./logo.png"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: "",
      email: "",
      password: "",
      isLoggedIn: false,
      error: ""
    };
    this.getCommunities = this.getCommunities.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  getCommunities() {
    if (localStorage.token) {
      fetch(backendUrl + "community", {
        method: "GET",
        headers: {
          "user-token": `${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ communities: res });
        })
    } else {
      console.log("Please Login")
      this.props.history.push("/login");
    }
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
    axios
      .post(backendUrl + "users/signup", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
          this.setState({ error: response.data.error });
        } else {
          localStorage.token = response.data.token;
          this.setState({ isLoggedIn: true });
          console.log("User has signed up");
          localStorage.setItem("username", this.state.email);
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  }

  handleLogIn(e) {
    e.preventDefault();
    axios
      .post(backendUrl + "users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
          this.setState({ error: response.data.error });
        } else {
          localStorage.token = response.data.token;
          this.setState({ isLoggedIn: true });
          console.log("User is logged in");
          localStorage.setItem("username", this.state.email);
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
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
                    <h6>Home <span role="img" aria-label="key">🏠</span></h6>
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
                    <h6>My Communities <span role="img" aria-label="key">👤</span></h6>
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
                    <h6>Joined Communities <span role="img" aria-label="key">👤➡️👥</span></h6>
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
                    <h6>New <span role="img" aria-label="key">➕</span></h6>
                  </Link>
                )}
              </li>
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                {this.state.isLoggedIn === true && (
                  <Link to="/search">
                    <h6>Search <span role="img" aria-label="key">🔍</span></h6>
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
                    <h6>Login <span role="img" aria-label="key">🔑</span></h6>
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
                    <h6>Sign Up <span role="img" aria-label="key">⌨️</span></h6>
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
                    <h6>Logout <span role="img" aria-label="key">➡🚪</span></h6>
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
              path="/search"
              exact
              render={props => {
                return <Search {...props} isLoggedIn={this.state.isLoggedIn} />;
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
                    error={this.state.error}
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
                    error={this.state.error}
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
