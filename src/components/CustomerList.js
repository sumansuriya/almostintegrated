import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getAllCustomerAction,
  updateRenderAction,
} from "../redux/CustomerReducer";

import { customersignOutAction } from "../redux/CustomerLoginReducer";

const customerId = localStorage.getItem("userid");

export const CustomerList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllCustomerAction());
  }, []);

//   export const EmployeeList = () => {
//     const dispatch = useDispatch();
//     const state = useSelector((state) => state);
  
//     useEffect(() => {
//       dispatch(getAllEmployeeAction());
//     }, []);

  // 2
  const updateRecord = (customerId) => {
    console.log("Update Record", customerId);
    //console.log(item)

    // 3 :: updating the store
    dispatch(updateRenderAction(customerId));

    // navigateing to the page
    history.push("/customer-upsert");
  };

  const customersignOut = () => {
    dispatch(customersignOutAction());

    history.push("/customer-signin");
  };

  return (
    <div>
      <div className="bg bg-light p-4" style={{ background: "", height: "800px" }}>
      
        
        <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">

        <Link to="/home-page">
            <h6 className="mr-3">BUG LIST</h6>
          </Link>
          <Link  to="/customer-profile">
            <h6 className="mr-3">CUSTOMER PROFILE</h6> 
          </Link>

          <Link to="/home-page">
            <h6 className="mr-3">RAISE BUG</h6>
          </Link>

          <Link onClick={customersignOut} to="/customer-signin">
            <h6>SIGN-OUT</h6>
          </Link>
        </div>

        <div >
          <div  className="alert alert-primary">
            <h3>
              <center>LIST OF CUSTOMERS</center>
            </h3>
          </div>

          <table className="table" >
            <thead className="thead-dark">
              <tr>
                <th scope="col">CustomerID</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Gender</th>
                <th scope="col">Emailid</th>
                <th scope="col">TicketCount</th>
                <th scope="col">Mobile Number</th>
              </tr>
            </thead>
            <tbody className="text-light">
              {state.customer.customerList.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.customerId}</th>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{"*****"}</td>
                  <td>{item.gender}</td>
                  <td>{item.emailid}</td>
                  <td>{item.ticketcount}</td>
                  <td>{item.mobilenumber}</td>
                  

                  <td>
                    {/* <input
                      type="button"
                      value="Update"
                      className="btn btn-outline-secondary btn-sm  mr-1"
                      // onClick={updateRecord} :1
                      onClick={() => updateRecord(item)}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};