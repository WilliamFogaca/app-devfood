import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <Link to={'/receita/' + props.recipeId}>
      <div className="card-receita">
        <div className="img-area">
          <img src={props.categoryImg} alt="" />
          <div className="card-category">
            <span>{props.categoryName}</span>
          </div>
        </div>
        <div className="text-area">
          <h3 className="card-title">{props.title}</h3>
          <div className="card-description">
            <p>{props.description}</p>
          </div>
          <div className="link-to-receita">
            <span>Ver receita</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 