import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { raiseBugAction } from "../redux/BugReducer";
import { getAllProjectAction } from "../redux/ProjectReducer";
import { getAllStaffAction } from "../redux/StaffReducer";


export const BugRaise = () => {
    
   
  
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
    console.log(state);
  
    const formEl = useRef();

    useEffect(() => {
      dispatch(getAllStaffAction());
    }, []);
    useEffect(() => {
      dispatch(getAllProjectAction());
    }, []);
  
    const [bugTitle, setBugTitle] = useState(state.bug.uref.bugTitle);
    const [ticketId, setTicketId] = useState(state.bug.uref.ticketId);
    const [bugDescription, setBugDescription] = useState(state.bug.uref.bugDescription);
    const [criticalLevel, setCriticalLevel] = useState(state.bug.uref.criticalLevel);
    const [bugStatus, setBugStatus] = useState(state.bug.uref.bugStatus);
    const [bugSolution, setBugSolution] = useState(state.bug.uref.bugSolution);
    const [staff, setStaff] = useState(state.bug.uref.staff);
    const [customer, setCustomer] = useState(state.bug.uref.customer);
    const [project, setProject] = useState(state.bug.uref.project);
     const customerId = localStorage.getItem("customerId")



  
    const updateBugTitle = (e) => setBugTitle(e.target.value);
    const updateTicketId = (e) => setTicketId(e.target.value); 
    const updateBugDescription = (e) => setBugDescription(e.target.value);
    const updateCriticalLevel = (e) => setCriticalLevel(e.target.value);
    const updateBugStatus = (e) => setBugStatus(e.target.value);
    const updateBugSolution = (e) => setBugSolution(e.target.value);
    const updateStaff = (e) => setStaff(e.target.value);
    const updateCustomer = (e) => setCustomer(e.target.value);
    const updateProject = (e) => setProject(e.target.value);
   
  
  
    const addNewBug = (e) => {
      // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
      // console.log(formEl.current);
      // console.log(formEl.current.checkValidity());
      e.preventDefault();
  
      const isFormValid = formEl.current.checkValidity();
      if (isFormValid) {
        dispatch(
          raiseBugAction({
            bugTitle,
            ticketId,
            bugDescription,
            criticalLevel,
            bugStatus,
            bugSolution,
            staff : {
              staffId : staff
          },
            customer : {
                customerId : customer
            },
            project : {
                projectId : project
            }
          
          })
        );
  
        // clear the form
        setBugTitle("");
        setTicketId("");
        setBugDescription("");
        setCriticalLevel("");
        setBugStatus("");
        setBugSolution("");

        var LEVdropDown = document.getElementById("level");
      LEVdropDown.selectedIndex = 0;

     
      } else {
        e.stopPropagation();
        formEl.current.classList.add("was-validated");
      }
    };
  
   
   return (
    <div className="add" style={{ height: "750px" }}>
      <div className="alert alert-secondary">
      
       
          <center>
            <h2>Bug Raise</h2>
          </center>
    
      </div>
    
        <div> 
        {state.bug.progress && 
            <div className="row mb-1 justify-content-center">
              <div className="mx-4 alert alert-success w-75">
                Bug raised Successfully
              </div>
            </div>
        }
      </div>

      <form ref={formEl} className="mx-5 needs-validation" noValidate>
      <div className="row"> 
      <div className="col">
        <div className="row mb-1 ">  
          <input
            type="text"
            className="form-control form-control-lg w-75"
            value={bugTitle}
            placeholder="Enter bugTitle"
            onChange={updateBugTitle}
            required       
          />
        </div>


        

        <div className="row mb-1 ">  
          <input
            type="text"
            className="form-control form-control-lg w-75"
            value={bugDescription}
            placeholder="Enter bugDescription"
            onChange={updateBugDescription}
            required       
          />
        </div>

        <div className="row mb-1 ">
           <select
                className="custom-select custom-select-lg w-75"
                id = "level"
                onChange={(e) => {
                  const selectedCriticalLevel = e.target.value;
                  setCriticalLevel(selectedCriticalLevel);
                }}
              >
                <option value="">SELECT</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
         
        </div>
        <div className="row mb-1 ">  
          <input
            type="text"
            className="form-control form-control-lg w-75"
            value={staff}
            placeholder="Enter staffId"
            onChange={updateStaff}
            required    
          />
        </div>
        <div className="row mb-1 ">  
          <input
            type="text"
            className="form-control form-control-lg w-75"
            value={customerId}
            placeholder="Enter customerId"
            onChange={updateCustomer}
            required   
            readOnly 
          />
        </div>

        <div className="row mb-1 ">  
          <input
            type="text"
            className="form-control form-control-lg w-75"
            value={project}
            placeholder="Enter projectId"
            onChange={updateProject}
            required       
          />
        </div>
        

       

      
        <div>
          <div className="row mb-1">
          
              <input
                type="button"
                onClick={addNewBug}
                value="Add Bug"
                className="btn btn-lg btn-success w-75"
              />
        
          </div>
        </div>
        </div>
        <div className="col ">
        <div className="row justify-content-center text-primary mt-2">
       <h4>Available Staff Details</h4>
         </div>  
             
            {state.staff.staffList.map((item) => (
                
                 
<div className="row justify-content-center  mt-2">
                    <div className="mt-2 mb-4 text-light" >
                    <h5>Staff Id = {item.staffId} </h5>
                    <h5>Staff name = {item.name} </h5>
                    
                    </div> 
                    </div>
                    
            )
            )}
             </div>
             <div className="col ">
        <div className="row justify-content-center text-primary mt-2">
       <h4>Available project Details</h4>
         </div>  
             
            {state.project.projectList.map((item) => (
                
                 
<div className="row justify-content-center  mt-2">
                    <div className="mt-2 mb-4 text-light" >
                    <h5>Project Id = {item.projectId} </h5>
                    <h5>Project name = {item.projectName} </h5>
                    
                    </div> 
                    </div>
                    
            )
            )}
             </div>
             </div>
             
      </form>
    </div>
  );
   

};

