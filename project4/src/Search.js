import React, { Component } from "react";
import { Link } from "react-router-dom";
import backendUrl from "./Url";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: "",
      search: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(backendUrl + "community")
      .then(res => res.json())
      .then(res => {
        this.setState({ communities: res });
      });
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    let communitySearch;
    this.state.communities && (communitySearch = this.state.communities);
    let search = this.state.search.trim().toLowerCase();

    this.state.communities && console.log(search);

    if (search.length > 0) {
      this.state.communities &&
        (communitySearch = communitySearch.filter(function(community) {
          return community.name.toLowerCase().match(search);
        }));
    }

    let results;
    this.state.communities &&
      (results = communitySearch.map((community, id) => {
        return (
          <div className="community" key={id}>
            <Link to={"/community/" + community._id}>
              <button className="btn btn-success">{community.name}</button>
            </Link>
            <p>Description: {community.description}</p>
            <p>Category: {community.category}</p>
            <p>Members: {community.numberOfMembers}</p>
            <p>Creator: {community.creator}</p>
          </div>
        );
      }));

    return (
      this.props.isLoggedIn === true && (
        <div>
          <h1>Community Search</h1>
          <div className="card mt-3">
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Search Communities"
                />
              </div>
            </div>
          </div>
          {this.state.search !== "" && (
            <div className="card mt-3">
              <div className="card-body">{results}</div>
            </div>
          )}
        </div>
      )
    );
  }
}

export default Search;
