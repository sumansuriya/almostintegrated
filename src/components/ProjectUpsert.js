import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectAction,
  updateProjectAction,
  updateRenderAction,
} from "../redux/ProjectReducer";

export const ProjectUpsert = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [projectName, setProjectName] = useState(
    state.project.uref.projectName
  );
  const [projectDescription, setProjectDescription] = useState(
    state.project.uref.projectDescription
  );

  const updateProjectName = (e) => setProjectName(e.target.value);
  const updateProjectDescription = (e) => setProjectDescription(e.target.value);

  const addNewProject = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createProjectAction({
          projectName,
          projectDescription,
        })
      );

      // Clear the form
      setProjectName("");
      setProjectDescription("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateProject = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      // console.log(state.project.uref.projectId);
      dispatch(
        updateProjectAction({
          projectId: state.project.uref.projectId,
          projectName,
          projectDescription,
        })
      );

      // Clear the form
      setProjectName("");
      setProjectDescription("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const resetForm = () => {
    dispatch(updateRenderAction({}));

    setProjectName("");
    setProjectDescription("");
  };

  return (
    <div
      className="bg bg-light p-4"
      style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <div className="bg-dark p-3 d-flex mb-2 justify-content-end">
        <Link to="/project-list">
          <h6 className="mr-3">PROJECT LIST</h6>
        </Link>

        <Link to="/project-upsert">
          <h6 onClick={resetForm} className="mr-3">
            PROJECT UPSERT
          </h6>
        </Link>
      </div>

      <div>
        <center>
          <div
            className="alert alert-primary w-75"
            style={{
              fontFamily: "initial",
              // fontSize: "27px",
            }}
          >
            {state.project.uref.projectId ? (
              <h3>UPDATE PROJECT DETAILS</h3>
            ) : (
              <h3>CREATE PROJECT</h3>
            )}
          </div>
        </center>

        {state.project.progress && (<center>
          <div className="mx-4 alert alert-success w-75">Operation Success</div></center>
        )}
        <div className="container alert alert-warning w-75">
          <center>
            <form ref={formEl} mx-4 className="needs-validation" noValidate>
              <h4
                className="mt-2"
                style={{
                  fontFamily: "initial",
                  fontSize: "27px",
                }}
              >
                Project Name
              </h4>
              <input
                type="text"
                value={projectName}
                onChange={updateProjectName}
                className="form-control form-control-lg mt-3 mb-4 w-75"
                style={{
                  fontFamily: "initial",
                  fontSize: "25px",
                }}
                placeholder="Enter Project Name"
                minLength="5"
                maxLength="30"
                required
              />
              <div>
                <h4
                  style={{
                    fontFamily: "initial",
                    fontSize: "27px",
                  }}
                >
                  Project Description
                </h4>
                <input
                  type="text"
                  value={projectDescription}
                  onChange={updateProjectDescription}
                  className="form-control form-control-lg mt-3 mb-4 w-75"
                  style={{
                    height: "85px",
                    fontFamily: "initial",
                    fontSize: "25px",
                    // lineHeight: "14px",
                  }}
                  placeholder="Enter Project Description"
                  minLength="10"
                  maxLength="100"
                  required
                />
              </div>
              <div>
                {state.project.uref.projectId ? (
                  <input
                    type="button"
                    onClick={updateProject}
                    value="Update Project"
                    className="btn btn-lg btn-primary w-50"
                    style={{
                      fontFamily: "initial",
                      // fontSize: "27px",
                    }}
                  />
                ) : (
                  <input
                    type="button"
                    onClick={addNewProject}
                    value="Add Project"
                    className="btn btn-lg btn-success w-50 mb-2"
                    style={{
                      fontFamily: "initial",
                      // fontSize: "27px",
                    }}
                  />
                )}
              </div>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};
