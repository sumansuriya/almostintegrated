import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  deleteProjectAction,
  getAllProjectAction,
  updateRenderAction,
} from "../redux/ProjectReducer";

export const ProjectList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllProjectAction());
  }, []);

  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.projectId);
    //   Dispatch the call
    dispatch(deleteProjectAction(item));
  };

  const updateRecord = (item) => {
    console.log("UpdateRecord", item.projectId);
    dispatch(updateRenderAction(item));
    history.push("/project-upsert");
  };

  return (
    <div>
      {/* <h1>Hi</h1> */}
      <div className="bg bg-dark p-3 d-flex mb-3 justify-content-end ">
        <Link to="/project-list">
          <h6 className="mr-4">PROJECT LIST </h6>
        </Link>
        <Link to="/project-upsert">
          <h6 className="mr-4">PROJECT UPSERT</h6>
        </Link>
      </div>
      <div>
        <center>
          <h3 className="mt-4 mb-3" style={{ fontFamily: "initial" }}>
            LIST OF PROJECTS
          </h3>
        </center>
      </div>
      <table className="table">
        <thead
          className="thead-dark"
          style={{ fontFamily: "initial", fontSize: "19px" }}
        >
          <tr>
            <th scope="col">
              <center>Project ID</center>
            </th>
            <th scope="col">
              <center>Project Name</center>
            </th>
            <th scope="col">
              <center>Project Description</center>
            </th>
            <th scope="col">
              <center>Action</center>
            </th>
          </tr>
        </thead>
        <tbody>
          {state.project.projectList.map((item, index) => (
            <tr key={index}>
              <th scope="row">
                <center>{item.projectId}</center>
              </th>
              <td>{item.projectName}</td>
              <td>{item.projectDescription}</td>
              <td>
                <center>
                  <Button
                    className="mr-3"
                    startIcon={<UpdateIcon />}
                    variant="contained"
                    color="primary"
                    // size="small"
                    onClick={() => updateRecord(item)}
                  >
                    Update
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    color="secondary"
                    // size="small"
                    onClick={() => deleteRecord(item)}
                  >
                    Delete
                  </Button>

                  {/* <input
                    type="button"
                    value="Update"
                    className="btn btn-outline-secondary btn-sm mr-1"
                    onClick={() => updateRecord(item)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => deleteRecord(item)}
                    className="btn btn-outline-danger btn-sm"
                  /> */}
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
