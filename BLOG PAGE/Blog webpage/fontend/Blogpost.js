import React from 'react';

const BlogPost = ({ title, content }) => {
  return (
    <article className="blog-post">
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
};

export default BlogPost;
