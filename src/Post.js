import React,{useState} from 'react';


const Post = ({title, id, createdOn, image, fullImage, author, comments, deleteElement,viewDetailView}) => {
    
    const [isRead, setRead] = useState(false);
    const [animate, setAnimation] = useState(false);

    const markAsRead = (id) => {
        setRead(true)
        viewDetailView(id)
      }

    const animateAndDelete = (id) => {
        setAnimation(true);
        setTimeout(() => {
            deleteElement(id);
        }, 1000);
        
      } 

    return(


<div className={`post ${animate ? 'box animation' : ''}`} >


    <div className={isRead ? 'readIndicator' : ''} onClick={() => markAsRead(id)}>
        <div className="postSubcontainer">
        <a href={fullImage} target="_blank" rel="noreferrer"><img src={image} alt=""/></a>
            <div className="rightContainer">
            <h5>{title}</h5>
            <p><strong>Author: </strong> {author}</p>
            <p><strong>Created on:</strong> {createdOn}</p>
            <p><strong>Comments:</strong> {comments}</p>
            {/* <p>ID: {id}</p> */}
            
            </div>
        </div>
    </div>
    <p className="deleteElement" onClick={() => animateAndDelete(id)}>Dismiss element</p>
    
    
</div>


    )
    
}

export default Post;