import React from 'react';

import { useHistory } from "react-router-dom";

export default props => {
  let history = useHistory();
  let backLink = '';
  if(props.backLink) {
    backLink = <div className="back-link">
      <a href="#" onClick={() => history.goBack()}>&#8592; Voltar</a>
    </div>;
  }
  return (
    <div className="page-title">
      <div className="container">
        {backLink}
        <h2>{props.title}</h2>
      </div>
    </div>
  )
}