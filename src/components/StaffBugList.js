
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateRenderAction } from "../redux/BugReducer";
import { getAllStaffBugsAction } from "../redux/BugReducer";


export const StaffBugList = () => {


  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllStaffBugsAction());
  }, []);

  const provideSolution = (item) => {
    console.log("Provide Solution", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/bug-solution");
  };

  const AssignToOtherStaff = (item) => {
    console.log("Assign to Other Staff ", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/bug-assign");
  };



  return (
    <div>
     
      <div className="alert alert-secondary ">
        <h2>Staff Bug List</h2>
      </div>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Bug Id</th>
            <th scope="col">Bug Title</th>
            <th scope="col">Ticket Id</th>
            <th scope="col">Bug Description</th>
            <th scope="col">Critical Level</th>
            <th scope="col">Raised Date</th>
            <th scope="col">Bug Status</th>
            <th scope="col">Bug Solution</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Project Name</th>
            {/* <th scope="col">Staff Id</th> */}

            <th scope="col">Actions</th>

          </tr>
        </thead>
        <tbody className="text-dark">
          {state.bug.staffBugList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.bugId}</th>
              <td>{item.bugTitle}</td>
              <td>{item.ticketId}</td>
              <td>{item.bugDescription}</td>
              <td>{item.criticalLevel}</td>
              <td>{item.bugRaisedDate}</td>
              <td>{item.bugStatus}</td>
              <td>{item.bugSolution}</td>
              <td>{item.customer.name}</td>
              <td>{item.project.projectName}</td>
        
              {/* <td> {item.staff.staffId} </td>  */}
              <td>
                <input
                  type="button"
                  value="Solve"
                  className="btn btn-outline-success btn-sm  mr-1"
                  onClick={() => provideSolution(item)}
                />
                <input
                  type="button"
                  value="Assign" 
                  onClick={() => AssignToOtherStaff(item)}
                  className="btn btn-outline-danger btn-sm"
                />
              </td>

            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
