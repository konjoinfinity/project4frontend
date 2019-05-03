import React, { Component } from "react";
import { Link } from "react-router-dom";
import backendUrl from "./Url";

class Communities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: ""
    };
    this.getCommunities = this.getCommunities.bind(this);
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch(backendUrl + "community", {
        method: "GET",
        headers: {
          "x-access-token": `${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ communities: res });
        })
    } else {
      console.log("Please Login")
    }
  }

  getCommunities() {
    if (localStorage.token) {
      fetch(backendUrl + "community", {
        method: "GET",
        headers: {
          "x-access-token": `${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ communities: res });
        })
    } else {
      console.log("Please Login")
    }
  }

  render() {
    let communities;
    this.state.communities &&
      (communities = this.state.communities.map((community, id) => {
        return (
          <div className="song card mt-3" key={id}>
            <div className="card-body">
              <p>
                <Link to={"/community/" + community._id}>
                  <button className="btn btn-success">{community.name}</button>
                </Link>
              </p>
              <p>{community.description}</p>
              <p>{community.category}</p>
              <p>Number of Members: {community.numberOfMembers}</p>
              <p>Creator: {community.creator}</p>
            </div>
          </div>
        );
      }));

    return (
      this.props.isLoggedIn === true && (
        <div>
          <h1>Communities</h1>
          {communities}
        </div>
      )
    );
  }
}

export default Communities;
