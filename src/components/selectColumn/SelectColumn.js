import React from "react";
import { withRouter } from "react-router-dom";
import "./SelectColumn.styles.scss";

const SelectColumn = ({ columnsArray, history }) => {
  return (
    <div className="selectColumn-container">
      <span className="back-button" onClick={() => history.goBack()}>
        &#8592;
      </span>
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
export default withRouter(SelectColumn);
