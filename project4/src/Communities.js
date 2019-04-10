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
    fetch(backendUrl + "community")
      .then(res => res.json())
      .then(res => {
        this.setState({ communities: res });
      });
  }

  getCommunities() {
    fetch(backendUrl + "community")
      .then(res => res.json())
      .then(res => {
        this.setState({ communities: res });
      });
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
