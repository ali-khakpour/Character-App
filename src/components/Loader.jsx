import React from "react";

function Loader() {
  return (
    <div>
      <p>please wait</p>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
