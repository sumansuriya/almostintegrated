
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createStaffAction, updateStaffAction } from "../redux/StaffReducer";
import { updateRenderAction } from "../redux/StaffReducer";


export const StaffAdd = () => {
    
    const clearStaffURef = () => {
      dispatch(updateRenderAction({}));
      history.push("/staff-add");
    };
  
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
    console.log(state);
  
    const formEl = useRef();
  
    const [name, setName] = useState(state.staff.uref.name);
    const [emailId, setEmailId] = useState(state.staff.uref.emailId);
    const [designation, setDesignation] = useState(state.staff.uref.designation);
    const [mobileNo, setMobileNo] = useState(state.staff.uref.mobileNo);
    const [bugCount, setBugCount] = useState(state.staff.uref.bugCount);
  
    const updateName = (e) => setName(e.target.value);
    const updateEmailId = (e) => setEmailId(e.target.value);
   
    const updateDesignation = (e) => setDesignation(e.target.value);
    const updateMobileNo = (e) => {
      console.log(e.target.value);
      const numericValue = e.target.value.replace(/[^\d]/gi, "");
      setMobileNo(numericValue);
    
    };
  
  
    const addNewStaff = (e) => {
      // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
      // console.log(formEl.current);
      // console.log(formEl.current.checkValidity());
      e.preventDefault();
  
      const isFormValid = formEl.current.checkValidity();
      if (isFormValid) {
        dispatch(
          createStaffAction({
            name,
            emailId,
            designation,
            mobileNo,
          
          })
        );
  
        // clear the form
        setName("");
        setEmailId("");
        setDesignation("");
        setMobileNo("");

      var DESdropDown = document.getElementById("des");
      DESdropDown.selectedIndex = 0;

      } else {
        e.stopPropagation();
        formEl.current.classList.add("was-validated");
      }
    };
  
    const updateStaff = (e) => {
      e.preventDefault();
  
      const isFormValid = formEl.current.checkValidity();
      if (isFormValid) {
        dispatch(
          updateStaffAction({
            staffId: state.staff.uref.staffId,
            name,
            emailId,
            designation,
            mobileNo,
            
          })
        );
  
        // clear the form
        setName("");
        setEmailId("");
        setDesignation("");
        setMobileNo("");
  
      } else {
        e.stopPropagation();
        formEl.current.classList.add("was-validated");
      }
    };
   return (
    <div className="add" style={{ height: "750px" }}>
      <div className="alert alert-secondary">
        {state.staff.uref.staffId ? (
          <center>
            <h2>Staff Update</h2>
          </center>
        ) : (
          <center>
            <h2>Staff Create</h2>
          </center>
        )}
      </div>
    
        <div>
         {state.staff.progress && ( 
            state.staff.uref.staffId ? (
        <div className="row mb-1 justify-content-center">
          <div className="mx-4 alert alert-success w-50 ">
            staff updated Successfully
          </div>
        </div>
         ) : (
            <div className="row mb-1 justify-content-center">
              <div className="mx-4 alert alert-success w-50 ">
                Staff added Successfully
              </div>
            </div>
           )
        )}
      </div>

      <form ref={formEl} className="mx-4 needs-validation" noValidate>

        <div className="row mb-1 justify-content-center">
       
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={name}
            placeholder="Enter name"
            onChange={updateName}
            required 
            
          />
      
        </div>

        <div className="row mb-1 justify-content-center">
        {state.staff.uref.staffId ? (
          <input
            type="email"
            className="form-control form-control-lg w-50"
            value={emailId}
            placeholder="Enter emailId"
            onChange={updateEmailId}
            required
          />
        ) : (
          <input
          type="email"
          className="form-control form-control-lg w-50"
          value={emailId}
          placeholder="Enter emailId"
          onChange={updateEmailId}
          required
        />
        )}
        </div>

        <div className="row mb-1 justify-content-center">
          {state.staff.uref.staffId ? (
            <select
              className="custom-select custom-select-lg w-50"
              value={designation}
              onChange={updateDesignation}
              required
              onChange={(e) => {
                const updateStaffDesignation = e.target.value;
                setDesignation(updateStaffDesignation);
              }}
            >
              <option value="">Select designation</option>

              <optgroup label="A-Grade">
                <option>Associate-A3</option>
                <option>Analyst-A4</option>
                <option>Senior Analyst-A5</option>
              </optgroup>

              <optgroup label="B-Grade">
                <option>Associate Consultant-B1</option>
                <option>Consultant-B2</option>
              </optgroup>

              <optgroup label="C-Grade">
                <option>Senior Consultant-C1</option>
                <option>Manager-C2</option>
              </optgroup>

              <optgroup label="D-Grade">
                <option>Senior Manager-D1</option>
                <option>Program Manager-D2</option>
              </optgroup>

              <optgroup label="E-Grade">
                <option>Director-E1</option>
                <option>Senior Director-E2</option>
              </optgroup>
            </select>
          ) : (
            <select
              className="custom-select custom-select-lg w-50"
              id="des"
              required
              onChange={(e) => {
                const setStaffDesignation = e.target.value;
                setDesignation(setStaffDesignation);
              }}
            >
              <option value="">Select designation</option>

              <optgroup label="A-Grade">
                <option>Associate-A3</option>
                <option>Analyst-A4</option>
                <option>Senior Analyst-A5</option>
              </optgroup>

              <optgroup label="B-Grade">
                <option>Associate Consultant-B1</option>
                <option>Consultant-B2</option>
              </optgroup>

              <optgroup label="C-Grade">
                <option>Senior Consultant-C1</option>
                <option>Manager-C2</option>
              </optgroup>

              <optgroup label="D-Grade">
                <option>Senior Manager-D1</option>
                <option>Program Manager-D2</option>
              </optgroup>

              <optgroup label="E-Grade">
                <option>Director-E1</option>
                <option>Senior Director-E2</option>
              </optgroup>
            </select>
          )}
        </div>

        

        <div className="row mb-1 justify-content-center">
        
          <input
            type="text"
            className="form-control form-control-lg mb-1 w-50"
            value={mobileNo}
            placeholder="Enter Contact number"
            onChange={updateMobileNo}
            minLength="10"
            maxLength="10"
            required
            
          />
      
          
      </div>

        <div>
          <div className="row mb-1 justify-content-center">
            {state.staff.uref.staffId ? (
              <input
                type="button"
                onClick={updateStaff}
                value="Update Staff"
                className="btn btn-lg btn-info w-50"
              />
            ) : (
              <input
                type="button"
                onClick={addNewStaff}
                value="Add Staff"
                className="btn btn-lg btn-success w-50"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
   

};

