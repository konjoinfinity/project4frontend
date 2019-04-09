import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backendUrl from "./Url";

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      community: null,
      comment: null
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.deleteMeet = this.deleteMeet.bind(this);
    this.deleteCommunity = this.deleteCommunity.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.getCommunity = this.getCommunity.bind(this);
  }

  componentDidMount() {
    fetch(backendUrl + `community/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ community: res });
      });
  }

  getCommunity() {
    fetch(backendUrl + `community/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ community: res });
      });
  }

  deleteCommunity(event) {
    event.preventDefault();
    fetch(backendUrl + `community/${this.state.community._id}`, {
      method: "DELETE"
    })
      .then(result => {
        console.log(result);
        this.props.getCommunities();
      })
      .then(this.props.history.push("/"));
  }

  handleComment() {
    fetch(backendUrl + `community/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ community: res });
      });
    this.props.history.push(`/community/${this.props.match.params.id}/`);
  }

  deleteComment(event) {
    event.preventDefault();
    axios
      .put(backendUrl + `community/${this.state.community._id}/delete`, {
        body: event.target.dataset.id
      })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getCommunity();
      });
    this.props.history.push(`/community/${this.props.match.params.id}/`);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .put(backendUrl + `community/${this.props.match.params.id}/comment`, {
        comment: this.state.comment
      })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getCommunity();
      });
    this.props.history.push(`/community/${this.state.community._id}/`);
  }

  deleteMeet(event) {
    event.preventDefault();
    axios
      .put(backendUrl + `community/${this.state.community._id}/meet/delete`, {
        body: event.target.dataset.id
      })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getCommunity();
      });
    this.props.history.push(`/community/${this.props.match.params.id}/`);
  }

  render() {
    var username = localStorage.getItem("username");
    console.log(username);
    return (
      this.props.isLoggedIn === true && (
        <div className="conatiner">
          <div className="community card m-5">
            <div className="card-body">
              <h1>{this.state.community && this.state.community.name}</h1>
              <h2>
                Description:{" "}
                {this.state.community && this.state.community.description}
              </h2>
              <p>
                Category:{" "}
                {this.state.community && this.state.community.category}
              </p>
              <p>
                Creator: {this.state.community && this.state.community.creator}
              </p>
              {this.state.community &&
                (username === this.state.community.creator && (
                  <p>
                    <Link to={`/community/${this.props.match.params.id}/edit`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                  </p>
                ))}
              <p>
                <Link to={`/community/${this.props.match.params.id}/meet`}>
                  <button className="btn btn-success">New Meet</button>
                </Link>
              </p>
              {this.state.community &&
                (username === this.state.community.creator && (
                  <form onSubmit={this.deleteCommunity}>
                    <button className="btn btn-danger">Delete</button>
                  </form>
                ))}
            </div>
          </div>

          {this.state.community &&
            this.state.community.meets.map((meet, id) => {
              return (
                <div className="meet card m-5" key={id}>
                  <div className="card-body">
                    <h2>{meet.name}</h2>
                    <h4>{meet.description}</h4>
                    <p>{meet.date}</p>
                    <p>{meet.time}</p>
                    <form data-id={meet._id} onSubmit={this.deleteMeet}>
                      <p>
                        <button className="btn btn-warning">Delete</button>
                      </p>
                    </form>
                  </div>
                </div>
              );
            })}
          <div className="community card m-5">
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <p>
                    <input
                      className="form-control"
                      id="comment"
                      name="comment"
                      type="text"
                      onChange={this.handleInputChange}
                    />
                  </p>
                </div>
                <p>
                  <button className="btn btn-primary">Comment</button>
                </p>
              </form>
            </div>
          </div>
          {this.state.community &&
            this.state.community.comments.map((comment, id) => {
              return (
                <div className="community card m-5" key={id}>
                  <div className="card-body">
                    <p>{comment.text}</p>
                    <form data-id={comment._id} onSubmit={this.deleteComment}>
                      <p>
                        <button className="btn btn-warning">Delete</button>
                      </p>
                    </form>
                  </div>
                </div>
              );
            })}
        </div>
      )
    );
  }
}

export default Community;
