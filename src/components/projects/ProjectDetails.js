import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from "moment";
import { deleteProject, updateProject } from '../../store/actions/projectActions';

class ProjectDetails extends Component{

    state = {
        editEnable: false,
        project: {
            id: this.props.id,
            title: '',
            content: ''
        }
    }

    handleClick = (e) => {
        switch(e.target.id){
            case 'REMOVE':
                this.props.deleteProject(this.state.project.id);
                this.props.history.push('/');
                break;
            case 'EDIT':
                console.log('Editing project');
                this.setState({
                    editEnable: true
                });
                break;
            case 'DISCARD':
                this.setState({
                    editEnable: false
                })
                break;
            default:
                console.log('Lol');
        }
    }

    handleChange = (e) => {
        let cloneState = {...this.state};
        cloneState.project[e.target.id] = e.target.value;
        this.setState(cloneState);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateProject(this.state.project);
        this.setState({
            editEnable: false
        })
    }

    render() {
        const { project, auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        if (project) {
            return(
                <div className="container section project">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{ project.title }</span>
                            <p>{ project.content }</p>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by { project.authorFirstName } { project.authorLastName }</div>
                            <div>{moment(project.createdAt.toDate()).calendar()}</div>
                            {(profile.firstName === project.authorFirstName && profile.lastName === project.authorLastName) ? (<div className="input-field">
                                <button className="btn blue lighten-1 z-depth-0" id='EDIT' onClick={this.handleClick}>Edit</button> 
                                <button className="btn red lighten-1 z-depth-0 " id='REMOVE' onClick={this.handleClick} style={{float: 'right'}}>Remove</button>
                            </div>): null}
                        </div>
                    </div>
                    {this.state.editEnable ? (
                        <div className="container white">
                            <form onSubmit={this.handleSubmit} className="white">
                                <h5 className="grey-text text-darken-3">Edit project: {project.title}</h5>
                                <div className="input-field">
                                    <label htmlFor='title'>Title</label>
                                    <input type="text" id="title" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor='content'>Project Content</label>
                                    <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="input-field">
                                    <button type='button' className="btn grey lighten-1 z-depth-0" id='DISCARD' onClick={this.handleClick}>Discard</button>
                                    <button className="btn pink lighten-1 z-depth-0" style={{float: "right"}}>Change</button>
                                </div>
                            </form>
                            {this.props.updateError ? (
                                <div class="container center">
                                    <p>{this.props.updateError}</p>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
            )
        }
    }
}

const mapStateToProps =  (state, ownprops) => {
    const id = ownprops.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects? projects[id]: null;
    return{
        id,
        project,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        updateError: state.project.updateError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteProject: (id) => dispatch(deleteProject(id)),
        updateProject: (project) => dispatch(updateProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails)
