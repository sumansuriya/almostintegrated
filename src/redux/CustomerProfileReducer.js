import axios from "axios";

const initState = {
  CustomerProfile: {},
  progress: false,
  authFailure: false,
  authSuccess: false,

  // on click of update button; the key will be updated.
  uref: {},
};

const CUSTOMER_GET_DETAILS_ACTION_TYPE = "CUSTOMER_GET_DETAILS_ACTION_TYPE";
const CUSTOMER_UPDATE_DETAILS_ACTION_TYPE = "CUSTOMER_UPDATE_DETAILS_ACTION_TYPE";
//const CUSTOMER_AUTH_FAILURE_ACTION_TYPE = "CUSTOMER_AUTH_FAILURE_ACTION_TYPE";
//const CUSTOMER_AUTH_SUCCESS_ACTION_TYPE = "CUSTOMER_AUTH_SUCCESS_ACTION_TYPE";

export const getCustomerDetailsAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const customerId=localStorage.getItem("customerId");
    
    const url = `http://localhost:8080/api/v1/customer/view/${customerId}`;
    const response = await axios.get(url, payload);

    //console.log(response.data);

    // UI UPDATE
    dispatch({
      type: CUSTOMER_GET_DETAILS_ACTION_TYPE,
      payload: response.data,
    });
  };
};

// export const authenticateStaffAction = (payload) => {
//     return async (dispatch) => {
//       // API CALL :: VERIFICATION
//       const url = `http://localhost:8080/api/v1/staff/login`;
//       const response = await axios.post(url, payload);
  
//       console.log(response.data);
  
//       if (response.data !== "") {
//         // VALID USER
//         dispatch({ type: STAFF_AUTH_SUCCESS_ACTION_TYPE, payload: true });
  
//         // Will store the success information in storage.
//         // TODO will save into the storage
//         localStorage.setItem("authSuccess", "1");
  
//         localStorage.setItem("staffId", response.data.staffId);
//         const stfId = localStorage.getItem("staffId");
//         // const firstname =localStorage.setItem("firstname", response.data.firstname);
//         // const name = localStorage.getItem(firstname)
  
//         // console.log(name);
//         console.log(stfId);
//         // NOT DOING THE ACTIVITY OF 5 SECONDS :: page will be redirected to anohter page.
//       } else {
//         // INVALID USER :: AUTH FAILS
//         // updating the UI
//         dispatch({ type: STAFF_AUTH_FAILURE_ACTION_TYPE, payload: true });
  
//         setTimeout(() => {
//           dispatch({ type: STAFF_AUTH_FAILURE_ACTION_TYPE, payload: false });
//         }, 5000);
//       }
//     };
//   };

  export const updateRenderAction = (payload) => {
    // ONLY UPDATEING THE UI
    // 5
    return { type: CUSTOMER_UPDATE_DETAILS_ACTION_TYPE, payload: payload };
  };

export const updateCustomerDetailsAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const customerId = localStorage.getItem("userid");
   // console.log(userid);
    const url = `http://localhost:8080/api/v1/customer/update/${customerId}`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: CUSTOMER_UPDATE_DETAILS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: CUSTOMER_UPDATE_DETAILS_ACTION_TYPE, payload: false });
    }, 5000);
  };  
};

export function CustomerProfileReducer(state = initState, action) {
  switch (action.type) {
    case CUSTOMER_GET_DETAILS_ACTION_TYPE:
      return { ...state, CustomerProfile: action.payload };
    case CUSTOMER_UPDATE_DETAILS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    //   case STAFF_AUTH_FAILURE_ACTION_TYPE:
    //   return { ...state, authFailure: action.payload };
    // case STAFF_AUTH_SUCCESS_ACTION_TYPE:
    //   return { ...state, authSuccess: action.payload };

    default:
      return state;
  }
}