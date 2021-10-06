import axios from "axios";

const initState = {
  customerList: [],
  progress: false,
  

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const CUSTOMER_GET_ALL_ACTION_TYPE = "CUSTOMER_GET_ALL_ACTION_TYPE";
const CUSTOMER_UPDATE_RENDER_ACTION_TYPE = "CUSTOMER_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllCustomerAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/customer/view`;
    const response = await axios.get(url);

     console.log(response);

    // UI UPDATE
    dispatch({ type: "CUSTOMER_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createCustomerAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/customer/add`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateCustomerAction = (payload) => {
  return async (dispatch) => {

    const customerId = localStorage.getItem("userid");
    // making the server call.
    const url = `http://localhost:8080/api/v1/customer/update/${payload.id}`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

// export const deleteUserAction = (payload) => {
//   return async (dispatch) => {
//     // MAKE AN API/SERVER CALL
//     const url = `http://localhost:8080/api/v1/users/delete/${payload.userid}`;
//     await axios.delete(url);

//     // Upate the UI TODO :: Fetch The Updated List
//     dispatch(getAllUserAction());
//   };
// };

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: CUSTOMER_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function CustomerReducer(state = initState, action) {
  switch (action.type) {
    case CUSTOMER_GET_ALL_ACTION_TYPE:
      return { ...state, customerList: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case CUSTOMER_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}