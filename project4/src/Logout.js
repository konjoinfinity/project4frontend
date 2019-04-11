import React, { Component } from "react";

class Logout extends Component {
  render() {
    return (
      this.props.isLoggedIn === true && (
        <div className="card m-2">
          <div className="card-body">
            <form>
              <button
                className="btn btn-warning"
                type="submit"
                onClick={this.props.handleLogOut}
              >
                <h2>Log Out</h2>
              </button>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default Logout;
