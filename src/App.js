import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SelectColumn from "./components/selectColumn/SelectColumn";
import SelectSources from "./components/selectSources/SelectSources";
import SelectTables from "./components/selectTables/SelectTables";
import { Context } from "./context/Context";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = Context;

  render() {
    const { columnsArray } = this.context;
    return (
      <div className="App">
        <Header {...this.props} />
        <Switch>
          <Route exact path={"/"} render={() => <Home {...this.props} />} />
          <Route
            path="/selectSource/:source"
            render={(props) => <SelectTables {...props} />}
          />
          <Route
            path="/selectSource"
            render={() => <SelectSources {...this.props} />}
          />
          <Route
            path="/selectColumn"
            render={() => (
              <SelectColumn {...this.props} columnsArray={columnsArray} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
