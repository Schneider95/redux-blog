import React from 'react';
import UserHeader from '../components/UserHeader';

const PostListJsx = (props) => {
  const { posts } = props;

  return (
    <div className="ui relaxed divided list">
      {
        posts.map(post => (
          <div className="item" key={post.id}>
            <i className="large middle aligned icon user" />
            <div className="content">
              <div className="description">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <UserHeader userId={post.userId} />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PostListJsx;
