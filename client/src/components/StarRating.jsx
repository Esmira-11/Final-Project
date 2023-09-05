import React from 'react';

const StarRating = ({ rating }) => {
  const maxRating = 5; 
  const fullStars = Math.floor(rating); 
  const halfStars = Math.ceil(rating - fullStars); 

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} style={{color:'#FAB319'}} className="fas fa-star"></i>);
  }
  if (halfStars === 1) {
    stars.push(<i key="half" style={{color:'#FAB319'}} className="fas fa-star-half-alt"></i>);
  }
  const emptyStars = maxRating - (fullStars + halfStars);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} style={{color:'#FAB319'}} className="far fa-star"></i>);
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;