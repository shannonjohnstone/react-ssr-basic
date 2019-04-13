import React, { PureComponent } from 'react';

class Home extends PureComponent {
  render() {
    return (
      <h1>Home {this.props.name}</h1>
    );
  }
}

export default Home;
