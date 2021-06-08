import React from 'react'

const Card = ({photoItem, index}) => {
  const {regular} = photoItem.urls;

  return (
    <div id={`card-${index}`} className="card">
      <img src={regular} alt="" className="image"/>
    </div>
  )
}

export default Card;