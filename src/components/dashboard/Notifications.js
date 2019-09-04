import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function Notifications(props) {
    const { notifications } = props;
    return (
        <div className="section">
            <div className="card z-dept-0">
                <div className="card-content">
                    <span className="card-title">Notifications
                        <ul className="notifications">
                            { notifications && notifications.map(item => {
                                return (
                                    <li key={item.id}>
                                        <span className='pink-text'>{item.user}</span>
                                        {item.projectId ?
                                            (<Link to={ '/project/' + item.projectId } key={ item.projectId }>
                                            <span> {item.content}</span>
                                            </Link>) : (<Link to={ '/user/' + item.userId } key={ item.userId }>
                                            <span> {item.content}</span>
                                            </Link>)
                                        }
                                        <div className="grey-text note-date">{moment(item.time.toDate()).fromNow()}</div>
                                    </li>
                                )
                                })
                            }
                        </ul>
                    </span>
                </div>
            </div>
        </div>
    )
}
