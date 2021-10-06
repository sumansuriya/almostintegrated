import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { assignBugAction } from "../redux/BugReducer";
import { getAllStaffAction } from "../redux/StaffReducer";

export const BugAssign = () => {

  
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
    console.log(state);
  
    const formEl = useRef();

 const [bugId, setBugId] = useState(state.bug.uref.bugId);
    const [bugTitle, setBugTitle] = useState(state.bug.uref.bugTitle);
    const [ticketId, setTicketId] = useState(state.bug.uref.ticketId);
    const [staff, setStaff] = useState(state.bug.uref.staff.staffId)

    const stf = localStorage.getItem("staffId"); 

 const updateBugId = (e) => setBugId(e.target.value);
    const updateBugTitle = (e) => setBugTitle(e.target.value);
    const updateTicketId = (e) => setTicketId(e.target.value);
    const updateStaff = (e) => setStaff(e.target.value); 

    useEffect(() => {
        dispatch(getAllStaffAction());
      }, []);
    

      const AssignBug = (e) => {
        e.preventDefault();
    
        const isFormValid = formEl.current.checkValidity();
        if (isFormValid) {
          dispatch(
            assignBugAction({
              bugId: state.bug.uref.bugId,   
                 
            })
          );
    
          // clear the form
         
          // setBugTitle(""); 
          // setTicketId("");
         
          setTimeout(() => 
          { history.push("/staff-bug-list")}, 6000 ); 
          
        } else {
          e.stopPropagation();
          formEl.current.classList.add("was-validated");
        }
      };
         

    return(
<div className="img" style={{ height: "750px" }}>

     <div className="d-flex flex-row-reverse alert alert-info">  
         <span className="col-5 p-1">  
             <Link to="/staff-bug-list">
                 <h5 className="text-right"> Back </h5> 
             </Link>
         </span> 
           
         <center> 
              <h2> Bug Assign </h2> 
        </center> 
      </div>  

      <div> 
        {state.bug.progress && 
            <div className="row mb-1 justify-content-center">
              <div className="mx-4 alert alert-success w-75">
                Bug Assigned Successfully
              </div>
            </div>
        }
      </div>

      <form ref={formEl} className="mx-4 needs-validation" noValidate>

      <div className="row">
          <div className="col-7 ml-3">  
        <div className="row text-primary ml-2 mt-2">
       <h5>Bug Id</h5>
       </div>
         <div>  
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={bugId}
            placeholder="Enter BugId"
            onChange={updateBugId}
            required 
            readOnly   
          />
        </div>

       <div className="row text-primary ml-2 mt-2">
       <h5>Bug Title</h5>
       </div>
        <div>  
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={bugTitle}
            placeholder="Enter Bug title"
            onChange={updateBugTitle}
            required  
            readOnly  
          />
        </div>

        <div className="row text-primary ml-2 mt-2">
       <h5>Ticket Id</h5>
       </div>
        <div>  
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={ticketId}
            placeholder="Enter Ticket Id"
            onChange={updateTicketId}
            required  
            readOnly  
          />
        </div>

        <div className="row text-primary ml-2 mt-4">
       <h5>Assigning to Staff Id</h5>
       </div>
        <div>  
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={staff}
            placeholder="Enter Staff Id"
            onChange={updateStaff}
            required    
          />
        </div>

        <div className="row mb-1 mt-4">
             <input
                type="button"
                onClick={AssignBug}
                value="Assign"
                className="btn btn-lg mb-2 btn-success w-50 ml-2"
              />    
       </div>

        </div>
        <div className="col-4 mr-3">
       
        <div className="row justify-content-center text-primary mt-2">
       <h4>Available Staff Details</h4>
         </div>  
             
            {state.staff.staffList.map((item) => (
                
                 (item.staffId !== stf) &&

                    <div className="mt-2 mb-4">
                    <h5>Staff Id = {item.staffId} </h5>
                    <h5>Staff name = {item.name} </h5>
                    <h5>Bug Count = {item.bugCount} </h5>
                    </div> 
                    
            )
            )}
               
            </div>
            </div>
            </form>
        </div>
    );
}