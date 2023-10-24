import React, { useEffect, useState } from 'react';
import {  getPostDetails } from '../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../components';
import { useParams } from 'react-router-dom';

const PostDetails = ({ post }) => {
  const { slug } = useParams();
  const [postDetails, setPostDetails] = useState(); // Initialize with null
  // const [posts, setPosts] = useState(); // Initialize with null

  useEffect(() => {
    // Fetch post details using your getPostDetails function
    const fetchPostDetails = async () => {
      try {
        const details = await getPostDetails(slug);
        setPostDetails(details);
        console.log('Fetched post details:', details);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    // Fetch posts using your getPosts function
    // const fetchPosts = async () => {
    //   try {
    //     const fetchedPosts = await getSimilarPosts();
    //     setPosts(fetchedPosts);
    //     console.log('Fetched posts:', fetchedPosts);
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // };

    fetchPostDetails();
    // fetchPosts();
  }, [slug]);

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8 '>
          
          <PostDetail post={postDetails} />
          <Author author={postDetails?.author} />
          <CommentsForm slug={postDetails?.slug} />
          {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
          <Comments slug={postDetails?.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            {/* Access categories from the individual post */}
            <PostWidget categories={postDetails?.categories} slug={postDetails?.slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
