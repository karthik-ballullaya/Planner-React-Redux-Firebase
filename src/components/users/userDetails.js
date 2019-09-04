import React from 'react'
import moment from 'moment'


export default function UserDetails({ profile }) {
    console.log(profile)
    if (profile) {
        return (
            <div className='conatiner white'>
                <div className="card z-depth-0">
                    <span className='card-title'>{ profile.firstName }  { profile.lastName }</span>
                    <div className='card-content'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum velit harum hic, blanditiis excepturi veniam voluptatem cumque dolor soluta tenetur, nostrum magni libero possimus, sunt voluptas aspernatur. Rerum, expedita, accusantium?</p>
                    </div>
                    <div className='card -action grey lighten-4 grey-text'>
                        <div>Joined Planner on {moment(profile.joinedOn.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='container center'>
                
            </div>
        )
    }
}

