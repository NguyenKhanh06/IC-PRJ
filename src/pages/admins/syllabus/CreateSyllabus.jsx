import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Dialog, DialogContent, Link, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { ColorButton } from "../../../styles/button";
import { useLocation, useNavigate } from "react-router-dom";
import syllabusAPI from "../../../api/syllabusAPI";
import axios from "axios";
CreateSyllabus.propTypes = {};

function CreateSyllabus(props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    courseid: props.courseid

  });
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(props.close);
  };
  const handleOnChangeInputSyl = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputValue,
      [name]: value,
    };

    setInputValue(input);
  };

  const data = {
    Content: inputValue.name,
    Description: inputValue.description,
    CourseId: inputValue.courseid
  }
  console.log(inputValue.courseid)
  const handleSubmit = async (e) => {
    await axios.post(`https://localhost:7115/api/v1/syllabus/create?Content=${inputValue.description}&Description=${inputValue.name}&CourseId=${props.courseid}`).then((response)=>{
      console.log(response);
    })
  };

  return (
    <Dialog
    fullWidth
    maxWidth="md"
     open={props.show}
     onClose={props.close}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >

     <DialogContent>
     <Box>
     <Stack>
       <p
         style={{ padding: " 0px 0px 10px", marginTop: 40 }}
         className="title-section"
       >
         Create Syllabus
       </p>
       <Box
         sx={{
           display: "flex",
           flexDirection: "column",
           backgroundColor: "#F0F0F0",
           width: "100%",
           padding: "10px 20px 20px 40px",
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
             Create new Syllabus
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
             Syllabus Name
           </Typography>
           <StyledTextField
             label="Syllabus Name"
             autoComplete="off"
             fullWidth
             size="small"
             name="name"
             value={inputValue.name}
             onChange={handleOnChangeInputSyl}
             multiline={true}
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
            Description
           </Typography>
           <StyledTextField
             label="Content"
             autoComplete="off"
             fullWidth
             size="small"
             name="description"
             value={inputValue.description}
             onChange={handleOnChangeInputSyl}
             multiline={true}
           />
         </Box>
         <Box sx={{ marginTop: 6, marginLeft: "75%" }}>
           <ColorButton
             onClick={() => {
               handleSubmit();
               handleClose()
             }}
             variant="contained"
           >
             Create Syllabus
           </ColorButton>
         </Box>
       </Box>
     </Stack>
   </Box>
     </DialogContent>
   </Dialog>
  );
}

export default CreateSyllabus;
