import React, { Component } from "react";

class Login extends Component {
  render() {
    let errormessage;
    this.props.error &&
      (errormessage = (
        <button className="btn btn-warning"> {this.props.error}</button>
      ));
    return (
      this.props.isLoggedIn === false && (
        <div className="card m-2">
          <div className="card-body">
            <h2>Log In</h2>
            {errormessage}
            <form>
              <div className="form-group">
                <label>Email</label>
                <p>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    onChange={this.props.handleInput}
                  />
                </p>
              </div>
              <div className="form-group">
                <label>Password</label>
                <p>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={this.props.handleInput}
                  />
                </p>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.props.handleLogIn}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default Login;
