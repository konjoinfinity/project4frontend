import React, { Component } from "react";
import backendUrl from "./Url";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      category: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(backendUrl + `community/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ community: res });
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
    const data = this.state;
    fetch(backendUrl + `community/${this.props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        this.props.history.push(`/community/${this.props.match.params.id}`);
        console.log(result);
      })
      .finally(() => this.props.getCommunities());
  }

  render() {
    return (
      this.props.isLoggedIn === true && (
        <div className="card m-2">
          <div className="card-body">
            <h1>Edit Community</h1>
            <form onSubmit={this.handleSubmit} action="/community">
              <div className="form-group">
                <label>Name</label>
                <p>
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={
                      this.state.community && this.state.community.name
                    }
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
                    defaultValue={
                      this.state.community && this.state.community.description
                    }
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
                    defaultValue={
                      this.state.community && this.state.community.category
                    }
                    onChange={this.handleInputChange}
                  />
                </p>
              </div>
              <p>
                <button className="btn btn-primary">Edit Community</button>
              </p>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default Edit;
