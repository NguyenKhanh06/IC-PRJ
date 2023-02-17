import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import syllabusAPI from "../../api/syllabusAPI";
import axios from "axios";
import { StyledTextField } from "../../styles/textfield";
import { ColorButton } from "../../styles/button";
import Swal from "sweetalert2";

PartnerDetailSlotDeal.propTypes = {};

function PartnerDetailSlotDeal(props) {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState({});
  const [editSession, setEditSession] = useState("");
  const [editTopic, setEditTopic] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editType, setEditType] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [openApprove, setOpenApprove] = React.useState(false);

  const handleClickOpenConfirmApprove = () => {
    openApprove(true);
  };

  const handleCloseConfirmApprove = () => {
    openApprove(false);
  };
  // const fetchData = async () => {
  //     await syllabusAPI.getSlotWithID(props.SlotID).then((response) => {
  //       setSlot(response.responseSuccess[0]);

  //       console.log("response", response.responseSuccess);
  //     });
  //   };
  //   useEffect(() => {
  //     fetchData().catch((error) => {
  //       console.log(error);
  //     });
  //   }, []);

  useEffect(() => {
    if (props.slot != null) {
      setSlot(props.slot);
      setEditSession(props.slot.session);
      setEditTopic(props.slot.name);
      setEditTime(props.slot.timeAllocation);
      setEditType(props.slot.type);
      setEditDetail(props.slot.detail);
    }
  }, [props.slot]);
  const handleOnChangeSession = (event) => {
    setEditSession(event.target.value);
  };
  const handleOnChangeTopic = (event) => {
    setEditTopic(event.target.value);
  };
  const handleOnChangeTime = (event) => {
    setEditTime(event.target.value);
  };
  const handleOnChangeType = (event) => {
    setEditType(event.target.value);
  };
  const handleOnChangeDetail = (event) => {
    setEditDetail(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(props.show);
  };
  const handleClose = () => {
    setOpen(props.close);
  };
  const Swal = require("sweetalert2");
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Alert successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAlertError = () => {
    Swal.fire({
      title: "Error",
      text: "Alert successful",
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  const handleApproveSlot = () => {
    axios
      .put(
        `https://localhost:7115/api/v1/slot/updateStatus/${props.SlotID}?Status=1`
      ).then((response) => {
        handleClose()
        {response.isSuccess ? showAlert() : showAlertError()}
      })
  };
  const handleRejectSlot = () => {
    axios
      .put(
        `https://localhost:7115/api/v1/slot/updateStatus/${props.SlotID}?Status=2`
      ).then((response) => {
        handleClose()
        {response.isSuccess ? showAlert() : showAlertError()}
      })
  };
  const handleUpdateSlot = () => {
    axios
      .put(
        `https://localhost:7115/api/v1/slot/update/${props.SlotID}?Name=${editTopic}&Detail=${editDetail}&Session=${editSession}&TimeAllocation=${editTime}&Type=${editType}&SyllabusId=${props.slot.syllabusId}`
      )
      .then((response) => {
        handleClose();
        {
          response.isSuccess ? showAlert() : showAlertError();
        }
      });
  };
  console.log("slot", props.slot);
  // const confirmUpdate = () => {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: false
  //   })
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#09A73F',
  //     cancelButtonColor: '#FF0000',
  //     confirmButtonText: 'Update slot!',
  //     onConfirm: handleUpdateSlot()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       swalWithBootstrapButtons.fire(
  //         'Updated!',
  //         'Slot has been Updated.',
  //         'success'
  //       )
  //     }
  //   })
  // }

  return (
  <>
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.show}
    >
      {/* <DialogTitle
          id="customized-dialog-title"
          onClose={props.close}
        ></DialogTitle> */}
      <DialogContent>
        <>
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
                Detail Slot
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
                Slot
              </Typography>
              <Typography>{props.slot.session}</Typography>
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
                Topic
              </Typography>
              <StyledTextField
                label="Topic"
                autoComplete="off"
                fullWidth
                size="small"
                name="topic"
                value={editTopic}
                onChange={handleOnChangeTopic}
              />
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
                Time Allocation
              </Typography>
              <StyledTextField
                label="Time Allocation"
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={editTime}
                onChange={handleOnChangeTime}
              />
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
                Learning's Type
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Learning Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editType}
                  label="Learning Type"
                  onChange={handleOnChangeType}
                  sx={{ backgroundColor: "white", textAlign: "left" }}
                  size="small"
                >
                  <MenuItem value={"Offline"}>Offline</MenuItem>
                  <MenuItem value={"Online"}>Online</MenuItem>
                  <MenuItem value={"Offline/Online"}>Offline/Online</MenuItem>
                </Select>
              </FormControl>

              {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={editType}
    label="Learning Type"
    onChange={handleChange}
    sx={{ backgroundColor: "white" }}
    size="small"
  >
    <MenuItem value={"Offline"}>Offline</MenuItem>
    <MenuItem value={"Online"}>Online</MenuItem>
    <MenuItem value={"Offline/Online"}>Offline/Online</MenuItem>
  </Select>
</FormControl> */}
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
                Detail
              </Typography>
              <StyledTextField
                label="Detail"
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={editDetail}
                onChange={handleOnChangeDetail}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
              {/* <Button
          variant="contained"
          color="success"
          onClick={() => {
           
          }}
        >
          Approve
        </Button> */}

              <Button
                onClick={() => {
                  handleApproveSlot();
                }}
                variant="contained"
                color="success"
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  handleRejectSlot();
                }}
                variant="contained"
                color="error"
              >
                Reject
              </Button>
              <ColorButton
                onClick={() => {
                  handleUpdateSlot()
                }}
                variant="contained"
              >
                Update Slot
              </ColorButton>
            </Stack>
          </Box>
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
                fullWidth
                label="Click to add comment"
                size="small"
              />
              <ColorButton variant="contained" size="small">
                Comment
              </ColorButton>
            </Stack>
          </Box>
        </>
      </DialogContent>
      {/* <DialogActions>
          <Button autoFocus onClick={props.close}>
            Save changes
          </Button>
        </DialogActions> */}
      
    </Dialog>
   
  </>
  );
}

export default PartnerDetailSlotDeal;
