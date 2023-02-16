import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import projectAPI from "../../../api/projectAPI";
import { Link, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TableCell,
  TablePagination,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ColorButton } from "../../../styles/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import courseAPI from "../../../api/courseAPI";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import syllabusAPI from "../../../api/syllabusAPI";

DetailCourseDeal.propTypes = {};

function DetailCourseDeal(props) {
  const projectID = useParams();
  const [course, setCourse] = useState([]);
  const [editActivity, setEditActivity] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editDes, setEditDes] = useState("");
  const [checked, setChecked] = useState(false);
  const [editSyllabus, setEditSyllabus] = useState("");
  const [syllabus, setSyllabus] = useState([]);
  const [syllabusActive, setSyllabusActive] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const fetchData = async () => {
    await courseAPI.getCourseWithID(projectID.id).then((response) => {
      setCourse(response.responseSuccess[0]);
      setSyllabus(response.responseSuccess[0].syllabus);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);
  //   const fetchDataDetailSyllabus = async () => {
  //     await syllabusAPI.getSyllabusWithID(editSyllabus.id).then((response) => {
  //     setSyllabusActive(response.responseSuccess[0]);
  //     });
  //   };

  //   useEffect(() => {
  //     fetchDataDetailSyllabus().catch((error) => {
  //       console.log(error);
  //     });
  //   }, []);
  console.log("found", editSyllabus);

  const handleChangeStatus = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (e) => {};

  const handleOnChangeActivity = (event) => {
    setEditActivity(event.target.value);
  };
  const handleOnChangeContent = (event) => {
    setEditContent(event.target.value);
  };
  const handleOnChangeSyllabus = (event) => {
    setEditSyllabus(event.target.value);
  };
  const handleOnChangeDes = (event) => {
    setEditDes(event.target.value);
  };

  //   const handleViewDetail = (id) => {
  //     setSyllabusID(id);
  //     setViewDetail(true);
  //     console.log("id syllabus", id);
  //   };

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

  console.log("syllabusActive", syllabusActive);

  useEffect(() => {
    if (course != null) {
      setEditActivity(course.activity);
      setEditContent(course.content);
      setChecked(course.isActive);

      //   setEditSyllabus(course.);
      const found = syllabus.find((obj) => {
        return obj.isActive === true;
      });
      setEditDes(found?.description);
      setEditSyllabus(found?.id);

      syllabusAPI.getSyllabusWithID(found?.id).then((response) => {
        setSyllabusActive(response.responseSuccess[0]);
      });
    }
  }, [course]);

  return (
    <Box>
      <form>
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
            <Stack
              flexDirection="column"
              alignItems="flex-start"
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
                Create date
              </Typography>
              <Typography>
                {" "}
                {moment(course.dateCreate).format("DD/MM/YYYY")}
              </Typography>
            </Stack>
            <Stack
              flexDirection="column"
              alignItems="flex-start"
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
              <Typography>{course.skillName}</Typography>
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
                //   onClick={() => setOpenCreate(true)}
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
      <Stack flexDirection="row">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F0F0F0",
          width: "100%",
          padding: "40px 20px 20px 40px",
          borderRadius: "20px",
          marginTop: "20px",
          marginRight: "15px"
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
        </Stack>

        <Box>
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
                Detail Syllabus
              </Typography>
            </Box>
            <Stack
              flexDirection="column"
              alignItems="flex-start"
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
              <Typography>{syllabusActive?.content}</Typography>
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
                Description
              </Typography>
              <StyledTextField
                label="Description"
                autoComplete="off"
                fullWidth
                size="small"
                name="des"
                value={editDes}
                onChange={handleOnChangeDes}
              />
            </Box>
            <Box
              sx={{
                marginTop: 10,
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
                List of slot
              </Typography>
            </Box>
            {syllabusActive?.slots?.map((slot, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={60}
                  >
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography sx={{ color: "text.secondary" }}>
                        <Chip
                          label={slot?.session}
                          color="primary"
                          style={{ marginRight: "10px" }}
                        />
                        Create date:{" "}
                        {moment(slot?.dateCreated).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {slot?.name}
                      </Typography>
                    </Stack>
                    <Box>
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <ColorButton
                          size="small"
                          style={{ width: "max-content" }}
                        >
                          View Detail
                        </ColorButton>
                        <Button size="small" color="error">
                          Reject
                        </Button>
                        <Button size="small" color="success">
                          Approve
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>
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
        <h1>test</h1>
      </Box>
      </Stack>
    
      {/* {viewDetail && <DetailSyllabus syllabusID={syllabusID} />} */}
    </Box>
  );
}

export default DetailCourseDeal;
