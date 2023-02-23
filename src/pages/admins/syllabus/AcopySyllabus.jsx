import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  FormControlLabel,
  InputAdornment,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import syllabusAPI from "../../../api/syllabusAPI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ColorButton } from "../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import axios from "axios";
import { StyledTextField } from "../../../styles/textfield";
import { padding } from "@mui/system";
import CreateSlot from "./CreateSlot";
import SearchIcon from "@mui/icons-material/Search";
import DetailSlot from "./DetailSlot";
AcopySyllabus.propTypes = {};

function AcopySyllabus(props) {
  const [syllabusDetail, setSyllabusDetail] = useState({});
  const [slot, setSlot] = useState([]);
  const [slotDetail, setSlotDetail] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openCreateSlot, setOpenCreateSlot] = useState(false)
  const [editContent, setEditContent] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [idSlot, setIdSlot] = useState("");
  const [viewDetail, setViewDetail] = useState(false);
  const [checked, setChecked] = React.useState(syllabusDetail.isActive);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    setOpenCreateSlot(props.close);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditContent = (event) => {
    setEditContent(event.target.value)
  }
  const handleEditDes = (event) => {
    setEditDescription(event.target.value)
  }
  // setSyllabusDetail(props.syllabusDetail)
  // console.log("syllabusDetail",props.syllabusDetail);
//  const handleIDSlot = (id) =>{
// setIdSlot(id);
// syllabusAPI.getSlotWithID(id).then((response) => {
//   setSlotDetail(response.responseSuccess[0]);
// setViewDetail(true)
// });


//  }
//   const fetchData = async () => {
//     await syllabusAPI.getSyllabusWithID(props.syldetail.id).then((response) => {
//       setSyllabusDetail(response.responseSuccess[0]);
//       setSlot(response.responseSuccess[0].slots);
//     });
//   };

//   useEffect(() => {
//     fetchData().catch((error) => {
//       console.log(error);
//     });
//   }, [props.syldetail]);
  useEffect(() => {
    if (props.syllabusCopy != null) {
      setEditContent(props.syllabusCopy.content);
      setEditDescription(props.syllabusCopy.description);
      setChecked(props.syllabusCopy.isActive)
    
    }
  }, [props.syllabusCopy]);
  const handleSubmit = (e) => {
   axios.post(`https://localhost:7115/api/v1/syllabus/create?Content=${editContent}&Description=${editDescription}&CourseId=${props.syllabusCopy.courseId}`).then((response)=>{
        window.location.reload(false);
    })
  };
  const handleUpdate = (e) => {};
  return (
    <Box>
       <form onSubmit={handleUpdate}>
      <Stack>
        <p
          style={{ padding: "6px 0px 0px 10px", marginTop: 40 }}
          className="title-section"
        >
          A COPY OF SYLLABUS
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
        >
          <Typography
            sx={{
              paddingBottom: 2,
              float: "left",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            A copy of Syllabus
          </Typography>
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
            Content
          </Typography>
       <StyledTextField 
                autoComplete="off"
                fullWidth
                size="small"
                name="content"
                value={editContent}
                onChange={handleEditContent}/>
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
            Description
          </Typography>
          <StyledTextField  
                autoComplete="off"
                fullWidth
                size="small"
                name="description"
                value={editDescription}
                onChange={handleEditDes}/>
        </Box>

        <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "F8F8F8",
          width: "100%",
          padding: "40px 20px 20px 40px",
          borderRadius: "20px",
        }}
      >
           <Box
      
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
   <Stack
        sx={{
          marginBottom: 2,
          marginTop: 2,
          height: 75,
          backgroundColor: "#F8F8F8",
          width: "100%",
          backgroundColor: "white"
        }}
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Box style={{ marginLeft: "25px" }}>
          <StyledTextField
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
        <ColorButton
              sx={{  marginRight: "30px"}}
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {setOpenCreateSlot(true)}}
            >
              Create Slot
            </ColorButton>
      </Stack>
        
        

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow hover>
                  <TableCell sx={{ fontWeight: 700 }}>Slot</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Topic
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Learning Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Time Allocation
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slot
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((slot, index) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >

                      <TableCell align="left">{slot.session}</TableCell>

                      <TableCell component="th" scope="row">
{/*                         
                          <Button onClick={() => handleIDSlot(slot.id)} sx={{ color: "black" }} variant="text">
                           {slot.name}
                          </Button> */}
                      
                      </TableCell>

                      <TableCell align="left">{slot.type}</TableCell>
                      <TableCell align="left">{slot.timeAllocation}</TableCell>
                      <TableCell align="left">
                      <Button variant="contained" color="error">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={slot.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Box>
      <Stack
       direction="row"
       justifyContent="center"
       alignItems="center"
       spacing={2}
       sx={{  marginLeft: "auto"}}
      >
   
            <Button style= {{color: "#22A19A"}} variant="text" onClick = {() => handleClose()}>Close</Button>
            <ColorButton
             
             variant="contained"
             onClick={() => {handleSubmit()}}
           >
             Create Syllabus
           </ColorButton>
      </Stack>
      </Box>
 
           <DetailSlot show = {viewDetail} close = {() => setViewDetail(false)}  slotDetail ={slotDetail} slotID = {idSlot} />
           <CreateSlot showCreateSlot={openCreateSlot} closeCreateSlot={() => setOpenCreateSlot(false)} syllabusID = {syllabusDetail.id} setOpenSyl={props.setViewDetail}/>

  
   </form>
    </Box>
  );
}

export default AcopySyllabus;
