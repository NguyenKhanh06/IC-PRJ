import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { ColorButton } from "../../../styles/button";
import syllabusAPI from "../../../api/syllabusAPI";
import courseAPI from "../../../api/courseAPI";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import axios from "axios";
import CreateSyllabus from "../syllabus/CreateSyllabus";
import DetailSyllabus from "../syllabus/DetailSyllabus";

DetailCourse.propTypes = {};

function DetailCourse(props) {
  const courseid = useParams();
  const [editName, setEditName] = useState("");
  const [editActivity, setEditActivity] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSyllabus, setEditSyllabus] = useState("");
  const [syllabus, setSyllabus] = useState([]);
  const [courseDetail, setCourseDetail] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [syllabusID, setSyllabusID] = useState({});

  const handleChangeStatus = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (e) => {};
  const handleOnChangeName = (event) => {
    setEditName(event.target.value);
  };
  const handleOnChangeActivity = (event) => {
    setEditActivity(event.target.value);
  };
  const handleOnChangeContent = (event) => {
    setEditContent(event.target.value);
  };
  const handleOnChangeSyllabus = (event) => {
    setEditSyllabus(event.target.value);
  };

  const handleViewDetail = (id) => {
    setSyllabusID(id);
    setViewDetail(true);
    console.log("id syllabus", id);
  };

  // const fetchDataSyllabus = async () => {
  //   await syllabusAPI.getList().then((response) => {
  //     setSyllabus(response.responseSuccess);
  //   });
  // };
  // useEffect(() => {
  //   fetchDataSyllabus().catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

  const fetchData = async () => {
    await courseAPI.getCourseWithID(courseid.id).then((response) => {
      setCourseDetail(response.responseSuccess[0]);
      setSyllabus(response.responseSuccess[0].syllabus);
      console.log(response);
    });
  };
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if (courseDetail != null) {
      setEditName(courseDetail.skillName);
      setEditActivity(courseDetail.activity);
      setEditContent(courseDetail.content);
      setChecked(courseDetail.isActive);

    }
  }, [courseDetail]);

  return (
    <Box>
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
            <p
              style={{ padding: "6px 0px 0px 10px", marginTop: 40 }}
              className="title-section"
            >
              DETAIL COURSE
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
                Detail Course
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
                Skill Name
              </Typography>
              <StyledTextField
                label=" Skill Name"
                autoComplete="off"
                fullWidth
                size="small"
                name="name"
                value={editName}
                onChange={handleOnChangeName}
              />
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
                Activity
              </Typography>
              <StyledTextField
                label="Activity"
                autoComplete="off"
                fullWidth
                size="small"
                name="name"
                value={editActivity}
                onChange={handleOnChangeActivity}
              />
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
                Content
              </Typography>
              <StyledTextField
                label="Content"
                autoComplete="off"
                fullWidth
                size="small"
                name="content"
                value={editContent}
                onChange={handleOnChangeContent}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    float: "left",
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Syllabus
                </Typography>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editSyllabus}
                    name="leader"
                    onChange={handleOnChangeSyllabus}
                    sx={{ backgroundColor: "white" }}
                  >
                    {syllabus.map((syl, index) => (
                      <MenuItem key={index} value={syl.id}>
                        {syl.content}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <ColorButton
                onClick={() => setOpenCreate(true)}
                sx={{ marginTop: "35px" }}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Create Syllabus
              </ColorButton>
            </Stack>
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
                Course status
              </Typography>
              {/* <FormControl sx={{ width: "50%" }}>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editStatus}
                  name="course"
                  onChange={handleOnChangeStatus}
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Deactivate</MenuItem>
                </Select>
              </FormControl> */}
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChangeStatus}
                    inputProps={{ "aria-label": "controlled" }}
                    color="success"
                  />
                }
                label="Active"
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F0F0F0",
          width: "100%",
          padding: "40px 20px 20px 40px",
          borderRadius: "20px",
          marginTop: "20px",
        }}
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
          <Typography
            style={{ marginRight: "auto" }}
            variant="h5"
            component="h2"
            gutterBottom
          >
            List Syllabus
          </Typography>

          <ColorButton
            sx={{ marginTop: "35px" }}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Create Syllabus
          </ColorButton>
        </Stack>

        <Stack
          sx={{
            marginBottom: 2,
            marginTop: 2,
            height: 75,
            backgroundColor: "white",
          }}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              sx={{ backgroundColor: "white" }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>Deactivate</MenuItem>
            </Select>
          </FormControl>
          <Box style={{ marginRight: "30px" }}>
            <TextField
              id="outlined-start-adornment"
              size="small"
              sx={{ backgroundColor: "white", marginRight: "20px" }}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <ColorButton size="small" variant="contained">
              Search
            </ColorButton>
          </Box>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Syllabus's name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Create date
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
              {syllabus
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((syl, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>

                    <TableCell component="th" scope="row">
                      <Button
                        onClick={() => handleViewDetail(syl.id)}
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {syl.content}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {moment(syl.startTime).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {syl.isActive ? (
                        <Chip label="Active" color="success" />
                      ) : (
                        <Chip label="Deactivate" color="error" />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <ColorButton>Create A copy</ColorButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={syllabus.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {viewDetail && <DetailSyllabus syllabusID={syllabusID} />}
      <CreateSyllabus
        show={openCreate}
        close={() => setOpenCreate(false)}
        courseid={courseDetail.id}
      />
    </Box>
  );
}

export default DetailCourse;
