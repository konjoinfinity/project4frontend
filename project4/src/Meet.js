import React, { Component } from "react";
import backendUrl from "./Url";
import axios from "axios";

class Meet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      date: "",
      time: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    console.log(event);
    axios
      .put(backendUrl + `community/${this.props.match.params.id}/meet`, {
        meet: this.state
      })
      .then(result => {
        this.props.history.push(`/community/${this.props.match.params.id}`);
        console.log(result);
        this.props.getCommunities();
      });
  }

  render() {
    return (
      this.props.isLoggedIn === true && (
        <div className="card m-2">
          <div className="card-body">
            <h1>New Meet</h1>
            <form onSubmit={this.handleSubmit} action="/community/:id/meet">
              <div className="form-group">
                <label>Name</label>
                <p>
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <div className="form-group">
                <label>Description</label>
                <p>
                  <input
                    className="form-control"
                    id="description"
                    name="description"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <div className="form-group">
                <label>Location</label>
                <p>
                  <input
                    className="form-control"
                    id="location"
                    name="location"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <div className="form-group">
                <label>Date</label>
                <p>
                  <input
                    className="form-control"
                    id="date"
                    name="date"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <div className="form-group">
                <label>Time</label>
                <p>
                  <input
                    className="form-control"
                    id="time"
                    name="time"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <p>
                <button className="btn btn-success">Create Meet</button>
              </p>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default Meet;
