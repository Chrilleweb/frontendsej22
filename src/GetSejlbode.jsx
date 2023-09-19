import React, { Component } from "react";
import Sejlbode from "./SejlbodsService";

class GetSejlbode extends Component {
  constructor() {
    super();
    this.state = {
      sejlbode: [],
      newSejlbod: {
        name: "",
        fod: "",
      },
      updateSejlbod: {
        id: null,
        name: "",
        fod: "",
      },
    };
  }

  componentDidMount() {
    this.fetchAndDisplaySejlbode();
  }

  fetchAndDisplaySejlbode() {
    Sejlbode.getSejlbode().then((res) => {
      this.setState({ sejlbode: res.data });
    });
  }

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Sejlbod?")) {
      Sejlbode.deleteSejlbod(id)
        .then(() => {
          // Refresh the list of Sejlbode objects after deletion
          this.fetchAndDisplaySejlbode();
        })
        .catch((error) => {
          console.error("Error deleting Sejlbod:", error);
        });
    }
  };

  handleUpdate = (sejlbod) => {
    // Set the updateSejlbod state to the Sejlbod you want to update
    this.setState({
      updateSejlbod: {
        id: sejlbod.id,
        name: sejlbod.name,
        fod: sejlbod.fod,
      },
    });
  };

  handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      updateSejlbod: {
        ...prevState.updateSejlbod,
        [name]: value,
      },
    }));
  };

  handleUpdateSubmit = () => {
    const { updateSejlbod } = this.state;

    Sejlbode.updateSejlbod(updateSejlbod.id, updateSejlbod)
      .then(() => {
        // Clear the updateSejlbod state and refresh the list of Sejlbode objects
        this.setState({
          updateSejlbod: {
            id: null,
            name: "",
            fod: "",
          },
        });
        this.fetchAndDisplaySejlbode();
      })
      .catch((error) => {
        console.error("Error updating Sejlbod:", error);
      });
  };

  handlePointsChange(id, newPoints) {
    this.setState((prevState) => {
      const updatedSejlbode = prevState.sejlbode.map((sejlbode) => {
        if (sejlbode.id === id) {
          return { ...sejlbode, points: newPoints };
        }
        return sejlbode;
      });
      return { sejlbode: updatedSejlbode };
    });
  }

  handleUpdatePoints(id) {
    const sejlbode = this.state.sejlbode.find((s) => s.id === id);

    if (sejlbode) {
      console.log("ID:", id);
      console.log("Points:", sejlbode.points);

      Sejlbode.addPointsToSejlbod(id, sejlbode.points)
        .then((response) => {
          if (response) {
            // Opdater pointene på frontend
            this.setState((prevState) => {
              const updatedSejlbode = prevState.sejlbode.map((s) => {
                if (s.id === response.id) {
                  return response;
                }
                return s;
              });
              return { sejlbode: updatedSejlbode };
            });
          } else {
            console.error("Fejl ved opdatering af point");
          }
        })
        .catch((error) => {
          console.error("Fejl ved opdatering af point:", error);
        });
    }
  }

  refreshSejlbode = () => {
    this.fetchAndDisplaySejlbode();
  };

  render() {
    return (
        <div className="bg-white p-4 rounded shadow-md">
        <h2 className="ml-24 text-lg font-semibold mb-2">Update Sejlbod</h2>
        <form className="w-1/4" onSubmit={this.handleUpdateSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-600 text-sm">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 w-full px-2 py-1 rounded-sm focus:outline-none focus:border-blue-500"
              value={this.state.updateSejlbod.name}
              onChange={this.handleUpdateInputChange}
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
              value={this.state.updateSejlbod.fod}
              onChange={this.handleUpdateInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded-sm focus:outline-none"
          >
            Update Sejlbod
          </button>
        </form>
      
        <table className="table table-striped table-bordered mt-4">
          <thead>
            <tr>
              <th className="px-2 py-1">Sejlbod Name</th>
              <th className="px-2 py-1">Sejlbod Fod</th>
              <th className="px-2 py-1">Sejlbod Bodtype</th>
              <th className="px-2 py-1">Actions</th>
              <th className="px-2 py-1">Points</th>
              <th className="px-2 py-1">Opdater Point</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sejlbode.map((sejlbode) => (
              <tr key={sejlbode.id}>
                <td className="px-2 py-1">{sejlbode.name}</td>
                <td className="px-2 py-1">{sejlbode.fod}</td>
                <td className="px-2 py-1">{sejlbode.bodType}</td>
                <td className="px-2 py-1">
                  <button
                    onClick={() => this.handleDelete(sejlbode.id)}
                    className="bg-red-500 text-white hover:bg-red-600 py-1 px-2 rounded-sm focus:outline-none"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleUpdate(sejlbode)}
                    className="bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded-sm focus:outline-none ml-2"
                  >
                    Update
                  </button>
                </td>
                <td className="px-2 py-1">
                  <input
                    type="number"
                    value={sejlbode.points || ""}
                    onChange={(e) =>
                      this.handlePointsChange(sejlbode.id, e.target.value)
                    }
                    className="border border-gray-300 w-16 px-2 py-1 rounded-sm focus:outline-none focus:border-blue-500"
                  />
                </td>
                <td className="px-2 py-1">
                  <button
                    onClick={() => this.handleUpdatePoints(sejlbode.id)}
                    className="bg-green-500 text-white hover:bg-green-600 py-1 px-2 rounded-sm focus:outline-none"
                  >
                    Opdater Point
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
    );
  }
}

export default GetSejlbode;
