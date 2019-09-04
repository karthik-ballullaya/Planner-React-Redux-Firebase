const initState = {
    updateErr: '',
    projects: []
}

const projectReducer = (state = initState, action) => {
    switch(action.type){
        case "CREATE_PROJECT":
            console.log('created project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('Create project error', action.err);
            return state;
        case 'DELETE_PROJECT':
            console.log('Deleted project', action.project);
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('Delete project error', action.err);
            return state;
        case 'UPDATE_PROJECT':
            console.log('Project updated');
            return {
                ...state,
                updateErr: ''
            }
        case 'UPDATE_PROJECT_ERROR':
            console.log('project update error', action.err);
            return {
                ...state,
                updateErr: action.err
            }
        default:
            return state;
    }
}

export default projectReducer