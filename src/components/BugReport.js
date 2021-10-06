import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getBugReportAction } from "../redux/BugAssignReducer";

import back from "../image12.jpg";
import profilepic from "../bug2.png";


export const BugReport = () => {
  

const dispatch = useDispatch();
const history = useHistory();
const state = useSelector((state) => state);

console.log(state);

const formEl = useRef();

useEffect(() => {
  dispatch(getBugReportAction());
}, []);

const totalBugs = state.bugAssign.bugReport.totalBugs;
const completedBugs = state.bugAssign.bugReport.completedBugs;
const pendingBugs = state.bugAssign.bugReport.pendingBugs;
const completedPercentage = state.bugAssign.bugReport.completedPercentage;


return (
    <div>

<div
style={{ height: "130vh",
backgroundImage: `url(${back})`, 
backgroundSize:"cover",
backgroundRepeat:"no-repeat"}}
>

  <div className="d-flex flex-row-reverse alert alert-info">  
     <span className="col-5 p-1">  
         <Link to="/bug-report">
             <h5 className="text-right"> Back </h5> 
         </Link>
     </span> 
       
     <center> 
          <h2> Bug Report </h2> 
    </center> 
  </div>  
  

  <div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
<div class="card-body">
    <div class="account-settings">
        <div class="user-profile">
            <div class="user-avatar mb-4">
     
                <img src={profilepic}
      width="210" height="200" alt="Maxwell Admin"/>
            </div>
    <center>
            <h4 class="user-name mb-1">Hello!</h4>
            <h4 class="user-email mb-3" >Welcome to E-Bug Tracker</h4></center>
        </div>
  
      
    </div>
</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
				<h5 class="mb-2 text-primary">Complete Bug Report</h5>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Name"> Pending Bugs</label>
					<input type="text" class="form-control" id="Name" value={pendingBugs} readOnly placeholder="Enter pending bugs"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="EmailId">Completed Bugs</label>
					<input type="text" class="form-control" id="EmailId" value={completedBugs} readOnly placeholder="Enter completed bugs"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="StaffID">Total Bugs</label>
					<input type="text" class="form-control" id="StaffID" value={totalBugs} readOnly placeholder="Enter total bugs"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="Mobile No mb-1">Completed Percentage</label>
					<input type="text" class="form-control" id="Mobile No" value={completedPercentage} readOnly placeholder="Enter completed percentage"/>
       
        </div>
        
			</div>
		</div>
		
	</div>
</div>
</div>
</div>
</div>

</div>
</div>
);
}