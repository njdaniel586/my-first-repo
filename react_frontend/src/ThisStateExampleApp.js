import React, { Component } from 'react';

class ThisStateExampleApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHungry: true,
      topping: "Pepperoni",
      slices: 8
    }
    //this.eatSlice = this.eatSlice.bind(this); // This is not needed if the arrow function is used below.
  }

  eatSlice=(props) =>{
    const sliceChange = props.numSlices;
    const name = props.name;
    const totalSlices = this.state.slices - sliceChange;
     console.log("numSlices: ", props);
     console.log("name: ", name);
    this.setState({
      slices: totalSlices
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => {this.eatSlice({numSlices:2, name:"ben"})}}> {/* his.eatSlice = this.eatSlice.bind(this); is not needed if an arrow function is used here */}
          eatSlice
        </button>
        slices left: {this.state.slices}
      </div>
    )
  }
}

export default ThisStateExampleApp;