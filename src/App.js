import React,{useState, useEffect} from 'react';
import moment from 'moment'
import Post from './Post'
import DetailView from './DetailView'
import './App.css'

function App(){

  //calling API and setting posts array/state
  const redditTopJSON = 'https://www.reddit.com/top.json?limit=10';
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState([]);


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
    setSelectedPost([])
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
    if(selectedPost[0].data.id === id){
      setSelectedPost([])
    }
   
  }

  //function to select post and display in detail view
  const viewDetailView = (id) => {
    let filterPosts = posts.filter(el => el.data.id === id);
    setSelectedPost(filterPosts);
    localStorage.setItem('selectedPost', JSON.stringify(filterPosts));
  }


  //calling get API function
  useEffect(() => {
    if(localStorage.getItem('selectedPost') != null){
      setSelectedPost(JSON.parse(localStorage.getItem('selectedPost')))
    }
    getAPI(redditTopJSON);
  },[]);



  return (
    <div className="app">


{/* <svg aria-hidden="true" data-prefix="fas" data-icon="kiwi-bird" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-kiwi-bird fa-w-18 fa-2x" data-fa-i2svg>
  <path fill="currentColor" d="M575.81 217.98C572.64 157.41 518.28 112 457.63 112h-9.37c-52.82 0-104.25-16.25-147.74-46.24-41.99-28.96-96.04-41.62-153.21-28.7C129.3 41.12-.08 78.24 0 224c.04 70.95 38.68 132.8 95.99 166.01V464c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-54.26c15.36 3.96 31.4 6.26 48 6.26 5.44 0 10.68-.73 16-1.18V464c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-59.43c14.24-5.06 27.88-11.39 40.34-19.51C342.07 355.25 393.86 336 448.46 336c25.48 0 16.01-.31 23.05-.78l74.41 136.44c2.86 5.23 8.3 8.34 14.05 8.34 1.31 0 2.64-.16 3.95-.5 7.09-1.8 12.05-8.19 12.05-15.5 0 0 .14-240.24-.16-246.02zM463.97 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm80 153.25l-39.86-73.08c15.12-5.83 28.73-14.6 39.86-25.98v99.06z" class=""></path>
</svg> */}
<div>
  <header>Reddit Top Posts</header>
  <i class="fab fa-reddit-alien"></i>
</div>


<div className="postContainer">
<div className="postsList">


<div className="scroll">
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
  viewDetailView={viewDetailView}
  post={post}
  />
))}
</div>
  

  </div>
  


  {selectedPost.length === 0 ? '' : <DetailView 
title={selectedPost[0].data.title}
id={selectedPost[0].data.id}
author={selectedPost[0].data.author}
createdOn={moment.unix(selectedPost[0].data.created_utc).fromNow()} 
image={selectedPost[0].data.preview.images[0].resolutions[2].url}
fullImage={selectedPost[0].data.url_overridden_by_dest}
comments={selectedPost[0].data.num_comments}
/>}

</div>

<button className="button" onClick={loadMore}>Load more</button>
<button className="button" onClick={dismissAll}>Dismiss all</button>


    </div>
  )
}

export default App;