import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';
import { useParams } from 'react-router-dom'; // Import useParams

const Comments = () => {
  const { slug } = useParams(); // Get the slug parameter from the URL
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [commentsToShow, setCommentsToShow] = useState(2); // Number of comments to show initially
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getComments(slug)
      .then((result) => setComments(result));
  }, [slug]);




  useEffect(() => {
    // Fetch comments when the component mounts or the slug changes
    fetchComments();
  }, [slug]);

  useEffect(() => {
    // Update the displayed comments when comments or commentsToShow change
    setDisplayedComments(comments.slice(0, commentsToShow));
  }, [comments, commentsToShow]);

  const fetchComments = () => {
    setLoadingMore(true); // Set loading state
    // Fetch comments with a limit
    getComments(slug, commentsToShow)
      .then((result) => {
        setComments(result);
        setLoadingMore(false); // Reset loading state
      });
  };

  const loadMoreComments = () => {
    // Increase the number of comments to show
    setCommentsToShow(commentsToShow + 2); // You can adjust the increment as needed
  };

  return (
    <div>
      {displayedComments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length} Comments
          </h3>
          {displayedComments.map((comment) => (
            <div className='border-b border-gray-100 mb-4 pb-4' key={comment.createdAt}>
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className='whitespace-pre-line text-gray-600 w-full'>
                {parse(comment.comment)}
              </p>
            </div>
          ))}
          {/* Load more button */}
          {commentsToShow < comments.length && (
            <div className="text-center">
              {loadingMore ? (
                <p>Loading more comments...</p>
              ) : (
                <button
                  className="text-gray-600 hover:underline"
                  onClick={loadMoreComments}
                >
                 More Comments
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
