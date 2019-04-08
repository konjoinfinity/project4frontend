import React, { Component } from "react";

class Signup extends Component {
  render() {
    return (
      this.props.isLoggedIn === false && (
        <div className="card m-5">
          <div className="card-body">
            <h2>Sign Up</h2>

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
                className="btn btn-success"
                type="submit"
                onClick={this.props.handleSignUp}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default Signup;
