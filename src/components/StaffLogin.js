import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import background from "../7.jpg";
import icon from"../icon.png";
import { authenticateStaffAction } from "../redux/StaffProfileReducer";

export const StaffLogin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const updateUserId = (e) => setUserId(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const SignInStaff = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      // dispatch the call to redux ::for API CALL
      dispatch(authenticateStaffAction({ userId, password }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  // REACT ROUTE DOM
  if (state.staffProfile.authSuccess === true) {
    // redirecting the user /employee-list page;
    // history.push("/employee-list");
    history.push("/staff-profile");
  }

  return (
    <div
      className="bg-transparent d-flex justify-content-center align-items-center"
      style={{ height: "100vh",
      backgroundImage: `url(${background})`, 
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat"}}
    >
      <div className="w-50">
      <div className="row  justify-content-center ">
            <img align="center" src={icon} height="10%" width="10%" />{" "}
            </div>
        <h2 className="text-center mb-4 alert alert-transparent text-dark">STAFF</h2>
        
        {state.staffProfile.authFailure && (
                    <div className="row justify-content-center">
          <h6 className="text-center alert alert-danger w-50">
            Invalid Credentials
          </h6>
          </div>
        )}

        <form ref={formEl} className="needs-validation" noValidate>
          <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="text"
              placeholder="Enter UserId"
              value={userId}
              onChange={updateUserId}
              className="form-control form-control-lg w-50"
              required
            />
          </div>
          </div>

          <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="password"
              value={password}
              onChange={updatePassword}
              placeholder="Enter Password"
              className="form-control form-control-lg mb-1 w-50"
              required
            />
          </div>
          </div>

          <div>
            
          <div className="row mb-1 justify-content-center">
            <input
              type="button"
              value="SIGN IN"
              onClick={SignInStaff}
              className="btn btn-success btn-lg w-50"
            />
          </div>
          </div>

        </form>
      </div>
    </div>
  );
};