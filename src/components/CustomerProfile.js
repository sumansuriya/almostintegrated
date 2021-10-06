import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCustomerDetailsAction } from "../redux/CustomerProfileReducer";
import profilepic from "../bug2.png";
//import back from "../image12.jpg";
//import profilepic from "../bug2.png";


export const CustomerProfile = () => {
  

const dispatch = useDispatch();
const history = useHistory();
const state = useSelector((state) => state);

console.log(state);

const formEl = useRef();

useEffect(() => {
  dispatch(getCustomerDetailsAction(customerId));
}, []);

// const staffId = state.staffProfile.stfProfile.staffId;
// const name = state.staffProfile.stfProfile.name;
// const emailId = state.staffProfile.stfProfile.emailId;
// const userId = state.staffProfile.stfProfile.userId;
// const password = state.staffProfile.stfProfile.password;
// const mobileNo = state.staffProfile.stfProfile.mobileNo;
// const bugCount = state.staffProfile.stfProfile.bugCount;
// const designation = state.staffProfile.stfProfile.designation;

const name = state.customerProfile.CustomerProfile.name;
  const username = state.customerProfile.CustomerProfile.username;
  const password = state.customerProfile.CustomerProfile.password;
  const emailid = state.customerProfile.CustomerProfile.emailid;
  const gender = state.customerProfile.CustomerProfile.gender
  const mobilenumber = 
    state.customerProfile.CustomerProfile.mobilenumber
  ;
  const ticketcount = state.customerProfile.CustomerProfile.ticketcount;
  const customerId = localStorage.getItem("userid");



  console.log(state.customerProfile.CustomerProfile);

  return (
    <div 
    style={{ height: "130vh",
    
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"}}
    >

    <form>
 
</form>


      <div className="d-flex flex-row-reverse alert alert-info">  
         <span className="col-5 p-1">  
             <Link to="/customer-update">
                 <h5 className="text-right"> Edit Profile </h5> 
             </Link>
         </span> 
           
         <center> 
              <h2> Customer Profile </h2> 
        </center> 
      </div>  
      

      <div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar mb-1">
         
				<img src={profilepic}
          width="210" height="200" alt="Maxwell Admin"/>
				</div>
        <center>
				<h4 class="user-name mb-1">Hello!</h4>
				<h4 class="user-email mb-3" >Welcome to E-Bug Tracker</h4></center>
			</div>
      
			<div class="about">
      <h5 class="ml-2 mb-1">About</h5>
				<p className="p-1"> A bug tracking system is a software application that is designed to help programmers to keep track of reported software bugs in their work.</p>
        <br></br>
        <p></p>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h5 class="mb-2 text-primary">Customer Details</h5>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Name"> Name</label>
					<input type="text" class="form-control" id="Name" value={name} readOnly placeholder="Enter Name"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="EmailId">EmailId</label>
					<input type="text" class="form-control" id="EmailId" value={emailid} readOnly placeholder="Enter emailId"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="StaffID">Customer ID</label>
					<input type="text" class="form-control" id="CustomerID" value={customerId} readOnly placeholder="Enter CustomerId"/>
          <div class="form-group"><br></br>
					<label for="UserName mb-1">UserName</label>
					<input type="text" class="form-control" id="UserName" value={username} readOnly  placeholder="Enter UserName"/>
				</div>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="Mobile No mb-1">Mobile Number</label>
					<input type="text" class="form-control" id="Mobile Number" value={mobilenumber} readOnly placeholder="Enter Mobile No"/>
        <div class="form-group"><br></br>
					<label for="Bug Count mb-1" >Ticket Count</label>
					<input type="text" class="form-control" id="ticketcount" value={ticketcount} readOnly placeholder="Enter Bug Count"/>
				</div>
        </div>
        
			</div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group ">
					<label for="Mobile No mb-1">Gender</label>
					<input type="text" class="form-control" id="Gender" value={gender} readOnly placeholder="Enter Gender"/>
        
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
};