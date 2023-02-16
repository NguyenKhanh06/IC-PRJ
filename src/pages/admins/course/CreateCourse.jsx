import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from "../../../styles/textfield";
import { ColorButton } from "../../../styles/button";
import courseAPI from "../../../api/courseAPI";
import { useNavigate } from "react-router-dom";

CreateCourse.propTypes = {};

function CreateCourse(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(props.close);
  };
  const [inputValue, setInputValue] = useState({
    skillname: "",
    content: "",
    activity: "",
  });
  const handleOnChangeInputCourse = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputValue,
      [name]: value,
    };

    setInputValue(input);
  };

  const data = {
    Activity: inputValue.activity,
    Content: inputValue.content,
    SkillName: inputValue.skillname,
  };

  const handleSubmit = async (e) => {
    await courseAPI.CreateCourse( inputValue.activity, inputValue.content, inputValue.skillname).then((response) => {
      console.log(response);
      // response.isSuccess = true ? navigate("/admin/create-syllabus") : null;
    });
    console.log("data course", data)
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
            Create Course
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
                Create new Course
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
                label="Skill Name"
                autoComplete="off"
                fullWidth
                size="small"
                name="skillname"
                value={inputValue.skillname}
                onChange={handleOnChangeInputCourse}
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
                name="activity"
                value={inputValue.activity}
                onChange={handleOnChangeInputCourse}
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
                Content
              </Typography>
              <StyledTextField
                label="Content"
                autoComplete="off"
                fullWidth
                size="small"
                name="content"
                value={inputValue.content}
                onChange={handleOnChangeInputCourse}
                multiline={true}
              />
            </Box>
            <Box sx={{ marginTop: 6, marginLeft: "80%" }}>
              <ColorButton
                onClick={() => {
                  handleSubmit();
                  handleClose()
                }}
                variant="contained"
              >
                Create Course
              </ColorButton>
            </Box>
          </Box>
        </Stack>
      </Box>
        </DialogContent>
      </Dialog>

  );
}

export default CreateCourse;
