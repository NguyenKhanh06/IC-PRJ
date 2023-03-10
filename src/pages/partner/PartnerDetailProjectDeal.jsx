import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";
import courseAPI from "../../api/courseAPI";
import syllabusAPI from "../../api/syllabusAPI";
import { StyledTextField } from "../../styles/textfield";
import { ColorButton } from "../../styles/button";
import DetailSlotDeal from "../admins/dealing/DetailSlotDeal";
import PartnerDetailSlotDeal from "./PartnerDetailSlotDeal";
import RejectSlot from "./RejectSlot";
import RejectDetail from "../admins/dealing/RejectDetail";

PartnerDetailProjectDeal.propTypes = {
    
};

function PartnerDetailProjectDeal(props) {
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
    const [slotApprove, setSlotApprove] = useState("");
    const [slotReject, setSlotReject] = useState("");
    const [viewDetail, setViewDetail] = useState(false);
    const [ slotID, setSlotID] = useState("");
    const [ slotIDreject, setSlotIDreject] = useState("");
    const [slot, setSlot] = useState([]);
  const [reasonDetail, setReasonDetail] = useState({});

const [openRejectDetail, setOpenRejectDetail] = useState(false)

const [openReject, setOpenReject] = useState(false)

   
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const fetchData = async () => {
      await courseAPI.getCourseWithID(projectID.id).then((response) => {
        setCourse(response.responseSuccess[0]);
        setSyllabus(response.responseSuccess[0].syllabus);
        console.log(response.responseSuccess[0]);
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
    const handleIdSlot = (id) => {
      setSlotID(id);

      syllabusAPI.getSlotWithID(id).then((response) => {
        setSlot(response.responseSuccess[0]);
    
        console.log("response", response.responseSuccess[0]);
      });
      setViewDetail(true)
  
  
    };
    const handleIdSlotReject = (id) => {
      setSlotIDreject(id);
  
  
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
  
    
   
  //   {(syllabusActive?.slots?.length > 0) && statusCounter(slotApprove) }
   //
   function statusCounterApprove(inputs) {
      let counter = 0;
      for (const input of inputs) {
        if (input.slotStatus === 1) counter += 1;
      }
      return counter;
      
    }
    function statusCounterReject(inputs) {
      let counterReject = 0;
      for (const input of inputs) {
        if (input.slotStatus === 2) counterReject += 1;
      }
      return counterReject;
      
    }
    useEffect(() => {
      if (course!= null) {
          
        setEditActivity(course.activity);
        setEditContent(course.content);
        setChecked(course.isActive);
  
      
        const found = syllabus.find((obj) => {
          return obj.isActive === true;
        });
        setEditDes(found?.description);
        setEditSyllabus(found);
  
        syllabusAPI.getSyllabusWithID(found?.id).then((response) => {
          setSyllabusActive(response.responseSuccess[0]);
          console.log(response.responseSuccess[0])
       
           {response.responseSuccess[0]?.slots.length > 0 && setSlotApprove(statusCounterApprove(response.responseSuccess[0]?.slots))}
           {response.responseSuccess[0]?.slots.length > 0 && setSlotReject(statusCounterReject(response.responseSuccess[0]?.slots))}
        });
      
  
      }
    }, [course]);
    
    const Swal = require('sweetalert2')
    const showAlert = () => {
      Swal.fire({
          title: "Success",
          text: "Update successful",
          icon: "success",
          confirmButtonText: "OK",
        });
  }
  const showAlertError = () => {
      Swal.fire({
          title: "Error",
          text: "Update successful",
          icon: "error",
          confirmButtonText: "OK",
        });
  }
  
    const handleApproveSlot = (id) => {
      axios.put(`https://localhost:7115/api/v1/slot/updateStatus/${id}?Status=1`).then((response) => {
        {response.isSuccess ? showAlert() : showAlertError()}
      })
     }
     const handleRejectSlot = (id) => {
       axios.put(`https://localhost:7115/api/v1/slot/updateStatus/${id}?Status=2`).then((response) => {
        {response.isSuccess ? showAlert() :showAlertError()}
       })
      }
   
  
console.log("slot", syllabusActive)

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
                  Activity
                </Typography>
                <Typography>{course.activity}</Typography>
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
                  Content
                </Typography>
                <Typography>{course.content}</Typography>
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
                  Syllabus
                </Typography>
                <Typography>
            {syllabusActive?.content}
                        </Typography>
                   
              </Stack>
{/*  */}
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
              marginRight: "15px",
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
                  <Typography>{syllabusActive?.description}</Typography>
                </Stack>
                <Box
                  sx={{
                    marginTop: 5,
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
                  <Accordion
                  disableGutters
                  elevation={0}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                  style={{ marginBottom: 10, borderRadius: 15, marginTop: 15 }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={45}
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={2}
                        >
                  {/* <Chip
                           label = {slot?.slotStatus === 1 ? "Approve" : slot?.slotStatus === 2 ? "Reject" : null}
                            color={slot?.slotStatus === 1 ? "success" : slot?.slotStatus === 2 ? "error" : null}
                            style={{ marginRight: "10px" }}
                            size="small"
                          /> */}
                                                   {
                  slot?.slotStatus === 1
                    ? <Chip
                    label= "Approve"
                    color= "success"
                
                    size="small"
                  />
                    : slot?.slotStatus === 2
                    ? <Chip
                    label= "Reject"
                    color= "error"
                
                    size="small"
                  />
                    :  slot?.slotStatus === 0
                    ? <Chip
                    label= "New"
                    color= "warning"
           
                    size="small"
                  /> : null
                }
                          <Typography sx={{ color: "text.secondary" }}>
                            <Chip
                              label={slot?.session}
                              color="primary"
                              style={{ marginRight: "10px" }}
                            />
  
                            {moment(slot?.dateCreated).format("DD/MM/YYYY")}
                          </Typography>
                          <Button onClick={() => handleIdSlot(slot?.id)}>
                          {slot?.name}
                          </Button>
                          {/* <Typography variant="h6" style={{ fontWeight: "bold" }}>
                          
                          </Typography> */}
                        </Stack>
                        <Box
                      
                      >
                      
                              {slot?.slotStatus === 1 ? (<>
                              <Stack
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="center"
                              spacing={2}
                              >
                              <Button style={{marginRight: 10}} variant="contained" onClick={() => handleApproveSlot(slot?.id)} size="small" color="success">
                            Approve
                          </Button>
                          <Button disabled variant="contained"  onClick={() => {setOpenReject(true); handleIdSlotReject(slot?.id)}}  size="small" color="error">
                            Reject
                          </Button>
                              </Stack>
                           
                            </> ) : slot?.slotStatus === 2 ? <>
                            <Stack
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="center"
                              spacing={2}
                              >
                            <Button  style={{marginRight: 10}}variant="contained" onClick={() => handleApproveSlot(slot?.id)} size="small" color="success">
                            Approve
                          </Button>
                          <Button variant="contained"  onClick={() => {setOpenReject(true); handleIdSlotReject(slot?.id)}} size="small" color="error">
                            Reject
                          </Button>
                          </Stack>
                            </> : <>
                            <Stack
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="center"
                              spacing={2}
                              >
                              <Button style={{marginRight: 10}} variant="contained" onClick={() => handleApproveSlot(slot?.id)} size="small" color="success">
                            Approve
                          </Button>
                          <Button variant="contained"  onClick={() => {setOpenReject(true); handleIdSlotReject(slot?.id)}} size="small" color="error">
                            Reject
                          </Button>
                          </Stack>
                            </>}
                    
                      </Box>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      {slot?.reasons.map((reason, index) => (
 <div className="reject-slot">
 <p className="reject-content">
   <p style={{color: "red"}} >Rejected</p>
   {reason.reasonContent}
 </p>
 <ColorButton onClick={() => {setOpenRejectDetail(true); setReasonDetail(reason)}}>View Detail</ColorButton>
</div>
                      ))}
                   
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
              width: "40%",
              padding: "40px 20px 20px 40px",
              borderRadius: "20px",
              marginTop: "20px",
              height: "fit-content",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Box
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{syllabusActive?.slots?.length}</Typography>
                <Typography variant="h6">Slots</Typography>
              </Box>
              <Box
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  
                }}
              >
                <Typography variant="h8" color="green">{slotApprove}</Typography>
                <Typography variant="h7"color="green">Slots Approve</Typography>
              </Box>
              <Box
                  style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "white",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
              >
                <Typography variant="h8" color="red">{slotReject}</Typography>
                <Typography variant="h7" color="red">Slots Reject</Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <RejectSlot show = {openReject} close = {() => setOpenReject(false)} slotID= {slotIDreject}/>
  <RejectDetail reason = {reasonDetail} show={openRejectDetail} close = {() => setOpenRejectDetail(false)}/>
        <PartnerDetailSlotDeal show={viewDetail} close={() => setViewDetail(false)} slot={slot} SlotID={slotID} syllabusID = {editSyllabus} />
      </Box>
    );
}

export default PartnerDetailProjectDeal;