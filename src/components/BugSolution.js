import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bugSolutionAction } from "../redux/BugReducer";

export const BugSolution = () => {
    
  
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
    console.log(state);
  
    const formEl = useRef();

 const [bugId, setBugId] = useState(state.bug.uref.bugId);
    const [bugTitle, setBugTitle] = useState(state.bug.uref.bugTitle);
    const [ticketId, setTicketId] = useState(state.bug.uref.ticketId);
    const [bugDescription, setBugDescription] = useState(state.bug.uref.bugDescription); 
    const [bugSolution, setBugSolution] = useState(state.bug.uref.bugSolution);
    const [bugRaisedDate, setBugRaisedDate] = useState(state.bug.uref.bugRaisedDate)

 const updateBugId = (e) => setBugId(e.target.value);
    const updateBugTitle = (e) => setBugTitle(e.target.value);
    const updateTicketId = (e) => setTicketId(e.target.value); 
    const updateBugDescription = (e) => setBugDescription(e.target.value);
    const updateBugSolution = (e) => setBugSolution(e.target.value);
    const updateBugRaisedDate = (e) => setBugRaisedDate(e.target.value);

    const giveBugSolution = (e) => {
        e.preventDefault();
    
        const isFormValid = formEl.current.checkValidity();
        if (isFormValid) {
          dispatch(
            bugSolutionAction({
              bugId: state.bug.uref.bugId,  
              bugSolution,     
            })
          );
    
          // clear the form
          // setBugSolution("");
          // setBugTitle("");
          // setBugDescription("");
          // setTicketId("");
          // setBugRaisedDate("");
         
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
              <h2> Bug Solution </h2> 
        </center> 
      </div>  

      <div> 
        {state.bug.progress && 
            <div className="row mb-1 justify-content-center">
              <div className="mx-4 alert alert-success w-75">
                Solution saved Successfully
              </div>
            </div>
        }
      </div>

      <form ref={formEl} className="mx-4 needs-validation" noValidate>

<div className="row">
    <div className="col-6 ml-3">

    <div className="row justify-content-center text-primary mt-2">
       <h4>Bug Details</h4>
         </div> 
         
         <div className="row text-primary ml-2 mt-2">
       <h5>Bug Id</h5>
       </div>
         <div>  
          <input
            type="text"
            className="form-control form-control-m w-50"
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
            className="form-control form-control-m w-50"
            value={bugTitle}
            placeholder="Enter Bug title"
            onChange={updateBugTitle}
            required 
            readOnly   
          />
        </div>

        <div className="row text-primary ml-2 mt-2">
       <h5>Bug Description</h5>
       </div>
         <div>  
          <textarea
            type="text"
            className="form-control form-control-m w-50"
            rows="3"
            value={bugDescription}
            placeholder="Enter Bug description"
            onChange={updateBugDescription}
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
            className="form-control form-control-m w-50"
            value={ticketId}
            placeholder="Enter Ticket Id"
            onChange={updateTicketId}
            required  
            readOnly  
          />
        </div>   
        
        <div className="row text-primary ml-2 mt-2">
       <h5>Bug Raised date</h5>
       </div>
         <div>  
          <input
            type="text"
            className="form-control form-control-m w-50"
            value={bugRaisedDate}
            placeholder="Enter Raised date"
            onChange={updateBugRaisedDate}
            required 
            readOnly   
          />
        </div>
       


       
</div>

<div className="col-5">
        
<div className="row justify-content-center text-primary mt-2 mb-4">
       <h3>Give your Solution</h3>
         </div>  
              <textarea 
                  className="Text1" 
                  cols="75" 
                  rows="12"  
                  placeholder="Enter Solution"
                  value={bugSolution}
                  onChange={updateBugSolution}
                > 
             </textarea>
        
             <div className="row mb-1 mt-4 justify-content-center">
             <input
                type="button"
                onClick={giveBugSolution}
                value="Post your Answer"
                className="btn btn-lg mb-2 ml-4 btn-success w-50"
              />    
       </div>
        </div>
        </div>  
  </form>
    </div>
        );

}