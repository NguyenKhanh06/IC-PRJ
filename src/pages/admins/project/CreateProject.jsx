import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Fade,
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
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ColorButton } from "../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import staffAPI from "../../../api/staffAPI";
import courseAPI from "../../../api/courseAPI";
import partnerAPI from "../../../api/partnerAPI";
import projectAPI from "../../../api/projectAPI";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignLeader from "./AssignLeader";
import AssignPartner from "./AssignPartner";
import CreateCourse from "../course/CreateCourse";
CreateProject.propTypes = {};

function CreateProject(props) {
  const [inputValue, setInputValue] = useState({
    name: "",
    course: "",
    leader: "",
    partner: "",
    description: "",
    fee: 0,
  });
  const [estimate_start, setEstimate_start] = useState(null);
  const [estimate_end, setEstimate_end] = useState(null);
  const [regis_open, setRegis_open] = useState(null);
  const [regis_close, setRegis_close] = useState(null);
  const [newCourse, setNewCourse] = useState("");
  const [newPartner, setNewPartner] = useState([]);
  const [newLeader, setNewLeader] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFalse, setOpenFalse] = useState(false);
  const [openAssignLeader, setOpenAssignLeader] = useState(false);
  const [openAssignPartner, setOpenAssignPartner] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClickOpenFalse = () => {
    setOpenFalse(true);
  };

  const handleCloseFalse = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFalse(false);
  };
  const handleOnChangeCourse = (event) => {
    setNewCourse(event.target.value);
  };
  const handleOnChangePartner = (event) => {
    setNewPartner(event.target.value);
  };
  const handleOnChangeLeader = (event) => {
    setNewLeader(event.target.value);
  };
  const handleOnChangeInputProject = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputValue,
      [name]: value,
    };

    setInputValue(input);
  };
  console.log("handleOnChangeInputProduct", inputValue);

  const onKeyDown = (e) => {
    e.preventDefault();
  };
  // fetch data staff
  const fetchDataStaff = async () => {
    await staffAPI.getList().then((response) => {
      setStaffs(response.responseSuccess);
    });
  };
  useEffect(() => {
    fetchDataStaff().catch((error) => {
      console.log(error);
    });
  }, []);

  //fetch data course
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
  console.log("course", courses);
  // fetch data partner
  const fetchDataPartner = async () => {
    await partnerAPI.getList().then((response) => {
      setPartners(response.responseSuccess);
    });
  };
  useEffect(() => {
    fetchDataPartner().catch((error) => {
      console.log(error);
    });
  }, []);

  const formData = new FormData();
  formData.append("ProjectName", inputValue.name);
  formData.append("Description", inputValue.description);
  formData.append("Fee", inputValue.fee);
  formData.append("EstimateTimeStart", estimate_start);
  formData.append("EstimateTimeEnd", estimate_end);
  formData.append(" DateOpenRegis", regis_open);
  formData.append("DateCloseRegis", regis_close);
  formData.append("LeaderId", newLeader.id);
  formData.append("CourseId", newCourse);
  formData.append("PartnerId", newPartner.id);
  // const data = {
  //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   assignDate: "2023-02-06T23:12:54.990Z",
  //   isActive: true
  // }
  // const formData = {

  //   EstimateTimeStart: estimate_start,
  //   EstimateTimeEnd: estimate_end,
  //   DateOpenRegis: regis_open,
  //   DateCloseRegis: regis_close,
  //   LeaderId: newLeader,
  //   CourseId: newCourse,
  //   PartnerId: newPartner
  // }
  const Swal = require("sweetalert2");
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Create successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAlertError = () => {
    Swal.fire({
      title: "Error",
      text: "Create successful",
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    axios({
      method: "POST",
      data: formData,
      url: "https://localhost:7115/api/v1/project/create",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      {
        response.isSuccess ? showAlert() : showAlertError();
      }
      setLoading(false);
    });

    console.log("formdata", formData);
  };
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "25%",
          }}
        >
              <CircularProgress style={{color: "#22a19a"}} />
          <p>creating....</p>
        </Box>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <Box>
              <Link>
                <Button
                  sx={{
                    float: "left",
                    marginBottom: 4,
                  }}
                  variant="outlined"
                  color="success"
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Link>
              <p
                style={{ padding: "6px 0px 0px 10px" }}
                className="title-section"
              >
                CREATE PROJECT
              </p>

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
                >
                  <Typography
                    sx={{
                      paddingBottom: 2,
                      float: "left",
                      fontWeight: "bold",
                      marginBottom: 2,
                    }}
                  >
                    Create new project
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
                    Project's Name *
                  </Typography>
                  <StyledTextField
                    required
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="name"
                    value={inputValue.name}
                    onChange={handleOnChangeInputProject}
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
                      Estimate Time Start *
                    </Typography>
                    <LocalizationProvider
                      size="small"
                      dateAdapter={AdapterDayjs}
                    >
                      <DatePicker
                        value={estimate_start}
                        onChange={(newValueTo) => {
                          setEstimate_start(newValueTo);
                        }}
                        sx={{ width: " 548px" }}
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
                      Estimate time end *
                    </Typography>
                    <LocalizationProvider
                      size="small"
                      dateAdapter={AdapterDayjs}
                    >
                      <DatePicker
                        name="estimate_end"
                        value={estimate_end}
                        onChange={(newValueTo) => {
                          setEstimate_end(newValueTo);
                        }}
                        fullWidth
                        renderInput={(params) => (
                          <StyledTextField
                            required
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
                      Registration Opening Time *
                    </Typography>
                    <LocalizationProvider
                      size="small"
                      dateAdapter={AdapterDayjs}
                    >
                      <DatePicker
                        required
                        value={regis_open}
                        onChange={(newValueTo) => {
                          setRegis_open(newValueTo);
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
                      Registration Opening Close
                    </Typography>
                    <LocalizationProvider
                      size="small"
                      dateAdapter={AdapterDayjs}
                    >
                      <DatePicker
                        name="regis_close"
                        value={regis_close}
                        onChange={(newValueTo) => {
                          setRegis_close(newValueTo);
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
                      Course *
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newCourse}
                        name="course"
                        onChange={handleOnChangeCourse}
                        sx={{ backgroundColor: "white" }}
                      >
                        <MenuItem>
                          {" "}
                          <ColorButton
                            onClick={() => setOpenCreate(true)}
                            endIcon={<AddIcon />}
                            variant="contained"
                          >
                            Create Course
                          </ColorButton>
                        </MenuItem>

                        {courses
                          .filter((course) => course.isActive == true)
                          .map((filteredCourse, index) => (
                            <MenuItem key={index} value={filteredCourse.id}>
                              {filteredCourse.skillName}
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
                      Participant Fee *
                    </Typography>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
          style={{backgroundColor:"white"}}
          type="number"
            name="fee"
            value={inputValue.fee}
            onChange={handleOnChangeInputProject}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          /> */}

                    <OutlinedInput
                      style={{ backgroundColor: "white" }}
                      type="number"
                      autoComplete="off"
                      fullWidth
                      size="small"
                      name="fee"
                      value={inputValue.fee}
                      onChange={handleOnChangeInputProject}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                    {/* <StyledTextField
        type="number"
                  label="Participant Fee"
                  autoComplete="off"
                  fullWidth
                  size="small"
                  name="fee"
                  value={inputValue.fee}
                  onChange={handleOnChangeInputProject}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                /> */}
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
                      Leader *
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {newLeader.length != 0 ? (
                        <Chip label={newLeader.fullName} />
                      ) : null}
                      <IconButton
                        onClick={() => setOpenAssignLeader(true)}
                        aria-label="fingerprint"
                        color="secondary"
                      >
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
                      Partner *
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {newPartner.length != 0 ? (
                        <Chip label={newPartner.name} />
                      ) : null}
                      <IconButton
                        onClick={() => setOpenAssignPartner(true)}
                        aria-label="fingerprint"
                        color="secondary"
                      >
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
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="description"
                    value={inputValue.description}
                    onChange={handleOnChangeInputProject}
                    multiline={true}
                    rows={6}
                  />
                </Box>
                <Box sx={{ marginTop: 6, marginLeft: "86%" }}>
                  <ColorButton
                    onClick={() => {
                      handleSubmit();
                    }}
                    variant="contained"
                  >
                    Create Project
                  </ColorButton>
                </Box>
              </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert severity="success">Create project successfully.</Alert>
            </Snackbar>
            <Snackbar
              open={openFalse}
              autoHideDuration={5000}
              onClose={handleClose}
            >
              <Alert severity="error">Can not create new project!!!!!</Alert>
            </Snackbar>
          </form>

          <AssignLeader
            show={openAssignLeader}
            close={() => setOpenAssignLeader(false)}
            setNewLeader={setNewLeader}
          />
          <AssignPartner
            show={openAssignPartner}
            close={() => setOpenAssignPartner(false)}
            setNewPartner={setNewPartner}
          />
          <CreateCourse show={openCreate} close={() => setOpenCreate(false)} />
        </>
      )}
    </>
  );
}

export default CreateProject;
