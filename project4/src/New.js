import React, { Component } from "react";
import backendUrl from "./Url";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      creator: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.token) {
      var username = localStorage.getItem("username");
      console.log(username);
      this.setState({
        creator: username
      });
    } else {
      console.log("Please Login")
      this.props.history.push("/login");
    }
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
    if (localStorage.token) {
      event.preventDefault();
      console.log(this.state.creator);
      const data = this.state;
      console.log(event);
      fetch(backendUrl + "community", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "user-token": `${localStorage.token}`
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          this.props.history.push("/");
          console.log(result);
        })
        .finally(() => this.props.getCommunities());
    } else {
      console.log("Please Login")
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      this.props.isLoggedIn === true && (
        <div className="card m-2">
          <div className="card-body">
            <h1>Create New Community</h1>
            <form onSubmit={this.handleSubmit} action="/community">
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
                <label>Category</label>
                <p>
                  <input
                    className="form-control"
                    id="category"
                    name="category"
                    type="text"
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <p>
                <button className="btn btn-success">Create Community</button>
              </p>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default New;
