import React, { useContext } from "react";
import { Context } from "../../context/Context";
import SelectTable from "../selectTable/SelectTable";
import "./SelectTables.styles.scss";

const SelectTables = (props) => {
  const {
    selectedSourceTables,
    inputFilterValue,
    handleTableClick,
    nextButtonDisabled,
    handleNextButtonClick,
    handleFilterChange,
  } = useContext(Context);

  let sourceName = props.match.params.source;
  return (
    <div className="selectTables-container">
      <div className="selectTables-heading">
        <h1>
          <span className="back-button" onClick={() => props.history.goBack()}>
            &#8592;
          </span>
          Select Table
        </h1>
        <p>
          <strong>{sourceName}</strong> has the following tables ready for
          import. Please select the table you would like to import
        </p>
      </div>
      <div className="filter-table-input">
        <input
          type="text"
          placeholder="Filter"
          onChange={handleFilterChange}
          value={inputFilterValue}
        />
      </div>
      <div className="selectTables-table">
        {selectedSourceTables.map((table) => {
          return (
            <SelectTable
              title={table.title}
              id={table.id}
              key={table.id}
              handleTableClick={handleTableClick}
            />
          );
        })}
      </div>
      <button
        className="button-next"
        onClick={handleNextButtonClick}
        disabled={nextButtonDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default SelectTables;
