import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";


import { updateStaffDetailsAction } from "../redux/StaffProfileReducer";
  import backcolor from "../image18.jfif";

  export const StaffProfileUpdate = () => {

  
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  
  console.log(state);
  
  const formEl = useRef();
  
  const [name, setName] = useState(state.staffProfile.stfProfile.name);
  const [emailId, setEmailId] = useState(state.staffProfile.stfProfile.emailId);
  const [designation, setDesignation] = useState(state.staffProfile.stfProfile.designation);
  const [mobileNo, setMobileNo] = useState(state.staffProfile.stfProfile.mobileNo);
  const [userId, setUserId] = useState(state.staffProfile.stfProfile.userId);
  const [bugCount, setBugCount] = useState(state.staffProfile.stfProfile.bugCount);
  const [password, setPassword] = useState(state.staffProfile.stfProfile.password);
  
  
  const updateName = (e) => setName(e.target.value);
  const updateBugCount = (e) => setBugCount(e.target.value);
  const updateUserId = (e) => setUserId(e.target.value);
    const updateEmailId = (e) => setEmailId(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updateDesignation = (e) => setDesignation(e.target.value);
    const updateMobileNo = (e) => {
      console.log(e.target.value);
      const numericValue = e.target.value.replace(/[^\d]/gi, "");
      setMobileNo(numericValue);
    
    };

  const updateStaffProfile = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateStaffDetailsAction({
          staffId: state.staffProfile.stfProfile.staffId,
            name,
            emailId,
            userId,
            designation,
            password,
            bugCount,
            mobileNo,
        })
      );

      setTimeout(() => 
      { history.push("/staff-profile")}, 6000 ); 
      
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

return (
   
    <div
    style={{ height: "110vh",
    backgroundImage: `url(${backcolor})`, 
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"}}>
      
      <div className="d-flex alert alert-secondary">  
         <span className="col-5 p-1">  
             <a href="/staff-profile">
                 <h5> Back </h5> 
            </a>
         </span> 
           
         <center> 
              <h2>Update Profile</h2> 
        </center> 
      </div>  

        <div>
           {state.staffProfile.progress && (
        <div className="row mb-1  justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Profile updated Successfully
          </div>
        </div> 
         )}
        </div>

    <form ref={formEl} className="mx-4 needs-validation" noValidate>
       
    <div className="row text-light col-7 justify-content-center">
       <h5> Name</h5>
       </div>
        <div className="row mb-1 justify-content-center">         
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

        <div className="row text-light col-7 justify-content-center">
       <h5>Email Id</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="email"
          className="form-control w-50"
          value={emailId}
          placeholder="Enter emailId"
          onChange={updateEmailId}
          required
          readOnly
        />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>UserId</h5>
       </div>
        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            value={userId}
            placeholder="Enter userId"
            onChange={updateUserId}
            required
            readOnly
          />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Password</h5>
       </div>
        <div className="row mb-1 justify-content-center">
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

        <div className="row text-light col-7 justify-content-center">
       <h5>mobileNo</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={mobileNo}
          placeholder="Enter MobileNo"
          onChange={updateMobileNo}
          minLength="10"
          maxLength="10"
          required
        />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Bug Count</h5>
       </div>
        <div className="row mb-1 justify-content-center">
          <input
            type="number"
            className="form-control w-50"
            value={bugCount}
            placeholder="Enter bugCount"
            onChange={updateBugCount}
            required
            readOnly
          />
        </div>

        <div className="row text-light col-7 justify-content-center">
       <h5>Designation</h5>
       </div>
        <div className="row mb-1 justify-content-center">
        <input
          type="text"
          className="form-control mb-2 w-50"
          value={designation}
          placeholder="Enter Designation"
          onChange={updateDesignation}
          required
          readOnly
        />
      </div>

      <div className="row mb-1 justify-content-center">
             <input
                type="button"
                onClick={updateStaffProfile}
                value="Save Changes"
                className="btn btn-lg mb-2 btn-success w-50"
              />    
       </div>
     </form>
  </div>
 )
}