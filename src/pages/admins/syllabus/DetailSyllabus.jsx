import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Stack,
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
DetailSyllabus.propTypes = {};

function DetailSyllabus(props) {
  const syllabusID = useParams();
  const [syllabusDetail, setSyllabusDetail] = useState({});
  const [slot, setSlot] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log("syllabusDetail", syllabusDetail);
  console.log("syllabusDetail", syllabusID);
  const fetchData = async () => {
    await axios.get(`https://localhost:7115/api/v1/syllabus/getDetail/${syllabusID.id}`).then((response) => {
      setSyllabusDetail(response.responseSuccess);
      setSlot(response.responseSuccess.slots)
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
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
          DETAIL SYLLABUS
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
            Detail Syllabus
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
            Course's Name
          </Typography>
          <Typography
            sx={{
              float: "left",

              marginBottom: 2,
            }}
          >
            {syllabusDetail?.course?.activity}
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
          <Typography
            sx={{
              float: "left",

              marginBottom: 2,
            }}
          >
            {syllabusDetail.content}
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
            DesCription
          </Typography>
          <Typography
            sx={{
              float: "left",

              marginBottom: 2,
            }}
          >
            {syllabusDetail.description}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F0F0F0",
          width: "100%",
          padding: "40px 20px 20px 40px",
          borderRadius: "20px",
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
            List Slot
          </Typography>

          <Link to="/admin/create-slot" state={{syllabus: syllabusDetail, slot: slot}} >
            <ColorButton
              sx={{ marginBottom: "30px" }}
              variant="contained"
              endIcon={<AddIcon />}
            >
              Create Slot
            </ColorButton>
          </Link>
        </Stack>
{slot.map((slot, index) =>(
  <Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Stack 
     justifyContent="flex-start"
    >
        <Box style={{display: 'flex', justifyContent: 'flex-start'}}>
        <Chip label={slot.session} color="primary" style={{marginRight: "15px"}} />
    <Typography style={{color: "#8F8E8E"}}>Create Date: {moment(slot.startTime).format("DD-MM-YYYY")}</Typography>
        </Box>
        <Typography style={{fontWeight: "bold", fontSize: "20px"}}>{slot.name}</Typography>
    </Stack>
    <Link style={{marginLeft:"65%", marginTop:"auto"}} to={`/admin/detail-slot/${slot.id}`}>
          <ColorButton
            variant="contained"
            size="small"
          >
            View detail
          </ColorButton>
          </Link>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>

    </Typography>
  </AccordionDetails>
</Accordion>

))}
      
      </Box>
    </Box>
  );
}

export default DetailSyllabus;
