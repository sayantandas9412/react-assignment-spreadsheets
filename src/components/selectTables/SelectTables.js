import React, { useContext } from "react";
import { Context } from "../../context/Context";
import SelectTable from "../selectTable/SelectTable";
import "./SelectTables.styles.scss";

const SelectTables = (props) => {
  const {
    sources,
    inputFilterValue,
    handleTableClick,
    nextButtonDisabled,
    handleNextButtonClick,
    handleFilterChange,
  } = useContext(Context);

  let sourceName = props.match.params.source;
  const nestedSourcesCopy = JSON.parse(JSON.stringify(sources));

  let selectedSourceTables = nestedSourcesCopy.find(
    (source) => source.name === sourceName
  ).tables;

  let updatedTables = selectedSourceTables.map((table) => {
    let title = table.title;
    if (table.title.includes("||")) {
      let index = table.title.indexOf("|");
      title = table.title.slice(0, index);
    }

    return { title, id: table.id };
  });

  let tablesMap = new Map();

  let uniqueTables = updatedTables.filter((table) => {
    const title = tablesMap.get(table.title);
    if (title) {
      if (table.title === title) {
        tablesMap.delete(table.title);
        tablesMap.set(table.title, table.id);
        return true;
      } else {
        return false;
      }
    }
    tablesMap.set(table.title, table.id);
    return true;
  });

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
        {uniqueTables.map((table) => {
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
