import React, { useEffect, useState, useRef } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { getCategories, upload } from '../services';

const CreatePost = () => {
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categories, setCategories] = useState([]);
  const [imageFileName, setImageFileName] = useState('');
  const [imageHandle, setImageHandle] = useState('');
  const [fileId, setFileId] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload status
  const [submitting, setSubmitting] = useState(false); // Track submit status
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTYwNjgxNzMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xuMDJ6am0wMDdkYjAxdWdmdDhxMG8zcS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTc5Y2NmNjktOTY5My00YzVjLWExODgtYThhNDdjNjQ2Nzk4IiwianRpIjoiY2xuNXY3NmF5OW9rZDAxdGU1ZzV1OWJzMyJ9.l47nv_EnwfgzrOoi3BSGec21J7tWlX8ZpTDcx9jYBzW5x-JdmJn76AZOR9eIu9t-ZCG0WiJHwYNhKlvulU_bqa0w8UBXUREIMHPtdbazTPuXrbQ6fgN-6u_4dusAPcJvDqZBUMx-SmLTyc9-98sff1cqtfk8HAGe33ZCGlgIKKBXSsZnAhxZPY3AOL4NDqkmvPKnH9U77VLyZgk1PyHxYLOtzpr-R5fleHRE6GBZYrC41pH8L9tLjL5jSEwhup81CFTIdoUmpNV1-iaWbg7VYkiANw5ZNFmz9wv3VB2W0yrMN1hfjAxwCnLwMFwBH7OX_WtZhijd9HhOBJGfkjsTf8LSP1SO5L7CtE5wbWOpSllTaIE-ILfa7cWcn_Lgi7G2C8d3pS18C9svnF0RtXaDdRQ5K_OGLYtyPIMgEPkK_envIi841m8T-ejuM8m6dE5WqAHy-mDfSSTYMCJEN6h3dzgccTZddvic4Hfzw4-y9AeGLfTdnd6Qn9Lt-dqbTqB1fcbWV1X4XJimIJSfSp9pc4RWq4-_nAR9lzLgAZxbGpBeaS72fBiquA_4uErcYVV5otwhxXDM70HnJXze52K6-oqSAs9EiRugj_OjA3ebabH4aMFwX2eap-Lu6ROHRXfSb07n4qTERaNPNgaVCVhgclCg7UhYD3pj-vIPEx1_NXw'; // Replace with your actual token

  useEffect(() => {
    getCategories().then((categ) => setCategories(categ));
  }, []);

  const handleFileUpload = async () => {
    try {
      setUploading(true); // Start upload, set uploading to true
      const uploadedFileData = await upload();
      const id = uploadedFileData.id;

      console.log('File uploaded successfully');
      console.log('id:' + id);
      setFileId(id);
      ;
      setUploading(false); // Upload complete, set uploading to false
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false); // Upload failed, set uploading to false
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const slugifyTitle = newTitle.toLowerCase().replace(/\s+/g, '-');
    setSlug(slugifyTitle);
  };

  const profilePicElm = useRef();
  const titleElm = useRef();
  const excerptElm = useRef();
  const contentElm = useRef();
  const categoryElm = useRef();

  const handleImage1Change = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage1(imageUrl);

      const fileName = file.name;
      const handle = `image-${Date.now()}`;

      setImageFileName(fileName);
      setImageHandle(handle);
    }
  };

  const handleSubmit = async () => {
    setError(false);

    const { value: title } = titleElm.current;
    const { value: excerpt } = excerptElm.current;
    const { value: content } = contentElm.current;
    const { value: name } = categoryElm.current;

    if (!title || !excerpt) {
      setError(true);
      return;
    }

    const handle = `image-${Date.now()}-${imageFileName}`;

    const featuredImage = {
      create: {
        fileName: imageFileName,
        handle: imageHandle,
      },
    };

    const contentStructure = {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: content,
            },
          ],
        },
      ],
    };

    const variables = {
      title,
      excerpt,
      content: contentStructure,
      slug,
      name,
      id: fileId,
    };

    setSubmitting(true); // Start submission, set submitting to true

    const graphqlAPI =
      'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cln02zjm007db01ugft8q0o3q/master';
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const mutation = gql`
      mutation MyMutation(
        $slug: String = ""
        $title: String = ""
        $excerpt: String = ""
        $name: String = ""
        $content: RichTextAST = ""
        $id: ID = ""
      ) {
        createPost(
          data: {
            title: $title
            slug: $slug
            excerpt: $excerpt
            content: $content
            featuredImage: { connect: { id: $id } }
            categories: { connect: { name: $name } }
          }
        ) {
          id
          content {
            raw
          }
          featuredImage {
            url
          }
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
      setSubmitting(false); // Submission complete, set submitting to false
    } catch (error) {
      console.error(error);
      setSubmitting(false); // Submission failed, set submitting to false
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h1 className='text-xl mb-8 font-semibold border-b pb-4 pt-8'>Post Information</h1>
      <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
        <div className='col-start-1'>
          <select
            className='bg-gray-200 p-2 px-4 outline-none w-1/2 rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
            name='category'
            ref={categoryElm}
          >
            <option value=''>Select a Category*</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col-start-2'>
          <label className='inline-block text-gray-700 text-sm font-bold border-b-2'>Slug :</label>
        </div>
        <input
          ref={titleElm}
          className='bg-gray-200 p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
          placeholder='Title*'
          name='title'
          onChange={handleTitleChange}
        />
        <input type='text' placeholder='Slug' value={slug} readOnly />
        <input
          ref={excerptElm}
          className='bg-gray-200 p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
          placeholder='Excerpt* (Short Description of the Post)'
          name='excerpt'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={contentElm}
          className='p-4 bg-gray-200 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-700'
          placeholder='Content*'
          name='content'
        />
      </div>
      <div className='relative mb-4 rounded-lg'>
        <label className='block text-gray-700 text-sm font-bold'>Choose a featured Image :</label>
        <input
          ref={profilePicElm}
          type='file'
          id='fileUpload'
          name='fileUpload'
          className='absolute opacity-0 top-0 left-0 w-1/2 h-full cursor-pointer'
          onChange={handleImage1Change}
        />
        <label
          htmlFor='fileUpload'
          className='block w-1/2 h-full p-4 text-center bg-gray-200 hover:bg-gray-500 cursor-pointer rounded-lg'
        >
          Select Image*
        </label>
      </div>
      {selectedImage1 && (
          <div className='flex gap-16'>
          <h2>Selected Picture:</h2>
          <img src={selectedImage1} alt='Selected' className='max-w-xs mt-2 pb-4' />
          <div className='self-center'>
            {uploading ? (<label htmlFor='uploading' className='text-xs text-gray-700'>Uploading... Please wait.</label>):
            (<button
              type='button'
              name='uploading'
              id='uploading'
              onClick={handleFileUpload}
              className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-500 rounded-full text-white px-10 p-3 cursor-pointer'
            >
              Upload File
            </button>)}
          </div>
        </div>
      )}
      {error && <p className='text-xs text-red-500'>All fields with(*) required</p>}
      <div className='flex justify-center'>
        {submitting ? (
          <p className='text-xs text-gray-700'>Submitting... Please wait.</p>
        ) : (
          <button
            type='button'
            onClick={handleSubmit}
            className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-700 rounded-full text-white px-10 p-3 cursor-pointer'
          >
            Submit
          </button>
        )}
      </div>
      {showSuccessMessage && (
        <span className='text-xl float-right font-semibold mt-3 text-green-500'>Post submitted for review</span>
      )}
    </div>
  );
};

export default CreatePost;
