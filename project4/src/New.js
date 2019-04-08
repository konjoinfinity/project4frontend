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
    this.setState({
      creator: this.props.email
    });
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
    console.log(this.state.creator);
    const data = this.state;
    console.log(event);
    fetch(backendUrl + "community", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        this.props.history.push("/");
        console.log(result);
      })
      .finally(() => this.props.getCommunities());
  }

  render() {
    return (
      this.props.isLoggedIn === true && (
        <div className="card m-5">
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
