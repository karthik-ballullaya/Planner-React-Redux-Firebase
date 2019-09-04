import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import UserSummary from './userSummary'
import UserDetails from './userDetails'


class UserList extends Component {

    state = {
        userId: null
    }

    findUser = (users, id) => {
        for (let i=0; i<users.length; i++){
            if(users[i]['id'] === id)
                return i;
        }return null;
    }

    handleClick = (e) => {
        const id = this.findUser(this.props.users, e.target.id);
        this.setState({
            userId: id
        })
    }

    render() {
        const { users, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className='container'>
                <div className="row">
                    <div className="col s12 m6">
                    {users && users.map(user => {
                        return(
                            <a onClick={this.handleClick} key={user.id}>
                                <UserSummary user={user} />
                            </a>
                        )
                    })}
                    </div>
                    <div className="col s12 m5 offset-m1">
                        {users ? (<UserDetails profile={users[this.state.userId]} />) : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.firestore.ordered.users)
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

export default compose(
        connect(mapStateToProps),
        firestoreConnect([
            { collection: 'users', orderBy: ['joinedOn', 'asc']}
        ])
    )(UserList)
