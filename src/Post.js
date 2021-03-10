import React,{useState} from 'react';


const Post = ({title, id, createdOn, image, fullImage, author, comments, deleteElement}) => {
    
    const [isRead, setRead] = useState(true);
    
    const markAsRead = () => {
        setRead(false)
      }

    return(


<div className="post" onClick={markAsRead} >
<div className={isRead ? 'blueCircle' : ''}></div>


    <div className="postSubcontainer">

    <a href={fullImage} target="_blank" rel="noreferrer"><img src={image} alt=""/></a>
    <div className="rightContainer">
    <h5>{title}</h5>
    
    <p><strong>Author: </strong> {author}</p>
    <p><strong>Created on:</strong> {createdOn}</p>
    <p><strong>Comments:</strong> {comments}</p>
    {/* <p>ID: {id}</p> */}
    <p onClick={() => deleteElement(id)}>delete element</p>
    </div>
    

    </div>
    
</div>
        

    )
    
}

export default Post;