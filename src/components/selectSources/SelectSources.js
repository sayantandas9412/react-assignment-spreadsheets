import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import "./SelectSources.styles.scss";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import SelectSource from "../selectSource/SelectSource";
import { Context } from "../../context/Context";

const SelectSources = (props) => {
  const [loading, setLoading] = useState(true);

  const {
    fetchAPI,
    hasError,
    errorMessage,
    sources,
    handleFavoriteClick,
    handleSourceClick,
  } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      await fetchAPI();
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <Error errorMessage={errorMessage} />
      ) : (
        <div className="selectSources-container">
          <div className="selectSources-heading">
            <h1>
              <span
                className="back-button"
                onClick={() => props.history.push("/")}
              >
                &#8592;
              </span>
              Select Source
            </h1>
            <p>
              Below is a list of sources you have connected. Please choose the
              data source you would like to import data from{" "}
            </p>
          </div>
          <div className="selectSources-source">
            {sources.map(({ name, id, favorite, order }) => {
              return (
                <SelectSource
                  name={name}
                  key={id}
                  id={id}
                  handleFavoriteClick={handleFavoriteClick}
                  handleSourceClick={handleSourceClick}
                  favorite={favorite}
                  order={order}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(SelectSources);
