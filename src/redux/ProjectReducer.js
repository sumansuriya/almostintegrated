import axios from "axios";

const initState = {
  projectList: [],
  progress: false,
  // onClick of the update button, the key will be updated
  uref: {},
};

// ACTION TYPES
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const PROJECT_GET_ALL_ACTION_TYPE = "PROJECT_GET_ALL_ACTION_TYPE";
const PROJECT_UPDATE_RENDER_ACTION_TYPE = "PROJECT_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllProjectAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/project/view`;
    const response = await axios.get(url);

    // UI UPDATE
    dispatch({ type: "PROJECT_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createProjectAction = (payload) => {
  return async (dispatch) => {
    // Making the server call
    const url = `http://localhost:8080/api/v1/project/add`;
    await axios.post(url, payload);
    // Update the UI
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });
    // After 5 seconds PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateProjectAction = (payload) => {
  return async (dispatch) => {
    // Making the server call
    const url = `http://localhost:8080/api/v1/project/update`;
    await axios.put(url, payload);
    // Making the uref empty again
    updateRenderAction({});
    // Update the UI
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });
    // After 5 seconds PROGRESS :: FALSE Again
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteProjectAction = (payload) => {
  return async (dispatch) => {
    //   Make an API/Server call
    const url = `http://localhost:8080/api/v1/project/delete/${payload.projectId}`;
    await axios.delete(url);
    // Update the UI :: Fetch the updated list
    dispatch(getAllProjectAction());
  };
};

export const updateRenderAction = (payload) => {
  return { type: PROJECT_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

export function ProjectReducer(state = initState, action) {
  switch (action.type) {
    case PROJECT_GET_ALL_ACTION_TYPE:
      return { ...state, projectList: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case PROJECT_UPDATE_RENDER_ACTION_TYPE:
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
