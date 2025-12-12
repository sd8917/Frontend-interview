import React from "react";

function Child({ onClick }: any) {
  console.log("Child rendered ❌");

  return <button onClick={onClick}>Child Button</button>;
}

export default React.memo(Child);
