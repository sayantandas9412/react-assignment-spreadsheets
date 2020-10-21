import React from "react";
import "./SelectTable.styles.scss";

const SelectTable = ({ title, handleTableClick, id }) => {
  return (
    <fieldset className="fieldset-table">
      <input
        type="radio"
        className="table-option-radio"
        name="table"
        value={title}
        onClick={handleTableClick}
        id={id}
      />
      <label className="table-option-label">{title}</label>
    </fieldset>
  );
};
export default SelectTable;
