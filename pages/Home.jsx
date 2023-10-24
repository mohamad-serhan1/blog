import React, { useEffect, useState } from 'react';
import { Categories, PostCard, PostWidget } from '../components';
import { getPosts } from '../services';

  export default function Home() {
    const [posts, setPosts] = useState([]); // Initialize with an empty array

    useEffect(() => {
      // Fetch data using your getPosts function
      const fetchPosts = async () => {
        try {
          const posts = await getPosts();
          setPosts(posts);
          console.log('Fetched data:', posts); // Log the fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchPosts();
    }, []); // The empty dependency array means this effect runs once when the component mounts

  return (
    <div className="container mx-auto px-10 mb-8 h-[1000px]">
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
        </div>

        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
