import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ColorButton } from "../../../styles/button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
import { StyledTextField } from "../../../styles/textfield";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

DetailTask.propTypes = {};

function DetailTask(props) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [assign, setAssign] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [nameTask, setName] = useState("");
  const [description, setDes] = useState("");
  const [comment, setComment] = useState("");
  const [detailTask, setDetailTask] = useState([]);
  const [cmtTask, setcmtTask] = useState([]);
  const handleClose = () => {
    setOpen(props.close);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const fetchData = async () => {
    await axios
      .get(
        `https://localhost:7115/api/v1/task/getTaskDetaul/${props?.task?.id}`
      )
      .then(
        (response) => (
          setDetailTask(response.responseSuccess[0]),
          setDeadline(response.responseSuccess[0].deadLine),
          setDes(response.responseSuccess[0].description),
          setName(response.responseSuccess[0].taskName),
          setStatus(response.responseSuccess[0].status)
        )
      );
  };
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, [props.task]);

  const fetchDataComment = async () => {
    await axios
      .get(`https://localhost:7115/api/v1/comment/GetCommentInTask`)
      .then((response) =>
        setcmtTask(
          response.responseSuccess.filter(
            (cmt) => cmt.empTasksId === props?.task.id
          )
        )
      );
  };
  useEffect(() => {
    fetchDataComment().catch((error) => {
      console.log(error);
    });
  }, [cmtTask]);

  const handleSubmitComment = (e) => {
    const formData = new FormData();
    formData.append("Comment", comment);
    formData.append("TaskId", props?.task?.id);
    axios({
      method: "POST",
      data: formData,
      url: "https://localhost:7115/api/v1/comment/createCommentTask",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {});

    console.log("formdata", formData);
  };

  const handleSubmitUpdate = (e) => {
    const formData = new FormData();
    formData.append("TaskName", nameTask);
    formData.append("Description", description);
    formData.append("DateCreate", props?.task?.dateCreate);
    formData.append("DeadLine", deadline);
    formData.append("DateEnd", props?.task?.dateEnd);
    formData.append("IsActive", true);
    formData.append("Status", status);
    {
      props?.task?.projectId != null
        ? formData.append("ProjectId", props?.task?.projectId)
        : formData.append("ProjectId", "");
    }

    formData.append("FuturePlanId", props?.task?.futurePlanId);
    axios({
      method: "PUT",
      data: formData,
      url: `https://localhost:7115/api/v1/task/update/${props?.task?.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      {
        response.isSuccess
          ? props.setShowAlertUpdate(true)
          : props.setShowAlertErrUpdate(true);
      }

      window.location.reload(false);
    });

    console.log("formdataupdate", formData);
  };
  return (
    <Dialog
      maxWidth={false}
      open={props.show}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <TextField
          sx={{ width: "80%" }}
          id="standard-basic"
          variant="standard"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={nameTask}
        />
        <p
          style={{ padding: "6px 0px 0px 10px" }}
          className="title-section"
        ></p>
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={5}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            style={{ color: "#8F8E8E" }}
          >
            {props.task?.futurePlanId != null ? (
              <Typography>Plan:</Typography>
            ) : props?.task?.projectId != null ? (
              <Typography>Project:</Typography>
            ) : (
              <></>
            )}

            <Typography>Assign:</Typography>
            <Typography>Deadline:</Typography>
            <Typography>Status:</Typography>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {props.task?.futurePlanId != null ? (
              <Typography style={{ marginBottom: "revert" }}>
                {props?.task?.futurePlan?.planName}
              </Typography>
            ) : props?.task?.projectId != null ? (
              <Typography style={{ marginBottom: "revert" }}>
                {props?.task?.project?.projectName}
              </Typography>
            ) : (
              <></>
            )}

            <AvatarGroup max={4}>
              {props.task?.employeeInTasks?.map((emp, index) => (
                <Avatar
                  key={index}
                  sx={{ bgcolor: "orange" }}
                  alt={emp?.staffs?.fullName}
                  src="/static/images/avatar/1.jpg"
                />
              ))}
            </AvatarGroup>

            <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
            <FormControl sx={{ width: 240 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
                size="small"
              >
                <MenuItem value={0}>To do</MenuItem>
                <MenuItem value={1}>Process</MenuItem>
                <MenuItem value={2}>Review</MenuItem>
                <MenuItem value={3}>Done</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <p className="title-section">Description</p>
        <textarea
          placeholder="Click to add description"
          style={{ width: 766, height: 250 }}
          value={description}
          onChange={(e) => setDes(e.target.value)}
        ></textarea>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
            padding: "40px 20px 20px 40px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          {" "}
          <Stack>
            <p className="title-section">Comment</p>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Avatar src="/broken-image.jpg" />
            <StyledTextField
              value={comment}
              onChange={handleComment}
              size="small"
              fullWidth
              style={{ backgroundColor: "white" }}
              id="standard-basic"
              label="Click to add comment"
            />
            <ColorButton
              size="small"
              onClick={() => handleSubmitComment()}
              variant="contained"
            >
              Comment
            </ColorButton>
          </Stack>
        </Box>

        {cmtTask?.length ? (
          cmtTask.map((cmt, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F8F8F8",
                width: "100%",
                padding: "40px 20px 20px 40px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <b>Nguyen Cong Khanh</b>
              <Typography
                sx={{
                  float: "left",
                  marginRight: "60%",
                  fontSize: "small",
                  marginBottom: 2,
                  color: "#8F8E8E",
                }}
              >
                {moment(cmt.created).format("DD/MM/YYYY")}
              </Typography>
              <p>{cmt.comment}</p>
            </Box>
          ))
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={handleClose}
          variant="text"
          sx={{ color: "#22a19a" }}
        >
          Cancel
        </Button>

        <ColorButton
          size="small"
          onClick={() => handleSubmitUpdate()}
          variant="contained"
        >
          Save & close
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
}

export default DetailTask;
