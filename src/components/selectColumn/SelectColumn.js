import React from "react";
import "./SelectColumn.styles.scss";

const SelectColumn = ({ columnsArray }) => {
  return (
    <div className="selectColumn-container">
      <ul>
        {columnsArray.map((column, index) => (
          <li className="column-items" key={index}>
            {column.subtitle}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SelectColumn;
