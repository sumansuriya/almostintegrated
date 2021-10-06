import axios from "axios";

const initState = {
  stfProfile: {},
  progress: false,
  authFailure: false,
  authSuccess: false,

  // on click of update button; the key will be updated.
  uref: {},
};

const STAFF_GET_DETAILS_ACTION_TYPE = "STAFF_GET_DETAILS_ACTION_TYPE";
const STAFF_UPDATE_DETAILS_ACTION_TYPE = "STAFF_UPDATE_DETAILS_ACTION_TYPE";
const STAFF_AUTH_FAILURE_ACTION_TYPE = "STAFF_AUTH_FAILURE_ACTION_TYPE";
const STAFF_AUTH_SUCCESS_ACTION_TYPE = "STAFF_AUTH_SUCCESS_ACTION_TYPE";

export const getStaffDetailsAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const userid=localStorage.getItem("staffId");
    
    const url = `http://localhost:8080/api/v1/staff/view/${userid}`;
    const response = await axios.get(url, payload);

    console.log(response.data);

    // UI UPDATE
    dispatch({
      type: STAFF_GET_DETAILS_ACTION_TYPE,
      payload: response.data,
    });
  };
};

export const authenticateStaffAction = (payload) => {
    return async (dispatch) => {
      // API CALL :: VERIFICATION
      const url = `http://localhost:8080/api/v1/staff/login`;
      const response = await axios.post(url, payload);
  
      console.log(response.data);
  
      if (response.data !== "") {
        // VALID USER
        dispatch({ type: STAFF_AUTH_SUCCESS_ACTION_TYPE, payload: true });
  
        // Will store the success information in storage.
        // TODO will save into the storage
        localStorage.setItem("authSuccess", "1");
  
        localStorage.setItem("staffId", response.data.staffId);
        const stfId = localStorage.getItem("staffId");
        // const firstname =localStorage.setItem("firstname", response.data.firstname);
        // const name = localStorage.getItem(firstname)
  
        // console.log(name);
        console.log(stfId);
        // NOT DOING THE ACTIVITY OF 5 SECONDS :: page will be redirected to anohter page.
      } else {
        // INVALID USER :: AUTH FAILS
        // updating the UI
        dispatch({ type: STAFF_AUTH_FAILURE_ACTION_TYPE, payload: true });
  
        setTimeout(() => {
          dispatch({ type: STAFF_AUTH_FAILURE_ACTION_TYPE, payload: false });
        }, 5000);
      }
    };
  };

  export const updateRenderAction = (payload) => {
    // ONLY UPDATEING THE UI
    // 5
    return { type: STAFF_UPDATE_DETAILS_ACTION_TYPE, payload: payload };
  };

export const updateStaffDetailsAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const userid = localStorage.getItem("staffId");
    console.log(userid);
    const url = `http://localhost:8080/api/v1/update/${userid}`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: STAFF_UPDATE_DETAILS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: STAFF_UPDATE_DETAILS_ACTION_TYPE, payload: false });
    }, 5000);
  };  
};

export function StaffProfileReducer(state = initState, action) {
  switch (action.type) {
    case STAFF_GET_DETAILS_ACTION_TYPE:
      return { ...state, stfProfile: action.payload };
    case STAFF_UPDATE_DETAILS_ACTION_TYPE:
      return { ...state, progress: action.payload };
      case STAFF_AUTH_FAILURE_ACTION_TYPE:
      return { ...state, authFailure: action.payload };
    case STAFF_AUTH_SUCCESS_ACTION_TYPE:
      return { ...state, authSuccess: action.payload };

    default:
      return state;
  }
}
