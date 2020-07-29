import React from "react";

const Row = ({ row }) => {
  return (
    <tr>
      <td>{row.when}</td>
      <td>{row.who}</td>
      <td>{row.description}</td>
    </tr>
  );
};

export default Row;
