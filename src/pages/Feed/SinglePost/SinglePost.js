import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../../../components/Image/Image';
import './SinglePost.css';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('http://localhost:8080/feed/post/' + postId);
        if (response.status !== 200) {
          throw new Error('Failed to fetch post');
        }
        const resData = await response.json();
        console.log(resData);
        setPost({
          title: resData.post.title,
          author: resData.post.creator.name,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          // image: resData.post.imageUrl,
          image: 'http://localhost:8080/' + resData.post.imageUrl,
          content: resData.post.content
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPost();
  }, [postId]);
  return (
    <section className="single-post">
      <h1>{post.title}</h1>
      <h2>
        Created by {post.author} on {post.date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={post.image} />
      </div>
      <p>{post.content}</p>
    </section>
  );
};

export default SinglePost;
