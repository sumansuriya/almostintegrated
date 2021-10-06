import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateCustomerAction } from "../redux/CustomerLoginReducer";

export const CustomerLogin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const loginCustomer = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      // dispatch the call to redux ::for API CALL
      dispatch(authenticateCustomerAction({ username: username, password }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  // REACT ROUTE DOM
  if (state.customerlogin.authSuccess === true) {
    history.push("/Customer-profile");
    console.log("success");
  }

  return (
    <div className="login" style={{ height: "750px" }}>
      {/* bg-dark */}
      {/* <img align="left" src="./images/Logo.jpg" height="15%" width="7%" /> */}

      {/* <h1>QUEMATE CONNECTS U ! </h1> */}
      
      <div className="bg-dark text-warning p-3 d-flex justify-content-end ">
      
              
            
        <Link to="/about-us">
          <h6 className="mr-3">ABOUT US</h6>
        </Link>

        <Link to="/contact-us">
          <h6>CONTACT US</h6>
        </Link>
      </div>

      <div className=" justify-content-center align-items-center">
        {/* bg-dark */}
        

        <div
          className=" d-flex justify-content-center align-items-center"
          // bg-dark
          style={{ height: "100vh" }}
        >
          <div className="w-50">
            <h1 className="text-center alert alert-info">CUSTOMER SIGNIN</h1>

            {state.customerlogin.authFailure && (
              <h6 className="text-center alert alert-danger">
                Invalid Credentials !
              </h6>
            )}

            <form ref={formEl} className="needs-validation" noValidate>
              <div >
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={updateUserName}
                  minLength="3"
                  maxLength="25"
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={updatePassword}
                  placeholder="Enter Password"
                  minLength="6"
                  maxLength="25"
                  className="form-control form-control-lg mb-2"
                  required
                />
              </div>

              <div>
                <input
                  type="button"
                  value="LOGIN"
                  onClick={loginCustomer}
                  className="btn btn-info btn-lg w-100"
                />
              </div>
              <div>
                <Link to="/customer-registration">
                  <input
                    type="button"
                    value="New Customer, Click here to Register"
                    className="text-light btn btn-lg btn-link w-100"
                  />
                </Link>
                </div>
             

              <div>
               
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
    
  );
};