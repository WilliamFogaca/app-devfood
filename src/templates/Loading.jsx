import React from 'react';

/* IMGs */
import LoadingGif from '../assets/img/loading.gif';

export default () => {
  return (
    <div className="loading-area">
      <img src={LoadingGif} alt="Carregando..."/>
      <span>Carregando...</span>
    </div>
  )
}