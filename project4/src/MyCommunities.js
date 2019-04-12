import React, { Component } from "react";
import { Link } from "react-router-dom";
import backendUrl from "./Url";

class Communities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: ""
    };
  }

  componentDidMount() {
    fetch(backendUrl + "community/mycommunities")
      .then(res => res.json())
      .then(res => {
        this.setState({ communities: res });
      });
  }

  render() {
    var username = localStorage.getItem("username");
    this.state.communities && console.log(username);
    const mycommunities =
      this.state.communities &&
      this.state.communities.filter(
        community => community.creator === username
      );
    return (
      this.props.isLoggedIn === true && (
        <div>
          <h1>My Communities</h1>
          {this.state.communities &&
            mycommunities.map((community, id) => {
              return (
                <div className="song card mt-3" key={id}>
                  <div className="card-body">
                    <p>
                      <Link to={"/community/" + community._id}>
                        <button className="btn btn-success">
                          {community.name}
                        </button>
                      </Link>
                    </p>
                    <p>{community.description}</p>
                    <p>{community.category}</p>
                    <p>Number of Members: {community.numberOfMembers}</p>
                    <p>Creator: {community.creator}</p>
                  </div>
                </div>
              );
            })}
        </div>
      )
    );
  }
}

export default Communities;
