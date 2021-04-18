import React from "react";

function TestComponent(props) {
  return (
    <div className="group-input">
      <button className="small"><span className="fa fa-minus"></span></button>
      <input type="number" class="small"></input>
      <button className="small"><span className="fa fa-plus"></span></button>
    </div>
  );
}

export default TestComponent;
