import React from 'react'

function Movie(props) {
    return (
        <div className="card">
           <div className="card__img-container">
                <img src={props.src} alt={props.title + "Poster"} className="card__img"/>
           </div>
           <div className="card__content">
               <h3 className="title">{props.title}</h3>
               <p className="release-date"><span>Release Date : </span>{props.releaseDate}</p>
               <p className="ratings"><span>Ratings : </span>{props.rating}</p>
               <p className="desc">{props.desc}</p>
           </div>
        </div>
    )
}

export default Movie
