import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Filter from "../Filter";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ColorButton } from "../../../styles/button";
import { Link } from "react-router-dom";
import projectAPI from "../../../api/projectAPI";
import moment from "moment";
import axios from "axios";

ProjectList.propTypes = {};

function ProjectList(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [projects, setProjects] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idPrj, setIdPrj] = useState("");

  const handleClickOpenConfirm = (id) => {
    setIdPrj(id)
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const fetchData = async () => {
    await projectAPI.getList().then((response) => {
      setProjects(response.responseSuccess.filter(project => project.isActive));
      console.log(response.responseSuccess);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleDeletePrj = () => {
    axios.put(`https://localhost:7115/api/v1/project/disable/${idPrj}`).then((response)=>{
{response.isSuccess ? setShowAlert(true) : setShowAlertErr(true)}
window.location.reload(false)
    })
  }
  return (
    <>
      <Stack
        sx={{ marginTop: 1 }}
        justifyContent="space-around"
        direction="row"
        alignItems="center"
        spacing="57%"
      >
        <Stack
          justifyContent="space-around"
          direction="row"
          alignItems="center"
        >
          {/* <Button
              sx={{ marginRight: 10 }}
              size="small"
              color="success"
              startIcon={<ArrowBackIcon />}
              onClick={handleClose}
              variant="outlined"
            >
              Back
            </Button> */}
          <Typography variant="h5" component="h2" gutterBottom>
            List project
          </Typography>
        </Stack>
        <Link to="/admin/create-project">
          <ColorButton endIcon={<AddIcon />} variant="contained">
            Create project
          </ColorButton>
        </Link>
      </Stack>

      <Filter />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow hover>
              <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Project's name
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Start date <ArrowUpwardIcon sx={{ width: 20 }} />
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                End date <ArrowUpwardIcon sx={{ width: 20 }} />
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Course
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
               Participant Fee
              </TableCell>
                 <TableCell sx={{ fontWeight: 700 }} align="left">
               Leader
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
               Partner
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length ? projects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>

                  <TableCell component="th" scope="row">
                  <Link to="/admin/detail-project" state={project.id}>
                 
                      <Button sx={{ color: "black" }} variant="text">
                        {project.projectName}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    {moment(project.estimateTimeStart).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="left">
                    {moment(project.estimateTimeEnd).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="left">{project.course.skillName}</TableCell>
                  <TableCell align="left">
                    {project.fee}
                  </TableCell>
                  <TableCell align="left">
                    {project.joinProjects[0].staffs.fullName}
                  </TableCell>
                  <TableCell align="left">
                    {project.partner.name}
                  </TableCell>
                  <TableCell align="left">
                    {project.status === 0 ? (
                      <Chip label="New" color="warning" />
                    ) : project.status === 1 ? (
                      <Chip label="Start" color="primary" />
                    ) : project.status === 2 ? (
                      <Chip label="Process" color="secondary" />
                    ) : project.status === 3 ? (
                      <Chip label="Waitting" color="secondary" />
                    ) : project.status === 4 ? (
                      <Chip label="Finish" color="secondary" />
                    ): project.status === 5 ? (
                      <Chip label="Pending" color="secondary" />
                    ): project.status === 6 ? (
                      <Chip label="Cancel" color="secondary" />
                    ) : <></>}
                  </TableCell>
                  <TableCell>
                    {project.status ?   <Button
                             onClick={() => handleClickOpenConfirm(project.id)}
                             variant="contained"
                             color="error"
                           >
                             Delete
                           </Button> :   <Button
                             disabled
                             variant="contained"
                             color="error"
                           >
                             Delete
                           </Button>}
                  </TableCell>
                </TableRow>
              )) : <></>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

<Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
    Delete project successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErr} autoHideDuration={6000} onClose={() => setShowAlertErr(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlertErr(false)} severity="error" sx={{ width: '100%' }} >
   Delete project fail!!!
  </Alert>
</Snackbar>

<Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
     Delete Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           You want to delete this project???
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style= {{color: "#22a19a"}} onClick={handleCloseConfirm}>Cancel</Button>
          <ColorButton onClick={() => handleDeletePrj()} autoFocus>
            Delete
          </ColorButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProjectList;
