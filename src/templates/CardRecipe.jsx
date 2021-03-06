import React from 'react';
import { Link } from 'react-router-dom';
import { generatePath } from "react-router";

/* Helpers */
import { trimWords } from '../helpers';

/* Routes URLs */
import { singleRecipeRoute } from '../routes/Routes';

const CardRecipe = (props) => {
  return (
    <Link to={generatePath(singleRecipeRoute, { id: props.recipeId })} title={props.title}>
      <div className="card-receita">
        <div className="img-area">
          <img src={props.categoryImg} alt="" />
          <div className="card-category">
            <span>{props.categoryName}</span>
          </div>
        </div>
        <div className="text-area">
          <h3 className="card-title">{trimWords(props.title, 50)}</h3>
          <div className="card-description">
            <p>{trimWords(props.description, 100)}</p>
          </div>
        </div>
        <div className="card-recipe-footer">
          <div className="link-to-receita">
            <span>Ver receita</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 

export default CardRecipe;