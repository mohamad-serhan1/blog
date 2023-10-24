import { GraphQLClient, request, gql } from "graphql-request";

const graphqlAPI = `https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cln02zjm007db01ugft8q0o3q/master`;
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTYwNjgxNzMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xuMDJ6am0wMDdkYjAxdWdmdDhxMG8zcS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMTc5Y2NmNjktOTY5My00YzVjLWExODgtYThhNDdjNjQ2Nzk4IiwianRpIjoiY2xuNXY3NmF5OW9rZDAxdGU1ZzV1OWJzMyJ9.l47nv_EnwfgzrOoi3BSGec21J7tWlX8ZpTDcx9jYBzW5x-JdmJn76AZOR9eIu9t-ZCG0WiJHwYNhKlvulU_bqa0w8UBXUREIMHPtdbazTPuXrbQ6fgN-6u_4dusAPcJvDqZBUMx-SmLTyc9-98sff1cqtfk8HAGe33ZCGlgIKKBXSsZnAhxZPY3AOL4NDqkmvPKnH9U77VLyZgk1PyHxYLOtzpr-R5fleHRE6GBZYrC41pH8L9tLjL5jSEwhup81CFTIdoUmpNV1-iaWbg7VYkiANw5ZNFmz9wv3VB2W0yrMN1hfjAxwCnLwMFwBH7OX_WtZhijd9HhOBJGfkjsTf8LSP1SO5L7CtE5wbWOpSllTaIE-ILfa7cWcn_Lgi7G2C8d3pS18C9svnF0RtXaDdRQ5K_OGLYtyPIMgEPkK_envIi841m8T-ejuM8m6dE5WqAHy-mDfSSTYMCJEN6h3dzgccTZddvic4Hfzw4-y9AeGLfTdnd6Qn9Lt-dqbTqB1fcbWV1X4XJimIJSfSp9pc4RWq4-_nAR9lzLgAZxbGpBeaS72fBiquA_4uErcYVV5otwhxXDM70HnJXze52K6-oqSAs9EiRugj_OjA3ebabH4aMFwX2eap-Lu6ROHRXfSb07n4qTERaNPNgaVCVhgclCg7UhYD3pj-vIPEx1_NXw';

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author{
          name
          bio
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getRecentPosts = async () => {
  //to get the recent posts
  const query = gql`
    query GetPostDetails(){
        posts(
            orderBy:createdAt_ASC               
            last:3
        ){
            title
            featuredImage{url}
            createdAt
            slug
        }
    }
    
    `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  //to get the recent posts
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }

        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug,categories  });
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories(){
        categories{
            name    
            slug
        }
    }
    
    `;
  const result = await request(graphqlAPI, query);
  return result.categories;
}


import axios from 'axios';


export const submitComment = async (obj) => {
  try {
    const response = await axios.post('/api/comments.js', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error; // Handle the error as needed
  }
};




  
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!){
      comments(where : { post :{slug: $slug } } ){
        name
        createdAt
        comment
      }
        
    }
    
    `;
  const result = await request(graphqlAPI, query,{slug});
  return result.comments;
};


export const upload = async () => {
  try {
    const input = document.getElementById('fileUpload');
    const file = input.files[0];

    const form = new FormData();

    form.append('fileUpload', file);

    const response = await fetch(`${graphqlAPI}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const data = await response.json();

    if (data) {
     
      return data; // Return the image URL
    } else {
      throw new Error('Image URL not found in the response');
    }
  } catch (error) {
    throw error; // Handle the error as needed
  }
};


export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};