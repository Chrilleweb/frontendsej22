import React, { Component } from "react";
import Sejlbode from "./SejlbodsService";
import CreateSejlbode from "./CreateSejlbode";
import GetSejlbode from "./GetSejlbode";

class ListSejlbodeComponent extends Component {
  refreshSejlbodeList = () => {
    this.getSejlbodeComponent.fetchAndDisplaySejlbode();
  };

  render() {
    return (
      <div>
        <CreateSejlbode onSejlbodeUpdated={this.refreshSejlbode} />
        <GetSejlbode
          ref={(component) => (this.getSejlbodeComponent = component)}
        />
      </div>
    );
  }
}

export default ListSejlbodeComponent;
