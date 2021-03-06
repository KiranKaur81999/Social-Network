import React, {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, Loading }}) =>{

    useEffect(()=>{
        getProfiles();
    }, [getProfiles]);
    return (<Fragment>
        { Loading ? <Spinner/> : <Fragment>
        <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'>Browse and connect with developers</i>
            </p> 
        <div className='profiles'>
            { profiles && profiles.length > 0 ? (
                profiles.map(profile => (
                    <ProfileItem profile={profile} key={profile._id} />
                ))
            ): <h4>No Profiles Found</h4>}
        </div>
        </Fragment>}
    </Fragment>);
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);