import React from 'react';


const post = ({title, identifier, createdOn, image, fullImage, author, comments, postStatus, markAsRead, deleteElement, post}) => {
    return(


<div className="post" onClick={markAsRead} >
<div className={postStatus ? 'blueCircle' : ''}></div>


    <div className="postSubcontainer">

    <a href={fullImage} target="_blank" rel="noreferrer"><img src={image} alt=""/></a>
    <div className="rightContainer">
    <h5>{title}</h5>
    
    <p><strong>Author: </strong> {author}</p>
    <p><strong>Created on:</strong> {createdOn}</p>
    <p><strong>Comments:</strong> {comments}</p>
    {/* <p>ID: {identifier}</p>*/
    <p onClick={deleteElement}>delete element</p> }
    </div>
    

    </div>
    
</div>
        

    )
    
}

export default post;