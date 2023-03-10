import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ColorButton } from "../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import ScrollableTab from "../task/Tabs";
import BasicTabs from "../task/Tabs";
import projectAPI from "../../../api/projectAPI";
import staffAPI from "../../../api/staffAPI";
import partnerAPI from "../../../api/partnerAPI";
import courseAPI from "../../../api/courseAPI";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignLeader from "./AssignLeader";
import AssignPartner from "./AssignPartner";
import CreateCourse from "../course/CreateCourse";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

DetailProject.propTypes = {};

function DetailProject(props) {

  const location = useLocation();
  const projectID = location.state;
  const [editName, setEditName] = useState("");
  const [editEstimate_start, setEditEstimate_start] = useState(null);
  const [editEstimate_end, setEditEstimate_end] = useState(null);
  const [editRegis_open, setEditRegis_open] = useState(null);
  const [editRegis_close, setEditRegis_close] = useState(null);
  const [official_start, setOfficial_start] = useState(null);
  const [official_end, setOfficial_end] = useState(null);
  const [editCourse, setEditCourse] = useState("");
  const [editPartner, setEditPartner] = useState("");
  const [editLeader, setEditLeader] = useState("");
  const [editFee, setEditFee] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [itemCancel, setItemCancel] = useState(null);
  const [project, setProject] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [partner, setPartner] = useState([]);
  const [leader, setLeader] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openAssignLeader, setOpenAssignLeader] = useState(false);
  const [openAssignPartner, setOpenAssignPartner] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [editStaffname, setEditStaffName] = useState({});
  const [editPartnername, setEditPartnerName] = useState("");
  const [staffName, setStaffName] = useState("");
  
  const [newPartner, setNewPartner] = useState([]);
  const [newLeader, setNewLeader] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };


  //fetch data project
  const fetchData = async () => {
    await projectAPI.getProjectDetail(projectID).then((response) => {
      setProject(response.responseSuccess[0]);
      setEditStaffName( response.responseSuccess[0].joinProjects[0]);
      setEditName(response.responseSuccess[0].projectName);
      setEditEstimate_start(response.responseSuccess[0].estimateTimeStart);
      setEditEstimate_end(response.responseSuccess[0].estimateTimeEnd);
      setEditRegis_open(response.responseSuccess[0].estimateTimeStart);
      setEditRegis_close(response.responseSuccess[0].estimateTimeEnd);
      setOfficial_start(response.responseSuccess[0].officalTimeStart);
      setOfficial_end(response.responseSuccess[0].officalTimeEnd);
      setEditCourse(response.responseSuccess[0].courseId);
      setEditPartner(response.responseSuccess[0].partnerId);
      setEditLeader(response.responseSuccess[0].leaderId);

      {response.responseSuccess[0].description != "null" ? setEditDescription(response.responseSuccess[0].description) : setEditDescription("")}
      
      setEditFee(response.responseSuccess[0].fee)
      setStaffName(response.responseSuccess[0].joinProjects[0]?.staffs?.fullName)
      setEditPartnerName(response.responseSuccess[0].partner?.name)
      setEditStatus(response.responseSuccess[0].status)
   
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);



  // fetch data partner
  const fetchDataCourse = async () => {
    await courseAPI.getList().then((response) => {
      setCourses(response.responseSuccess);
    });
  };
  useEffect(() => {
    fetchDataCourse().catch((error) => {
      console.log(error);
    });
  }, []);
 


  useEffect(() => {
    if (project != null) {
    
    }
  }, [project]);
  // console.log("project.leader.staff.fullname", project.leader.staff.fullname)
  console.log("project", project)
  const handleOnChangeName = (event) => {
    setEditName(event.target.value);
  };
  const handleOnChangeCourse = (event) => {
    setEditCourse(event.target.value);
  };
  const handleOnChangePartner = (event) => {
    setEditPartner(event.target.value);
  };
  const handleOnChangeLeader = (event) => {
    setEditLeader(event.target.value);
  };
  const handleOnChangeDes = (event) => {
    setEditDescription(event.target.value);
  };
  const handleOnChangeStatus = (event) => {
    setEditStatus(event.target.value);
  };
  const handleOnChangeFee = (event) => {
    setEditFee(event.target.value);
  };
  const handleOnChangeFile = (event) => {
    setItemCancel(event.target.files[0]);
  };

  const handleUpdate1 = () => {
    axios.put(`https://localhost:7115/api/v1/project/update/${projectID}?ProjectName=${editName}&Description=${editDescription}&
    Creater=%22%22&IsActive=true&EstimateTimeStart=${editEstimate_start}&EstimateTimeEnd=${editEstimate_end}&OfficalTimeStart=${official_start}&OfficalTimeEnd=${official_end}&DateCreate=2023-03-17T17%3A00%3A00&DateEnd=2023-03-17T17%3A00%3A00&DateOpenRegis=${editRegis_open}&DateCloseRegis=${editRegis_open}&Fee=${editFee}&Status=${editStatus}&LeaderId=${editLeader}&CourseId=${editCourse}&PartnerId=${editPartner}`).then((response) => {
      {response.isSuccess ? setShowAlert(true) : setShowAlertErr(true)}
window.location.reload(false)
    })
  }

  const handleUpdate2 = () => {
    axios.put(`https://localhost:7115/api/v1/project/update/${projectID}?ProjectName=${editName}&Description=${editDescription}&
    Creater=%22%22&IsActive=true&EstimateTimeStart=${editEstimate_start}&EstimateTimeEnd=${editEstimate_end}&DateCreate=2023-03-17T17%3A00%3A00&DateEnd=2023-03-17T17%3A00%3A00&DateOpenRegis=${editRegis_open}&DateCloseRegis=${editRegis_open}&Fee=${editFee}&Status=${editStatus}&LeaderId=${editLeader}&CourseId=${editCourse}&PartnerId=${editPartner}`).then((response) => {
      {response.isSuccess ? setShowAlert(true) : setShowAlertErr(true)}
      window.location.reload(false)
    })
  }
const handleUpdateProject = () => {
  {official_start & official_end != null ? handleUpdate1() : handleUpdate2() }
  
}

  return (
    <>
      <form onSubmit={handleUpdateProject}>
        <Box>
          <Stack>
            <Link>
              <Button
                sx={{
                  float: "left",
                }}
                variant="outlined"
                color="success"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Link>
            <p
              style={{ padding: "6px 0px 0px 10px", marginTop: 40 }}
              className="title-section"
            >
              DETAIL PROJECT
            </p>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F8F8F8",
              width: "100%",
              padding: "40px 20px 20px 40px",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid black",
                borderBottomWidth: "100%",
              }}
          style={{display: "flex",justifyContent: "space-between", alignItems: "baseline",}}
            >
              <Typography
                sx={{
                  paddingBottom: 2,
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Detail project
              </Typography>
              {/* <ColorButton size="small"  endIcon={<AddIcon />}>Create Task</ColorButton> */}
            </Box>

            <Box
              sx={{
                marginTop: 3,
              }}
            >
              <Typography
                sx={{
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Project's Name
              </Typography>
              <StyledTextField
                label="Project's name"
                autoComplete="off"
                fullWidth
                size="small"
                name="name"
                value={editName}
                onChange={handleOnChangeName}
              />
            </Box>
            <Stack
              sx={{
                marginTop: 3,
              }}
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              spacing="5%"
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Estimate time start
                </Typography>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="To date"
                    value={editEstimate_start}
                    onChange={(newValueTo) => {
                      setEditEstimate_start(newValueTo);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <StyledTextField
                        onKeyDown={onKeyDown}
                        size="small"
                        {...params}
                        sx={{ backgroundColor: "white" }}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Estimate time end
                </Typography>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="To date"
                    name="estimate_end"
                    value={editEstimate_end}
                    onChange={(newValueTo) => {
                      setEditEstimate_end(newValueTo);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <StyledTextField
                        onKeyDown={onKeyDown}
                        size="small"
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>

            <Stack
              sx={{
                marginTop: 3,
              }}
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              spacing="5%"
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Registration Opening Time
                </Typography>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="To date"
                    value={editRegis_open}
                    onChange={(newValueTo) => {
                      setEditRegis_open(newValueTo);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <StyledTextField
                        onKeyDown={onKeyDown}
                        size="small"
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Registration Closing Time
                </Typography>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="To date"
                    name="regis_close"
                    value={editRegis_close}
                    onChange={(newValueTo) => {
                      setEditRegis_close(newValueTo);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <StyledTextField
                        onKeyDown={onKeyDown}
                        size="small"
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
            <Stack
              sx={{
                marginTop: 3,
              }}
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              spacing="5%"
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Official Time Start
                </Typography>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="To date"
                    value={official_start}
                    onChange={(newValueTo) => {
                      setOfficial_start(newValueTo);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <StyledTextField
                        onKeyDown={onKeyDown}
                        size="small"
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Official Time End
                </Typography>
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="To date"
                    name="regis_close"
                    value={official_end}
                    onChange={(newValueTo) => {
                      setOfficial_end(newValueTo);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <StyledTextField
                        onKeyDown={onKeyDown}
                        size="small"
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>

            <Stack
              sx={{
                marginTop: 3,
              }}
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              spacing="5%"
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Course
                </Typography>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editCourse}
                    name="course"
                    onChange={handleOnChangeCourse}
                    sx={{ backgroundColor: "white" }}
                  >
                     <MenuItem value="">
                     <MenuItem>  <ColorButton
          onClick={() => setOpenCreate(true)}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Create Course
          </ColorButton></MenuItem>
        </MenuItem>
                    {courses.map((course, index) => (
                      <MenuItem key={index} value={course.id}>
                        {course.activity}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Participant Fee
                </Typography>
                {/* <StyledTextField
             type="number"
                  label="Participant Fee"
                  autoComplete="off"
                  fullWidth
                  size="small"
                  name="fee"
                  value={editFee}
                  onChange={handleOnChangeFee}
                /> */}
                  <OutlinedInput
           style={{backgroundColor: "white"}}
               type="number"
          
               autoComplete="off"
               fullWidth
               size="small"
               name="fee"
               value={editFee}
               onChange={handleOnChangeFee}
               startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
              </Box>
            </Stack>

            <Stack
              sx={{
                marginTop: 3,
              }}
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              spacing="5%"
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Leader
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
      
                  {(newLeader.length !== 0) ? (<Chip label={newLeader.fullName}/>) : (<Chip label={staffName}/>)}

                  <IconButton onClick={() => setOpenAssignLeader(true)} aria-label="fingerprint" color="secondary">
                    <PersonAddIcon style={{ color: "#22a19a" }} />
                  </IconButton>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Partner
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                
                  {(newPartner.length != 0) ? (<Chip label={newPartner.name}/>) : (<Chip label={editPartnername}/>)}
                  <IconButton onClick={() => setOpenAssignPartner(true)} aria-label="fingerprint" color="secondary">
                    <PersonAddIcon style={{ color: "#22a19a" }} />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>

            <Box
              sx={{
                marginTop: 3,
              }}
            >
              <Typography
                sx={{
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Project Description
              </Typography>
              <StyledTextField
                label="Description"
                autoComplete="off"
                fullWidth
                size="small"
                name="description"
                value={editDescription}
                onChange={handleOnChangeDes}
                multiline={true}
              />
            </Box>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Project status
              </Typography>
              <FormControl sx={{ width: "50%" }}>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editStatus}
                  name="course"
                  onChange={handleOnChangeStatus}
                  sx={{ backgroundColor: "white" }}
                >
                   
                  <MenuItem value={0}>New</MenuItem>
                  <MenuItem value={1}>Start</MenuItem>
                  <MenuItem value={2}>Process</MenuItem>
                  <MenuItem value={3}>Waitting</MenuItem>
                  <MenuItem value={4}>Finish</MenuItem>
                  <MenuItem value={5}>Pending</MenuItem>
                  <MenuItem value={6}>Cancel</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleClickOpen();
                }}
              >
                Cancel Project
              </Button>
    
              <ColorButton
                onClick={() => {
                  handleUpdateProject();
                }}
                variant="contained"
              >
               Update Project
              </ColorButton>
            </Stack>
          </Box>
        </Box>
      </form>
      <Dialog
        maxWidth={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p style={{ padding: "6px 0px 0px 10px" }} className="title-section">
            CANCEL PROJECT
          </p>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Cancellation Reason
          </Typography>
          <textarea
            placeholder="Please specify the reason for cancellation"
            style={{ width: 766, height: 250 }}
          ></textarea>
          <Box
            sx={{
              marginTop: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              File Attack (Extension File: "xlsx", "pdf", "docx", "doc", "xls",
              "jpg", "png","zip".)
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
              }}
            >
              Maximum file size: 2MB
            </Typography>
            <Button variant="outlined" component="label">
              Choose file
              <input onChange={handleOnChangeFile} hidden type="file" />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3, marginRight: 3 }}>
          <Button
            size="small"
            onClick={handleClose}
            variant="text"
            sx={{ color: "#22a19a" }}
          >
            Cancel
          </Button>

          <Button
            size="small"
            onClick={handleClose}
            variant="contained"
            color="error"
          >
            Cancel Project
          </Button>
        </DialogActions>
      </Dialog>
      <CreateCourse show={openCreate} close={() => setOpenCreate(false)} />
      <AssignLeader show={openAssignLeader} close={() => setOpenAssignLeader(false)} setNewLeader={setNewLeader}/>
   <AssignPartner show={openAssignPartner} close={() => setOpenAssignPartner(false)} setNewPartner={setNewPartner}/>



<Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
    Update project successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErr} autoHideDuration={6000} onClose={() => setShowAlertErr(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant="filled" onClose={() => setShowAlertErr(false)} severity="error" sx={{ width: '100%' }} >
   Update project successful!!!!
  </Alert>
</Snackbar>
    </>
  );
}

export default DetailProject;
