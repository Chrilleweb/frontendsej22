import React, { Component } from "react";
import Sejlbode from "./SejlbodsService";

class CreateSejlbode extends Component {
  constructor() {
    super();
    this.state = {
      newSejlbod: {
        name: "",
        fod: "",
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newSejlbod: {
        ...prevState.newSejlbod,
        [name]: value,
      },
    }));
  };

  handleSubmit = () => {
    // Code to create a Sejlbod
    Sejlbode.createSejlbod(this.state.newSejlbod)
      .then(() => {
        // Clear the form and notify the parent component
        this.setState({ newSejlbod: { name: "", fod: "" } });
        this.props.onSejlbodeUpdated(); // Notify the parent component to refresh the Sejlbode list
      })
      .catch((error) => {
        console.error("Error creating Sejlbod:", error);
      });
  };

  fetchAndDisplaySejlbode() {
    Sejlbode.getSejlbode()
      .then((res) => {
        // Update the state to refresh the list in GetSejlbode
        this.props.onSejlbodeUpdated();
      })
      .catch((error) => {
        console.error("Error fetching Sejlbode:", error);
      });
  }

  render() {
    return (
        <div className="bg-white p-4 rounded shadow-md w-1/4">
        <h2 className="text-center text-lg font-semibold mb-2">Create Sejlbode</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-600 text-sm">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 w-full px-2 py-1 rounded-sm focus:outline-none focus:border-blue-500"
              value={this.state.newSejlbod.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="fod" className="block text-gray-600 text-sm">Fod:</label>
            <input
              type="number"
              id="fod"
              name="fod"
              className="border border-gray-300 w-full px-2 py-1 rounded-sm focus:outline-none focus:border-blue-500"
              value={this.state.newSejlbod.fod}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded-sm focus:outline-none"
          >
            Create
          </button>
        </form>
      </div>
      
    );
  }
}

export default CreateSejlbode;
