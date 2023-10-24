import React, { useRef, useState, useEffect } from 'react';

import { GraphQLClient, gql } from 'graphql-request'; // Import GraphQLClient and gql from graphql-request

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTYwNjgxNzMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xuMDJ6am0wMDdkYjAxdWdmdDhxMG8zcS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTc5Y2NmNjktOTY5My00YzVjLWExODgtYThhNDdjNjQ2Nzk4IiwianRpIjoiY2xuNXY3NmF5OW9rZDAxdGU1ZzV1OWJzMyJ9.l47nv_EnwfgzrOoi3BSGec21J7tWlX8ZpTDcx9jYBzW5x-JdmJn76AZOR9eIu9t-ZCG0WiJHwYNhKlvulU_bqa0w8UBXUREIMHPtdbazTPuXrbQ6fgN-6u_4dusAPcJvDqZBUMx-SmLTyc9-98sff1cqtfk8HAGe33ZCGlgIKKBXSsZnAhxZPY3AOL4NDqkmvPKnH9U77VLyZgk1PyHxYLOtzpr-R5fleHRE6GBZYrC41pH8L9tLjL5jSEwhup81CFTIdoUmpNV1-iaWbg7VYkiANw5ZNFmz9wv3VB2W0yrMN1hfjAxwCnLwMFwBH7OX_WtZhijd9HhOBJGfkjsTf8LSP1SO5L7CtE5wbWOpSllTaIE-ILfa7cWcn_Lgi7G2C8d3pS18C9svnF0RtXaDdRQ5K_OGLYtyPIMgEPkK_envIi841m8T-ejuM8m6dE5WqAHy-mDfSSTYMCJEN6h3dzgccTZddvic4Hfzw4-y9AeGLfTdnd6Qn9Lt-dqbTqB1fcbWV1X4XJimIJSfSp9pc4RWq4-_nAR9lzLgAZxbGpBeaS72fBiquA_4uErcYVV5otwhxXDM70HnJXze52K6-oqSAs9EiRugj_OjA3ebabH4aMFwX2eap-Lu6ROHRXfSb07n4qTERaNPNgaVCVhgclCg7UhYD3pj-vIPEx1_NXw';


    const commentElem = useRef();
    const nameElem = useRef();
    const emailElem = useRef();
    const storeDataElem = useRef();

    useEffect(() => {
        nameElem.current.value = window.localStorage.getItem('name');
        emailElem.current.value = window.localStorage.getItem('email');
    }, []);

    const handleComment = async () => {
        setError(false);
        const { value: comment } = commentElem.current;
        const { value: email } = emailElem.current;
        const { value: name } = nameElem.current;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const variables = {
            name,
            email,
            comment,
            slug,
        };

        // Create a GraphQL client and execute the CREATE_COMMENT mutation
        const graphqlAPI = `https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln02zjm007db01ugft8q0o3q/master`; // Replace with your GraphQL endpoint
        const graphQLClient = new GraphQLClient(graphqlAPI,{
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        const mutation = gql`
            mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
                createComment( data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) {
                    id
                }
              
            }

        `;

        try {
            const response = await graphQLClient.request(mutation, variables);
            console.log(response);

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h1 className='text-xl mb-8 font-semibold border-b pb-4'>
                Leave a Reply
            </h1>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    ref={commentElem}
                    className='p-4 bg-gray-200 outline-none w-fill rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
                    placeholder='Comment'
                    name='comment'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
                <input
                    type="text" ref={nameElem}
                    className='bg-gray-200 p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
                    placeholder='Name'
                    name='name'
                />
                <input
                    type="text" ref={emailElem}
                    className='bg-gray-200 p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
                    placeholder='Email'
                    name='email'
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input
                        ref={storeDataElem}
                        type='checkbox'
                        id='storeData'
                        name='storData'
                        value="true"
                    />
                    <label className="text-gray-500 cursor-pointer" htmlFor='storeDate'> Save e-mail and name for next time</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>All fields required</p>}
            <div className='mt-8'>
                <button
                    type='button'
                    onClick={handleComment}
                    className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-700 rounded-full text-white px-8 p-3 cursor-pointer'
                >
                    Post Comment
                </button>
                {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}

            </div>

        </div>

    )
}

export default CommentsForm