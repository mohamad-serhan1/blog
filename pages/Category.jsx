import React, { useState, useEffect } from 'react';
import { getCategoryPost } from '../services';
import { PostCard, Categories } from '../components';
import { useParams } from 'react-router-dom';

const CategoryPost = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Pass the 'slug' to fetch posts for the specific category
        const fetchedPosts = await getCategoryPost(slug);
        setPosts(fetchedPosts);
        console.log('Fetched posts:', fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [slug]);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;
