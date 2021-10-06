
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteStaffAction, getAllStaffAction, updateRenderAction } from "../redux/StaffReducer";

export const StaffList = () => {

  const clearStaffURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/staff-add");
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllStaffAction());
  }, []);

  const deleteStaff = (item) => {
    console.log("DELETE STAFF", item.staffId);
    // dispatch the call.
    dispatch(deleteStaffAction(item));
  };

  // 2
  const updateStaff = (item) => {
    console.log("Update Staff", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/staff-add");
  };

  return (
    <div>
     
      <div className="alert alert-secondary ">
        <h2>Staff List</h2>
      </div>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Staff Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Designation</th>
            <th scope="col">user Id</th>
            <th scope="col">Password</th>
            <th scope="col">Mobile No</th>
            <th scope="col">Bug Count</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-dark">
          {state.staff.staffList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.staffId}</th>
              <td>{item.name}</td>
              <td>{item.emailId}</td>
              <td>{item.designation}</td>
              <td>{item.userId}</td>
              <td>{"******"}</td>
              <td>{item.mobileNo}</td>
              <td>{item.bugCount}</td>
             

              <td>
                <input
                  type="button"
                  value="Update"
                  className="btn btn-outline-success btn-sm  mr-1"
                  // onClick={updateRecord} :1
                  onClick={() => updateStaff(item)}
                />
                <input
                  type="button"
                  value="Delete"
                  // onClick={deleteRecord}
                  onClick={() => deleteStaff(item)}
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
