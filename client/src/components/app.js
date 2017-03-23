import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="app"> 
              {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default connect()(App);
