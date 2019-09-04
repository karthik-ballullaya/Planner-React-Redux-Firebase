import React from 'react'

export default function UserSummary({ user }) {
    return (
        <div className='card z-depth-0'>
            <div className='card-title'  id={user.id}>
                {user.firstName} {user.lastName}
            </div>
        </div>
    )
}
