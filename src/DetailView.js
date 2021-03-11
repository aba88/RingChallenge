import React,{useState} from 'react';


const DetailView = ({title, createdOn, image, fullImage, author, comments,}) => {
    

    return(


<div className={`post detailView`}>


        <div className="postSubcontainer">
        <a href={fullImage} target="_blank" rel="noreferrer"><img src={image} alt=""/></a>
            <div className="rightContainer">
            <h5>{title}</h5>
            <p><strong>Author: </strong> {author}</p>
            <p><strong>Created on:</strong> {createdOn}</p>
            <p><strong>Comments:</strong> {comments}</p>
           
            </div>
        </div>

    
    
</div>


    )
    
}

export default DetailView;