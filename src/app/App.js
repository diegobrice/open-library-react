import React, { Component } from "react";
import Heading from "./Heading";
import Row from "./Row";
import { format } from "timeago.js";

class Headings extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.headings.map((head, index) => {
            return <Heading key={index} heading={head} />;
          })}
        </tr>
      </thead>
    );
  }
}

class Rows extends Component {
  render() {
    return (
      <tbody>
        {this.props.data.map((row, index) => {
          return <Row key={index} row={row} />;
        })}
      </tbody>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(
      "http://openlibrary.org/recentchanges.json?limit=10"
    );
    const data = await response.json();
    const formatData = this.formatData(data);
    this.setState({ data: formatData });
  }

  formatData(data) {
    return data.map((d, index) => {
      return {
        when: format(d.timestamp),
        who: d.author.key,
        description: d.comment,
      };
    });
  }

  render() {
    return (
      <div className="container p-4">
        <h1>{this.props.title}</h1>
        <table className="table table-bordered table-striped">
          <Headings headings={this.props.headings} />
          <Rows data={this.state.data} />
        </table>
      </div>
    );
  }
}

export default App;
