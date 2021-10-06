import axios from "axios";

const initState = {
  bugReport : {},
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// const BUG_ASSIGN_ACTION_TYPE = "BUG_ASSIGN_ACTION_TYPE";
const BUG_REPORT_ACTION_TYPE = "BUG_REPORT_ACTION_TYPE";

const BUG_DETAILS_UPDATE_RENDER_ACTION_TYPE = "BUG_DETAILS_UPDATE_RENDER_ACTION_TYPE";

export const getBugReportAction = () => {
    return async (dispatch) => {
      // API CALL :: FETCH RECORDS
      
      const url = `http://localhost:8080/api/v1/view/report`;
      const response = await axios.get(url);
  
      console.log(response.data);
  
      // UI UPDATE
      dispatch({ type: BUG_REPORT_ACTION_TYPE, payload: response.data });
    };
  };


// export const assignBugAction = (payload) => {
//     return async (dispatch) => {
//       // making the server call.
  
//       const url = `http://localhost:8080/api/v1/assign/bug/${payload.bugId}`;
//       await axios.put(url, payload);

//       updateRenderAction({});
  
//       // update the ui. TODO
//       dispatch({ type: BUG_ASSIGN_ACTION_TYPE, payload: true });
  
//       // after 5 second PROGRESS :: FALSE AGAIN
//       setTimeout(() => {
//         dispatch({ type: BUG_ASSIGN_ACTION_TYPE, payload: false });
//       }, 5000);
//     };
//   };

  
  export const updateRenderAction = (payload) => {
    // ONLY UPDATEING THE UI
    // 5
    return { type: BUG_DETAILS_UPDATE_RENDER_ACTION_TYPE, payload: payload };
  };

  export function BugAssignReducer(state = initState, action) {
    switch (action.type) {

      // case BUG_ASSIGN_ACTION_TYPE:
      //   return { ...state, progress: action.payload };
      case BUG_REPORT_ACTION_TYPE:
        return { ...state, bugReport: action.payload };
        case BUG_DETAILS_UPDATE_RENDER_ACTION_TYPE:
          return { ...state, uref: action.payload };
  
      default:
        return state;
    }
}