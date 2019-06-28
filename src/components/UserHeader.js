import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import UserHeaderJsx from '../templates/UserHeader';

class UserHeader extends Component {
  componentDidMount() {
    // this.props.fetchUser(this.props.userId);
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return UserHeaderJsx({ user });
  }
}

UserHeader.defaultProps = {
  user: null,
};

UserHeader.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(user => user.id === ownProps.userId),
});

const mapDispatchToProps = {
  fetchUser,
};

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
const connectedUserHeader = connectComponent(UserHeader);

export default connectedUserHeader;
