import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPostsAndUsersAction } from '../actions';
// import { fetchPosts } from '../actions';
import PostListJsx from '../templates/PostList';

class PostList extends Component {
  componentDidMount() {
    // this.props.fetchPosts();
    const { fetchPostsAndUsers } = this.props;

    fetchPostsAndUsers();
  }

  render() {
    const { posts } = this.props;

    return PostListJsx({ posts });
  }
}

PostList.defaultProps = {
  posts: [],
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  fetchPostsAndUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  // fetchPosts,
  fetchPostsAndUsers: fetchPostsAndUsersAction,
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
const connectedPostList = connectComponent(PostList);
export default connectedPostList;
