import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { ColorButton } from "../../../styles/button";
import { useLocation, useNavigate } from "react-router-dom";
import syllabusAPI from "../../../api/syllabusAPI";
import axios from "axios";
CreateSyllabus.propTypes = {};

function CreateSyllabus(props) {
  const navigate = useNavigate();
  const location = useLocation()
  const { courseid } = location.state
  const [inputValue, setInputValue] = useState({
    content: "",
    description: "",
    courseid: courseid

  });
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
    Content: inputValue.content,
    Description: inputValue.description,
    CourseId: inputValue.courseid
  }
  console.log(inputValue.courseid)
  const handleSubmit = async (e) => {
    await axios.post(`https://localhost:7115/api/v1/syllabus/create?Content=${inputValue.content}&Description=${inputValue.description}&CourseId=${inputValue.courseid}`).then((response)=>{
      console.log(response);
      navigate(`/admin/detail-course/${inputValue.courseid}`)
    })
  };

  return (
    <form onSubmit={handleSubmit}>
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
            CREATE SYLLABUS
          </p>
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
                Syllabus Content
              </Typography>
              <StyledTextField
                label="Syllabus Name"
                autoComplete="off"
                fullWidth
                size="small"
                name="content"
                value={inputValue.content}
                onChange={handleOnChangeInputSyl}
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
                Syllabus Description
              </Typography>
              <StyledTextField
                label="Description"
                autoComplete="off"
                fullWidth
                size="small"
                name="description"
                value={inputValue.description}
                onChange={handleOnChangeInputSyl}
                multiline={true}
              />
            </Box>
            <Box sx={{marginTop: 6, marginLeft: "85%"}}>
        <ColorButton
        onClick={() =>{
            handleSubmit();
        }}
            variant="contained"
          >
            Create Syllabus
          </ColorButton>
        </Box>
          </Box>
     
        </Stack>
      </Box>
    </form>
  );
}

export default CreateSyllabus;
