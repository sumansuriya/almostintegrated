import axios from "axios";

const initState = {
  bugList: [],
  staffBugList : [],
  customerBugList : [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const BUG_RAISE_ACTION_TYPE = "BUG_RAISE_ACTION_TYPE";
const BUG_ASSIGN_ACTION_TYPE = "BUG_ASSIGN_ACTION_TYPE";
const BUG_SOLUTION_ACTION_TYPE = "BUG_SOLUTION_ACTION_TYPE";
const BUG_GET_ALL_ACTION_TYPE = "BUG_GET_ALL_ACTION_TYPE";
const BUG_UPDATE_RENDER_ACTION_TYPE = "BUG_UPDATE_RENDER_ACTION_TYPE";

const STAFF_GET_ALL_BUG_ACTION_TYPE = "STAFF_GET_ALL_BUG_ACTION_TYPE";
const CUSTOMER_GET_ALL_BUG_ACTION_TYPE = "CUSTOMER_GET_ALL_BUG_ACTION_TYPE";

// const STAFF_UPDATE_RENDER_ACTION_TYPE = "STAFF_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllBugAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/bugs`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: "BUG_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const getAllStaffBugsAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const stfId = localStorage.getItem("staffId");
    const url = `http://localhost:8080/api/v1/staff/bugs/view/${stfId}`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: STAFF_GET_ALL_BUG_ACTION_TYPE, payload: response.data });
  };
};

export const getAllCustomerBugsAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/customer/bugs/view/${5}`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: CUSTOMER_GET_ALL_BUG_ACTION_TYPE, payload: response.data });
  };
};

export const raiseBugAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const email = "moosa@gmail.com";
    const url = `http://localhost:8080/api/v1/raise/bug/${email}`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: BUG_RAISE_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: BUG_RAISE_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const assignBugAction = (payload) => {
  return async (dispatch) => {
    // making the server call.

    const url = `http://localhost:8080/api/v1/assign/bug/${payload.bugId}`;
    await axios.put(url, payload);

    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: BUG_ASSIGN_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: BUG_ASSIGN_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const bugSolutionAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
  
    const url = `http://localhost:8080/api/v1/bug/solution/${payload.bugId}`;
    await axios.put(url, payload);

    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: BUG_SOLUTION_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: BUG_SOLUTION_ACTION_TYPE, payload: false });
    }, 5000);
  };
};


// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: BUG_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function BugReducer(state = initState, action) {
  switch (action.type) {
    case BUG_GET_ALL_ACTION_TYPE:
      return { ...state, bugList: action.payload };
    case BUG_RAISE_ACTION_TYPE:
      return { ...state, progress: action.payload };
      case BUG_ASSIGN_ACTION_TYPE:
        return { ...state, progress: action.payload };
      case BUG_SOLUTION_ACTION_TYPE:
        return { ...state, progress: action.payload };
      case BUG_UPDATE_RENDER_ACTION_TYPE:
      return { ...state, uref: action.payload };
      case STAFF_GET_ALL_BUG_ACTION_TYPE:
        return { ...state, staffBugList: action.payload };
        case CUSTOMER_GET_ALL_BUG_ACTION_TYPE:
          return { ...state, customerBugList: action.payload };

    // case STAFF_UPDATE_RENDER_ACTION_TYPE:
    //   // 6
    //   return { ...state, uref: action.payload };

    default:
      return state;
  }
}