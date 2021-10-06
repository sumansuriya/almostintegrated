import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomerAction,
  updateRenderAction,
} from "../redux/CustomerReducer";
//import { AppNav } from "./AppNav";


export const CustomerRegistration = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();
  const [name, setName] = useState(state.customer.uref.name);
  const [username, setUserName] = useState(state.customer.uref.username);
  const [password, setPassword] = useState(state.customer.uref.password);
  const [emailid, setEmailid] = useState(state.customer.uref.emailid);
  const [gender, setGender] = useState(state.customer.uref.gender);
  const [mobilenumber, setMobileNumber] = useState(
    state.customer.uref.mobilenumber
  );
  

  const updateName = (e) => setName(e.target.value);
  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateEmailid = (e) => setEmailid(e.target.value);
  const updateGender = (e) => setGender(e.target.value);
  const updateMobileNumber = (e) => {
    console.log(e.target.value);

    // replacing all the non-digit ^\d with empty string.
    const numericValue = e.target.value.replace(/[^\d]/gi, "");
    setMobileNumber(numericValue);
  };
  

  const addNewCustomer = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createCustomerAction({
            name,
          username,
          password,
          emailid,
          gender,
          mobilenumber,
          
        })
      );

      // clear the form
      
      setName("");
      setUserName("");
      setPassword("");
      setEmailid("");
      setGender("");
      setMobileNumber("");
      
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const resetForm = () => {
    dispatch(updateRenderAction({}));
    setName("");
    setUserName("");
    setPassword("");
    setEmailid("");
    setGender("");
    setMobileNumber("");
    
  };

  return (
    <div className="bg bg-light p-4">
      <div style={{ background: "", height: "800px" }}>
       
        <div className="bg-dark text-light p-3 d-flex justify-content-end mb-2">
          {/* <Link to="/customer-list">
            <h6 className="mr-3">CUSTOMER-LIST</h6>
          </Link> */}

          <Link to="/customer-registration">
            <h6 onClick={resetForm} className="mr-3">
              CUSTOMER-REGISTRATION{" "}
            </h6>
          </Link>
          <Link to="/customer-signin">
            <h6 className="mr-3">CUSTOMER-LOGIN</h6>
          </Link>

        </div>
        <div className="newregistration" style={{ height: "750px" }}>
          <div className="alert alert-primary">
          {state.customer.uref.customerId ? (
                  <h3>
                    <center>UPDATE CUSTOMER DETAILS</center>
                  </h3>
                ) : (
                  <h3>
                    <center>REGISTRATION FOR NEW CUSTOMER</center>
                  </h3>
                )}
          </div>
          <div>
          {state.customer.progress && (
              <div className="row mb-1  justify-content-center">
              <div className="mx-4 alert alert-success w-50">
                Registered Successfully
              </div>
            </div> 
          )}
          </div>

          {/* <form>
            <div className="form-group row">
              <label for="inputEmail3" class="col-lg-2 col-form-label">
                Email
              </label>
              <div>
                <input
                  type="email"
                  className="form-control w-50 "
                  id="inputEmail3"
                  placeholder="Email"
                />
              </div>
            </div>
          </form> */}
          <center className="text-light">
            <form ref={formEl} mx-4 className="needs-validation" noValidate>
              {" "}

              <div>
                <h4>Name</h4>
                <input
                  type="name"
                  value={name}
                  onChange={updateName}
                  className="form-control form-control-lg mb-1  w-50"
                  placeholder="Enter Name"
                  minLength="6"
                  maxLength="30"
                  required
                />
                </div>
              
              <div>
                <h4>User Name</h4>
                <input
                  type="text"
                  value={username}
                  onChange={updateUserName}
                  className="form-control form-control-lg mb-1  w-50"
                  placeholder="Enter User Name"
                  minLength="3"
                  maxLength="30"
                  required
                />
              </div>
              
              <div>
                <h4>Password</h4>
                <input
                  type="password"
                  value={password}
                  onChange={updatePassword}
                  className="form-control form-control-lg mb-1  w-50"
                  placeholder="Enter Password"
                  minLength="6"
                  maxLength="30"
                  required
                />
              </div>
              
              <div>
                

                
              </div>
              <div>
                <div>
                  <h4>Emailid</h4>
                  <input
                    class="form-control form-control-lg mb-1  w-50"
                    value={emailid}
                    type = "email"
                    onChange={updateEmailid}
                    className="form-control form-control-lg mb-1  w-50"
                    placeholder="Enter Emailid"
                    minLength="6"
                    maxLength="30"
                    required
                  />
                    
                
                </div>
              </div>
              <div>
              
              </div>
              <div>
                <h4>Gender</h4>

                <div class="form-group">
                  <select
                    class="form-control form-control-lg mb-1  w-50"
                    value={gender}
                    onChange={updateGender}
                    required
                  >
                    <option selected>--Choose--</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <h4>Mobile Number</h4>
                <div class="form-group">
                  <input
                    class="form-control form-control-lg mb-1  w-50"
                    value={mobilenumber}
                    onChange={updateMobileNumber}
                    className="form-control form-control-lg mb-1  w-50"
                    placeholder="Enter Mobile Number"
                    minLength="6"
                    maxLength="10"
                    required
                  />
                
                </div>
              </div>
              <div>
                {state.customer.uref.customerId ?  (
                  <input
                    type="button"
                    onClick={addNewCustomer}
                    value="Add Customer"
                    className="btn btn-lg btn-success w-50"
                  />
                ):(
                    <input
                    type="button"
                    onClick={addNewCustomer}
                    value="Register"
                    className="btn btn-lg btn-success w-50"
                  />

                )}
              </div>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};