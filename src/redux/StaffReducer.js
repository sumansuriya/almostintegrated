import axios from "axios";

const initState = {
  staffList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const STAFF_CREATE_ACTION_TYPE = "STAFF_CREATE_ACTION_TYPE";
const STAFF_GET_ALL_ACTION_TYPE = "STAFF_GET_ALL_ACTION_TYPE";
const STAFF_UPDATE_RENDER_ACTION_TYPE = "STAFF_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllStaffAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/staff/view`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: "STAFF_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createStaffAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/staff/add`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: STAFF_CREATE_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: STAFF_CREATE_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateStaffAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/staff/update/${payload.staffId}`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: STAFF_CREATE_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: STAFF_CREATE_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteStaffAction = (payload) => {
  return async (dispatch) => {
    // MAKE AN API/SERVER CALL
    const url = `http://localhost:8080/api/v1/staff/delete/${payload.staffId}`;
    await axios.delete(url, payload);

    // Upate the UI TODO :: Fetch The Updated List
    dispatch(getAllStaffAction());
  };
};

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: STAFF_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function StaffReducer(state = initState, action) {
  switch (action.type) {
    case STAFF_GET_ALL_ACTION_TYPE:
      return { ...state, staffList: action.payload };
    case STAFF_CREATE_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case STAFF_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}