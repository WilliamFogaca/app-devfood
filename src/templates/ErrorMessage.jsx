
import React from 'react';

export default (props) => {
  return (
    <div className="message-result-area error active">
      <span>{props.message}</span>
    </div>
  )
}