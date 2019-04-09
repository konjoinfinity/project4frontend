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
    this.joinCommunity = this.joinCommunity.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
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
      .then(response => response.json())
      .then(result => {
        this.props.history.push("/");
        console.log(result);
      })
      .finally(() => this.props.getCommunities());
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

  joinCommunity(event) {
    event.preventDefault();
    var username = localStorage.getItem("username");
    console.log(`Username is: ${username}`);
    axios
      .put(backendUrl + `community/${this.props.match.params.id}/adduser`, {
        member: username
      })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getCommunity();
      });
    this.props.history.push(`/community/${this.state.community._id}/`);
  }

  deleteMember(event) {
    event.preventDefault();
    axios
      .put(backendUrl + `community/${this.state.community._id}/removeuser`, {
        body: event.target.dataset.id
      })
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
        this.getCommunity();
      });
    this.props.history.push(`/community/${this.props.match.params.id}/`);
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
    const member =
      this.state.community &&
      this.state.community.members.filter(member => member.name === username);
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
              <div className="member card m-5">
                <div className="card-body">
                  <h5>Members</h5>
                  {this.state.community &&
                    this.state.community.members.map((member, id) => {
                      return (
                        <div key={id}>
                          <p>{member.name}</p>
                          {username === this.state.community.creator && (
                            <form
                              data-id={member._id}
                              onSubmit={this.deleteMember}
                            >
                              <p>
                                <button className="btn btn-warning">
                                  Remove Member
                                </button>
                              </p>
                            </form>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              {this.state.community &&
                (username !== this.state.community.creator &&
                  member.length === 0 && (
                    <form onSubmit={this.joinCommunity}>
                      <p>
                        <button className="btn btn-info">Join Community</button>
                      </p>
                    </form>
                  ))}
              {this.state.community &&
                (username === this.state.community.creator && (
                  <p>
                    <Link to={`/community/${this.props.match.params.id}/edit`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                  </p>
                ))}
              {this.state.community &&
                (this.state.community.members.length >= 3 &&
                  member.length === 1 && (
                    <p>
                      <Link
                        to={`/community/${this.props.match.params.id}/meet`}
                      >
                        <button className="btn btn-success">New Meet</button>
                      </Link>
                    </p>
                  ))}
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
