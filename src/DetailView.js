import React from 'react';


const DetailView = ({title, createdOn, image, fullImage, author, comments,}) => {
    image = image.replace(/&amp;/g, '&');

    return(


<div className={`detailView`}>


        <div className="postSubcontainer_detailView">
        <div className="leftContainer_detailView">
        <a href={image} target="_blank" rel="noreferrer"><img src={image} alt=""/></a>
        </div>
            
            <div className="rightContainer_detailView">
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