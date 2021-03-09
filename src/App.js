import React,{useState, useEffect} from 'react';
import moment from 'moment'
import Post from './Post'
import './App.css'

function App(){

  const redditTopJSON = 'https://www.reddit.com/top.json?limit=50';
  const [posts, setPosts] = useState([]);
  const [isRead, setRead] = useState(true)

  const getAPI = async () => {
  const response = await fetch(redditTopJSON);
  const data = await response.json();
  const children = await data.data.children
  setPosts(children)
  console.log('---------->> ' + children[0].data.id)
  }
  
  const markAsRead = () => {
    setRead(false)
  }

  const deleteElement = () => {
    setPosts(posts.filter(el => el.data.id !== post.data.id));
  }


  useEffect(() => {
    getAPI();
  },[]);



  return (
    <div className="app">

{deleteElement}


{posts.map(post => (
  <Post 
  postStatus={isRead}
  markAsRead={markAsRead}
  title={post.data.title}
  key={post.data.id}
  author={post.data.author}
  createdOn={moment.unix(post.data.created_utc).fromNow()} 
  image={post.data.thumbnail}
  fullImage={post.data.url_overridden_by_dest}
  comments={post.data.num_comments}
  deleteElement={deleteElement}
  post={post}
  />
  
))};

    </div>
  )
}

export default App;