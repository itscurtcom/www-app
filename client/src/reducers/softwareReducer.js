import {
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
} from '../actions/softwareActions';

export default function(state = { projects: {}, }, action)  {
  switch (action.type) {
    case FETCH_DOWNLOAD_COUNT_REQUEST:
    case FETCH_DOWNLOAD_COUNT_SUCCESS: {
      const projects = { ...state.projects, };
      projects[action.project.id] = action.project;
      return Object.assign({}, state, { projects, });
    }
    default: {
      return state;
    }
  }
}
