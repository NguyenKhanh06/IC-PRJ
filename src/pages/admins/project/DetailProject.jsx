import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ColorButton } from "../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import ScrollableTab from "../Tabs";
import BasicTabs from "../Tabs";
import projectAPI from "../../../api/projectAPI";
import staffAPI from "../../../api/staffAPI";
import partnerAPI from "../../../api/partnerAPI";
import courseAPI from "../../../api/courseAPI";

DetailProject.propTypes = {};

function DetailProject(props) {
  const projectID = useParams();
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
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [itemCancel, setItemCancel] = useState(null);
  const [project, setProject] = useState({});
  const [staffs, setStaffs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleUpdate = (e) => {
    console.log("onchange leader", editLeader)

  };

//fetch data project
  const fetchData = async () => {
    await projectAPI.getProjectDetail(projectID.id).then((response) => {
        setProject(response.responseSuccess
        )
      console.log(response.responseSuccess
        )
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);


// fetch data staff
  const fetchDataStaff = async () => {
    await staffAPI.getList().then((response) => {
      setStaffs(response.responseSuccess)
    });
  };
  useEffect(() => {
    fetchDataStaff().catch((error) => {
      console.log(error);
    });
  }, []);

  // fetch data partner
  const fetchDataPartner = async () => {
    await partnerAPI.getList().then((response) => {
      setPartners(response.responseSuccess)
    });
  };
  useEffect(() => {
    fetchDataPartner().catch((error) => {
      console.log(error);
    });
  }, []);

  // fetch data partner
  const fetchDataCourse = async () => {
    await courseAPI.getList().then((response) => {
      setCourses(response.responseSuccess)
    });
  };
  useEffect(() => {
    fetchDataCourse().catch((error) => {
      console.log(error);
    });
  }, []);

   useEffect(() => {
      if (project != null) {
          setEditName(project.projectName)
          setEditEstimate_start(project.estimateTimeStart)
          setEditEstimate_end(project.estimateTimeEnd)
          setEditRegis_open(project.estimateTimeStart)
          setEditRegis_close(project.estimateTimeEnd)
          setOfficial_start(project.officalTimeStart)
          setOfficial_end(project.officalTimeEnd)
           setEditCourse(project.course?.id)
          setEditPartner(project?.partner?.id)          
          setEditLeader(project?.leader?.staff?.id)
          setEditDescription(project.description)
      }
    }, [project]);
    // console.log("project.leader.staff.fullname", project.leader.staff.fullname)
    // console.log("project", project.status)
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
  const handleOnChangeFile = (event) => {
    setItemCancel(event.target.files[0]);
  };
  return (
    <>
      
      <form onSubmit={handleUpdate}>
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
            <p style={{ padding: "6px 0px 0px 10px", marginTop: 40 }} className="title-section">
            DETAIL PROJECT
          </p>

            </Stack>
          
         
         
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F0F0F0",
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
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
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
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
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
                        sx={{ backgroundColor: "white"}}
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
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
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
                        sx={{ backgroundColor: "white"}}
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
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
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
                        sx={{ backgroundColor: "white"}}
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
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
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
                        sx={{ backgroundColor: "white"}}
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
                <LocalizationProvider size="small" dateAdapter={AdapterMoment}>
                  <DatePicker
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
                   { courses.map((course, index) => (
                    <MenuItem key={index} value={course.id}>{course.activity}</MenuItem>
                   ))}
                  </Select>
              </FormControl>
              <Stack
                sx={{
                  marginTop: 3,
                }}
                direction="row"
                alignItems="center"
                spacing="5%"
              >
                <Link>
                  <Button variant="text">View detail course</Button>
                </Link>
                <Link>
                  <ColorButton endIcon={<AddIcon />} variant="contained">
                    Create course
                  </ColorButton>
                </Link>
              </Stack>
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
                  Leader
                </Typography>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editLeader}
                    name="leader"
                    onChange={handleOnChangeLeader}
                    sx={{ backgroundColor: "white" }}
                  >
                   { staffs.map((staff, index) => (
                    <MenuItem key={index} value={staff.id}>{staff.fullName}</MenuItem>
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
                  Partner
                </Typography>
                <FormControl fullWidth>
                <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editPartner}
                    name="leader"
                    onChange={handleOnChangePartner}
                    sx={{ backgroundColor: "white" }}
                  >
                   { partners.map((partner, index) => (
                    <MenuItem key={index} value={partner.id}>{partner.name}</MenuItem>
                   ))}
                  </Select>
                </FormControl>
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
                  <MenuItem value={3}>Pending</MenuItem>
                  <MenuItem value={4}>Finish</MenuItem>
                  <MenuItem value={5}>Approve</MenuItem>
                  <MenuItem value={6}>Reject</MenuItem>
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
              <Button variant="contained">Start Project</Button>
              <ColorButton
                onClick={() => {
                  handleUpdate();
                }}
                variant="contained"
              >
                Save Change
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
    </>
  );
}

export default DetailProject;
