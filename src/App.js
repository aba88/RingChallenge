import React,{useState, useEffect} from 'react';
import moment from 'moment'
import Post from './Post'
import './App.css'

function App(){

  //calling API and setting posts array/state
  const redditTopJSON = 'https://www.reddit.com/top.json?limit=2';
  const [posts, setPosts] = useState([]);

  //function to load more posts based on last post id in array
  const loadMore = () => {
    let moreURL;
    if(posts.length > 0){
      moreURL = `${redditTopJSON}&after=${posts[posts.length-1].data.name}`
    }else{
      moreURL = redditTopJSON;
    }
    
    getAPI(moreURL);
  }

   //function to dismiss all posts
   const dismissAll = () => {
    setPosts([]);
    let load = 'Load more' 
  }
    

  //fetching API and combining current + new posts arrays
  const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const children = await data.data.children
  // setPosts(children)
  setPosts((prevState)=>[...prevState,...children])
  }
  
  
  //function to delete post -- takes clicked post id and filters it out of array
  const deleteElement = (id) => {
    let filterPosts = posts.filter(el => el.data.id !== id);
    setPosts(filterPosts);
    
  }


  //calling get API function
  useEffect(() => {
    getAPI(redditTopJSON);
  },[]);



  return (
    <div className="app">


<div>
  <header>Reddit Top Posts</header>
</div>


{posts.map(post => (
  <Post  
  title={post.data.title}
  id={post.data.id}
  key={post.data.id}
  author={post.data.author}
  createdOn={moment.unix(post.data.created_utc).fromNow()} 
  image={post.data.thumbnail}
  fullImage={post.data.url_overridden_by_dest}
  comments={post.data.num_comments}
  deleteElement={deleteElement}
  post={post}
  />
))}
  


<button className="button" onClick={loadMore}>Load more</button>
<button className="button" onClick={dismissAll}>Dismiss all</button>

    </div>
  )
}

export default App;