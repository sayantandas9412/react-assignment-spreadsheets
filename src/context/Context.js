import React, { Component, createContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { tokenURL, GETrequestURL } from "../constants/api-urls";
export const Context = createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
      nextButtonDisabled: true,
      sources: [],
      defaultTimeStamp: new Date().toLocaleString(),
      selectedTable: "",
      columnPresent: false,
      columnsArray: [],
      inputFilterValue: "",
      selectedSource: "",
      selectedSourceTables: [],
      unfilteredTables: [],
    };
  }

  fetchAPI = async () => {
    try {
      let tokenResponse = await axios({
        method: "post",
        url: tokenURL,
        data: {
          email: "applicant@airboxr.com",
          password: "ZUSrS5jSZDvEPTyX",
        },
      });
      let token = await tokenResponse.data;

      let APIsource = await axios({
        method: "get",
        url: GETrequestURL,
        headers: { Authorization: `Bearer ${token.accessToken}` },
      });
      let APIsourceResonse = await APIsource.data;
      let updatedSources = APIsourceResonse.map((source) => {
        return {
          ...source,
          favorite: false,
          order: source.id,
          timeStamp: this.state.defaultTimeStamp,
        };
      });

      this.setState({ sources: updatedSources });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: error.message,
      });
    }
  };

  handleFavoriteClick = (e) => {
    e.stopPropagation();
    let date = new Date();
    const nestedSourcesCopy = JSON.parse(JSON.stringify(this.state.sources));
    let updatedSources = nestedSourcesCopy.map((source) => {
      return source.id === Number(e.target.id)
        ? source.favorite
          ? {
              ...source,
              favorite: false,
              timeStamp: this.state.defaultTimeStamp,
            }
          : { ...source, favorite: true, timeStamp: date.toLocaleString() }
        : source;
    });

    const updatedArray = [...updatedSources].sort(function (a, b) {
      return new Date(b.timeStamp) - new Date(a.timeStamp);
    });

    this.setState({ sources: updatedArray });
  };

  handleTableClick = (e) => {
    this.setState({
      nextButtonDisabled: false,
      selectedTable: e.target.value,
    });
  };

  handleNextButtonClick = () => {
    const nestedSourcesCopy = JSON.parse(JSON.stringify(this.state.sources));

    const sourceTables = nestedSourcesCopy.map((source) => {
      return source.tables;
    });

    let columnPresent = false;
    sourceTables.forEach((sourceTable) => {
      sourceTable.forEach((table) => {
        if (table.title.includes("||")) {
          let title = table.title;
          let index = table.title.indexOf("|");
          title = table.title.slice(0, index);
          if (title === this.state.selectedTable) columnPresent = true;
        }
      });
    });
    let subtitle = "";
    let columnsArray = [];

    nestedSourcesCopy.forEach((source) => {
      source.tables.forEach((table) => {
        let title = table.title;
        if (table.title.includes("||")) {
          let index = table.title.indexOf("|");
          title = table.title.slice(0, index);
          if (title === this.state.selectedTable) {
            let lastIndex = table.title.lastIndexOf("|");
            subtitle = table.title.slice(lastIndex + 1);
            let subtitleObj = { title, subtitle };
            columnsArray.push(subtitleObj);
          }
        }
      });
    });

    this.setState(
      { nextButtonDisabled: true, columnsArray, columnPresent },
      () => {
        if (this.state.columnPresent) {
          this.props.history.push("/selectColumn");
        } else console.log("TODO - Go to SelectColumnsPage");
      }
    );
  };

  handleSourceClick = (e) => {
    const nestedSourcesCopy = JSON.parse(JSON.stringify(this.state.sources));
    let selectedSource = nestedSourcesCopy.filter((source) => {
      return source.id === Number(e.target.id);
    });

    let sourceName = selectedSource[0].name;

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
    this.setState({
      selectedSource: sourceName,
      selectedSourceTables: uniqueTables,
      unfilteredTables: uniqueTables,
    });

    this.props.history.push(`/selectSource/${sourceName}`);
  };

  handleFilterChange = (value) => {
    let tables = this.state.selectedSourceTables;
    this.setState({
      inputFilterValue: value,
      selectedSourceTables: value
        ? tables.filter((table) => {
            return table.title.toLowerCase().includes(value.toLowerCase());
          })
        : this.state.unfilteredTables,
    });
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          handleFavoriteClick: this.handleFavoriteClick,
          fetchAPI: this.fetchAPI,
          handleTableClick: this.handleTableClick,
          handleNextButtonClick: this.handleNextButtonClick,
          handleFilterChange: this.handleFilterChange,
          handleSourceClick: this.handleSourceClick,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default withRouter(ContextProvider);
