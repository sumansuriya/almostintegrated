import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";


import { updateCustomerDetailsAction } from "../redux/CustomerProfileReducer";
import { getCustomerDetailsAction } from "../redux/CustomerProfileReducer";
import { customersignOutAction } from "../redux/CustomerLoginReducer";
 // import backcolor from "../image18.jfif";

  export const CustomerProfileUpdate = () => {

  
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  
  console.log(state);
  
  const formEl = useRef();

//   useEffect(() => {
//     dispatch(getCustomerDetailsAction(customerId));
//   }, []);
  
//   const name = state.customerProfile.CustomerProfile.name;
//   const username = state.customerProfile.CustomerProfile.username;
//   const password = state.customerProfile.CustomerProfile.password;
//   const emailid = state.customerProfile.CustomerProfile.emailid;
//   const gender = state.customerProfile.CustomerProfile.gender
//   const mobilenumber = 
//     state.customerProfile.CustomerProfile.mobilenumber
//   ;

//   const formEl = useRef();

  const [name, setName] = useState(state.customerProfile.CustomerProfile.name);
  const [username, setUserName] = useState(state.customerProfile.CustomerProfile.username);
  const [password, setPassword] = useState(state.customerProfile.CustomerProfile.password);
  const [emailid, setEmailid] = useState(state.customerProfile.CustomerProfile.emailid);
  const [gender, setGender] = useState(state.customerProfile.CustomerProfile.gender);
  const [mobilenumber, setMobileNumber] = useState(
    state.customerProfile.CustomerProfile.mobilenumber
  );
  const customerId = localStorage.getItem("userid");
  
  
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

  const updateCustomerProfile = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateCustomerDetailsAction({
            customerId: state.customer.uref.customerId,
            name,
          username,
          password,
          emailid,
          gender,
          mobilenumber
          
        })
      );

      
      setTimeout(() => 
      { history.push("/customer-profile")}, 3000 ); 
      
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const customersignOut = () => {
    dispatch(customersignOutAction());

    history.push("/customer-signin");
  };

return (
   
    <div> 
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

        <div>
           {state.customerProfile.progress && (
        <div className="row mb-1  justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Profile updated Successfully
          </div>
        </div> 
         )}
        </div>

    <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <center className="text-dark">
       
    <div >
       <h5> Name</h5>
       </div>
        <div className="row mb-2 justify-content-center">         
        <input
          type="text"
          className="form-control w-50"
          value={name}
          placeholder="Enter name"
          onChange={updateName}
          minLength="3"
          maxLength="30"
          required
          />
        </div>

        <div >
       <h5>Email Id</h5>
       </div>
        <div className="row mb-2 justify-content-center">
        <input
          type="email"
          className="form-control w-50"
          value={emailid}
          placeholder="Enter emailId"
          onChange={updateEmailid}
          required
          
        />
        </div>

        <div >
       <h5>CustomerId</h5>
       </div>
        <div className="row mb-2 justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            value={customerId}
            placeholder="Enter CustomerId"
            required
            readOnly
          />
        </div>

        <div >
       <h5>UserName</h5>
       </div>

        <div className="row mb-2 justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            value={username}
            placeholder="Enter UserName"
            onChange={updateUserName}
            required
            
          />
        </div>

        <div >
       <h5>Password</h5>
       </div>
        <div className="row mb-2 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={password}
          placeholder="Enter password"
          onChange={updatePassword}
          minLength="8"
          maxLength="15"
          required
        />
        </div>

        <div >
       <h5>Mobile Number</h5>
       </div>
        <div className="row mb-2 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={mobilenumber}
          placeholder="Enter Mobile Number"
          onChange={updateMobileNumber}
          minLength="10"
          maxLength="10"
          required
        />
        </div>

        <div >
       <h5>Gender</h5>
       </div>
        <div className="row mb-2 justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            value={gender}
            placeholder="Enter Gender"
            onChange={updateGender}
            required
            
          />
        </div>
       

      <div className="row mb-1 justify-content-center">
             <input
                type="button"
                onClick={updateCustomerProfile}
                value="Save Changes"
                className="btn btn-lg mb-2 btn-success w-50"
              />    
       </div>
       </center>
     </form>
  </div>
 )
}