import React,{useState, useEffect} from 'react';
import moment from 'moment'
import Post from './Post'
import './App.css'

function App(){

  const redditTopJSON = 'https://www.reddit.com/top.json?limit=2';
  const [posts, setPosts] = useState([]);
  // const [isRead, setRead] = useState(true);

  const loadMore = () => {
    const moreURL = `${redditTopJSON}&after=${posts[posts.length-1].data.name}`
    getAPI(moreURL);
  }


  const getAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const children = await data.data.children
  // setPosts(children)
  setPosts((prevState)=>[...prevState,...children])
  }
  
  

  const deleteElement = (id) => {
    console.log(id)
    let filterPosts = posts.filter(el => el.data.id !== id);
    setPosts(filterPosts)
  }


  useEffect(() => {
    getAPI(redditTopJSON);
  },[]);



  return (
    <div className="app">

{/* {deleteElement} */}


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

    </div>
  )
}

export default App;