import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({ postId, auth, deleteComment, comment: { _id, user, name, text, avatar, date, image}})=> {
    return(
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={image ? image : avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            {!auth.Loading && user === auth.user._id && (
                <button className='btn btn-danger' onClick={e => deleteComment(postId, _id)}  type="button">
                    <i className="fas fa-times"/>
                </button>
            )}
          </div>
        </div>
    )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});


export default connect(mapStateToProps, { deleteComment })(CommentItem);