import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import {
  Alert,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Collapse,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import Filter from "../Filter";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ColorButton } from "../../../styles/button";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Stack } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CreateTask from "./CreateTask";
import DetailTask from "./DetailTask";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AssignStaff from "./AssignStaff";
import staffAPI from "../../../api/staffAPI";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";



TaskList.propTypes = {};

function TaskList(props) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const location = useLocation();
  const planState = location.state;
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [taskName, setTaskName] = useState("")
  const [taskDes, setTaskDes] = useState("")
  const [taskID, setTaskID] = useState({})
  const [taskDeadline, setTaskDeadline] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);

  const [showAlertUpdate, setShowAlertUpdate] = useState(false);
  const [showAlertErrUpdate, setShowAlertErrUpdate] = useState(false);
  

  const [newStaff, setNewStaff] = useState("");

  const [staffs, setStaffs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [taskList, setTaskList] = useState([]);

  const handleChangeSelected = (event, value) => setSelectedOptions(value);

  const handleSubmit = () => {
    for (var i = 0; i <= selectedOptions.length; i++) {
      selectedStaff.push(selectedOptions[i].id);
      
      console.log("map", selectedStaff);
      console.log("map", selectedOptions);
    }
setOpenAssign(false)
  };

  const handleClose = () => {
    setOpenAssign(props.onClose);
  };
  const fetchDataStaff = async () => {
    await staffAPI.getList().then((response) => {
      setStaffs(response.responseSuccess);
    });
  };
  React.useEffect(() => {
    fetchDataStaff().catch((error) => {
      console.log(error);
    });
  }, []);
 
  const handleCreateTask = () => {

    
  
   let  url =  `https://localhost:7115/api/v1/task/create?TaskName=${taskName}&Description=${taskDes}&DeadLine=${taskDeadline}&IsActive=true&FuturePlanId=${planState.id}` 
  
    
  
  
  
   
    
    for (let i = 0; i < selectedOptions.length; i++) {
     url += `&StaffId=${selectedOptions[i].id}`
  
   
   }
   console.log(url)

    axios.post(
      url
     
    ).then((response) => {   setOpenCreate(false);
      window.location.reload(false);
      {response.isSuccess ? setShowAlert(true) : setShowAlertErr(true)}
      });
 
  };




  const fetchDataTaskList = async () => {
    await axios.get(`https://localhost:7115/api/v1/task/getAllTask`).then((response) => {

      setTaskList(response.responseSuccess.filter(task => task.isActive))
  console.log("tasklisst", response.responseSuccess)

    })
  };
  React.useEffect(() => {
    fetchDataTaskList().catch((error) => {
      console.log(error);
    });
  }, []);

 
console.log("plan", planState)
 const handleChangeName = (e) => {
  setTaskName(e.target.value)
 }
 const handleChangeDes = (e) => {
  setTaskDes(e.target.value)
 }
  const handleClickOpenAssign = () => {
    setOpenAssign(true);
 
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);

  };
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenMember = () => {
    setOpenMember(true);
  };

  const handleCloseMember = () => {
    setOpenMember(false);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpenDetail = (task) => {
    setOpenDetail(true);
    setTaskID(task)
console.log("deatil", task)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOnChangeStaff = (e) => {
setNewStaff(e.target.value)
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
            Plan: {planState.planName}
          </Typography>
        </Stack>
        <ColorButton
          endIcon={<AddIcon />}
          onClick={handleClickOpenCreate}
          variant="contained"
        >
          Create task
        </ColorButton>
      </Stack>

      <Filter />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow hover>
              <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Title
              </TableCell>
              {/* <TableCell sx={{ fontWeight: 700 }} align="left">
                Created by
              </TableCell> */}
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Create date <ArrowUpwardIcon sx={{ width: 20 }} />
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                End date <ArrowUpwardIcon sx={{ width: 20 }} />
              </TableCell>
              {/* <TableCell sx={{ fontWeight: 700 }} align="left">
                Assign
              </TableCell> */}
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { taskList.length ? taskList.filter(tasks => tasks.futurePlanId === planState.id)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>

                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => handleClickOpenDetail(row)}
                      sx={{ color: "black" }}
                      variant="text"
                    >
                      {row.taskName}
                    </Button>
                  </TableCell>
                  <TableCell align="left">{moment(row.dateCreate).format("DD/MM/YYYY")}</TableCell>
                  <TableCell align="left">{moment(row.deadLine).format("DD/MM/YYYY")}</TableCell>
                  {/* <TableCell align="left">{row.carbs}</TableCell> */}
                  {/* <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={0.6}>
                      <Tooltip title={row.protein}>
                        <Avatar
                          sx={{ width: 24, height: 24 }}
                          src="/broken-image.jpg"
                        />
                      </Tooltip>
                      <IconButton onClick={handleClickOpenAssign} aria-label="delete">
                <PersonAddAlt1Icon sx={{ color: "#22a19a" }} />
              </IconButton>
                    </Stack>
                  </TableCell> */}
                  <TableCell align="left">
                    {row.status === 0 ? (
                      <Chip label="To do" color="warning" />
                    ) : row.status  === 1 ? (
                      <Chip label="Process" color="primary" />
                    ) : row.status  === 2 ? (
                      <Chip label="Review" color="secondary" />
                    ) : (
                      <Chip label="Done" color="success" />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {row.status  === 0 ? (
                      <Button
                       
                        color="error"
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button disabled size="small" variant="contained">
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )):<></>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={planState?.empTasks?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CreateTask show={openCreate} close={() => setOpenCreate(false)} />

      {/* deatil task */}
      <DetailTask show={openDetail} close={() => setOpenDetail(false)} task= {taskID} setShowAlertUpdate = {setShowAlertUpdate} setShowAlertErrUpdate={setShowAlertErrUpdate}/>

      {/* deatil member task */}
      {/* <Dialog
        maxWidth={false}
        open={openMember}
        onClose={handleCloseMember}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p>Task 1</p>
          <p
            style={{ padding: "6px 0px 0px 10px" }}
            className="title-section"
          ></p>
        </DialogTitle>
        <DialogContent>
          <ul style={{ lineHeight: 3.5, listStyle: "none" }}>
            <li>
              Project: <b>Study overseas</b>
            </li>
            <li>
              Assign:{" "}
              <Chip style={{ marginRight: "20px" }} label="Nguyen Cong Khanh" />
              <Chip style={{ marginRight: "20px" }} label="Nguyen Cong Khanh" />
            </li>
            <li style={{ marginTop: 2 }}>
              Dealine: <b>20/12/2023</b>
            </li>
            <li style={{ marginTop: 2 }}>
              Status:{" "}
              <FormControl sx={{ width: 240 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleChangeStatus}
                  size="small"
                >
                  <MenuItem value={0}>To do</MenuItem>
                  <MenuItem value={1}>Process</MenuItem>
                  <MenuItem value={2}>Review</MenuItem>
                  <MenuItem value={33}>Done</MenuItem>
                </Select>
              </FormControl>
            </li>
          </ul>
          <p className="title-section">Description</p>
          <textarea
            placeholder="Click to add Description"
            style={{ width: 766, height: 250 }}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={handleCloseMember}
            variant="text"
            sx={{ color: "#22a19a" }}
          >
            Cancel
          </Button>

          <ColorButton
            size="small"
            onClick={handleCloseMember}
            variant="contained"
          >
            Save & close
          </ColorButton>
        </DialogActions>
      </Dialog> */}

      {/* create task */}
      <Dialog
        maxWidth={false}
        open={openCreate}
        onClose={handleClickOpenCreate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <TextField
            sx={{ width: "80%" }}
            id="standard-basic"
            variant="standard"
            value={taskName}
            onChange = {handleChangeName}
          />
          <p
            style={{ padding: "6px 0px 0px 10px" }}
            className="title-section"
          ></p>
        </DialogTitle>
        <DialogContent>
          <ul style={{ lineHeight: 3.5, listStyle: "none" }}>
            <li>
              Plan: <b style={{marginLeft: "20px"}}>{planState.planName}</b>
            </li>
            <li>
              Assign:{" "}
              {selectedOptions.length ? selectedOptions.map((select, index) => (
                <Chip style={{marginRight: "15px", marginLeft: "10px"}} label={select.fullName}></Chip>
              )): <></>}
              <IconButton onClick={handleClickOpenAssign} aria-label="delete">
                <PersonAddAlt1Icon sx={{ color: "#22a19a" }} />
              </IconButton>
            </li>
            <li style={{ marginTop: 2 }}>
              Dealine:{" "}
              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={taskDeadline}
                  onChange={(newValueTo) => {
                    setTaskDeadline(newValueTo);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </li>
          </ul>
          <p className="title-section">Description</p>
          <textarea
            placeholder="Click to add description"
            style={{ width: 766, height: 250 }}
            value={taskDes}
            onChange={handleChangeDes}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={handleCloseCreate}
            variant="text"
            sx={{ color: "#22a19a" }}
          >
            Cancel
          </Button>

          <ColorButton onClick={() => {handleCreateTask()}} size="small" variant="contained">
            Create task
          </ColorButton>
        </DialogActions>

      {/* assign */}
      
      </Dialog>
      <Dialog
        open={openAssign}
        onClose={handleCloseAssign}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            <Typography variant="h5" component="h2" gutterBottom>
              Assign task
            </Typography>
          }
        </DialogTitle>
        <DialogContent>
        {/* <FormControl fullWidth>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newStaff}
                    name="leader"
                    onChange={handleOnChangeStaff}
                    sx={{ backgroundColor: "white" }}
                  >
                    {staffs.map((syl, index) => (
                      <MenuItem key={index} value={syl.id}>
                        {syl.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
          <Autocomplete
            style={{ width: "500px" }}
            multiple
            id="tags-outlined"
            options={staffs}
            getOptionLabel={(option) => option.fullName}
            onChange={handleChangeSelected}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} placeholder="Assign member" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssign}>Cancel</Button>
          <Button onClick={() => {handleCloseAssign(); handleSubmit()}} autoFocus>
            Assign
          </Button>
        </DialogActions>
        {/* <DetailTask show={viewDetailTask} close={() => setViewDetailTask(false)} task={}/> */}
      </Dialog>
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
    Create task successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErr} autoHideDuration={6000} onClose={() => setShowAlertErr(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlertErr(false)} severity="error" sx={{ width: '100%' }} >
    Create task fail!!!!
  </Alert>
</Snackbar>



<Snackbar open={showAlertUpdate} autoHideDuration={6000} onClose={() => setShowAlertUpdate(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
    Update task successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErrUpdate} autoHideDuration={6000} onClose={() => setShowAlertErrUpdate(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlertErrUpdate(false)} severity="error" sx={{ width: '100%' }} >
   Update task successful!!!!
  </Alert>
</Snackbar>
     {/* {showAlert === false ?  <Collapse in={showAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>: <></>} */}
    </>
  );
}

export default TaskList;
