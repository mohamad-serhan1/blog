import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { getRecentPosts } from '../services'
import { getSimilarPosts } from '../services'

const PostWidget = ({categories, slug}) => {  //we must pass these two to make sure  it will differ from one page to anonther
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }


    }, [slug])
    

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8 '>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>

                {slug ? "Related Posts" : "Recent Posts"}
                </h3>
                {relatedPosts.map((post) => (
                    <div key={post.title} className=' flex items-center w-full mb-4'>
                        <div className='w-16 flex-none'>
                            <img
                                className='align-middle rounded-full'
                                src={post.featuredImage && post.featuredImage.url}
                                alt={post.title}
                                height="60px"
                                width="60px" />
                        </div>
                        <div className='flex-grow ml-4'>
                        <p className='text-gray-500 text-xs'>
                            {moment(post.createdAt).format('MMM DD,YYYY')}
                        </p>
                        <Link to={`/post/${post.slug}`} className='' >
                            {post.title}
                        </Link>

                        </div>
                    </div>
                ))}
          

        </div>
    )
}

export default PostWidget