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
  Chip,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import syllabusAPI from "../../api/syllabusAPI";
import axios from "axios";
import { StyledTextField } from "../../styles/textfield";
import { ColorButton } from "../../styles/button";
import Swal from "sweetalert2";
import InfoIcon from "@mui/icons-material/Info";
import RejectSlot from "./RejectSlot";

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
  const [openReject, setOpenReject] = useState(false);
  const [openRejectDetail, setOpenRejectDetail] = useState(false);
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
      text: "Update successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAlertError = () => {
    Swal.fire({
      title: "Error",
      text: "Update successful",
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  const handleApproveSlot = () => {
    axios
      .put(
        `https://localhost:7115/api/v1/slot/updateStatus/${props.SlotID}?Status=1`
      )
      .then((response) => {
        handleClose();
        {
          response.isSuccess ? showAlert() : showAlertError();
        }
      });
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
                {props.slot.slotStatus === 1 ? (
                  <Chip
                    label="Approve"
                    color="success"
                    style={{ marginLeft: "10px" }}
                    size="small"
                  />
                ) : props.slot.slotStatus === 2 ? (
                  <Chip
                    label="Reject"
                    color="error"
                    style={{ marginLeft: "10px" }}
                    size="small"
                  />
                ) : props.slot.slotStatus === 0 ? (
                  <Chip
                    label="New"
                    color="warning"
                    style={{ marginLeft: "10px" }}
                    size="small"
                  />
                ) : null}
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
                <Typography>{props.slot.name}</Typography>
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
                <Typography>{props.slot.timeAllocation}</Typography>
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
                <Typography>{props.slot.type}</Typography>

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
                <Typography>{props.slot.detail}</Typography>
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
                {props.slot?.slotStatus === 1 ? (
                  <>
                    <Button
                      style={{ marginRight: 10 }}
                      variant="contained"
                      onClick={() => handleApproveSlot()}
                      size="small"
                      color="success"
                    >
                      Approve
                    </Button>
                    <Button
                      disabled
                      variant="contained"
                      onClick={() => setOpenReject(true)}
                      size="small"
                      color="error"
                    >
                      Reject
                    </Button>
                  </>
                ) : props.slot?.slotStatus === 2 ? (
                  <>
                    <Button
                      style={{ marginRight: 10 }}
                      variant="contained"
                      onClick={() => handleApproveSlot()}
                      size="small"
                      color="success"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setOpenReject(true)}
                      size="small"
                      color="error"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      style={{ marginRight: 10 }}
                      variant="contained"
                      onClick={() => handleApproveSlot()}
                      size="small"
                      color="success"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setOpenReject(true)}
                      size="small"
                      color="error"
                    >
                      Reject
                    </Button>
                  </>
                )}
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
              <Typography
                sx={{
                  paddingBottom: 2,
                  float: "left",
                  fontWeight: "bold",
                  marginBottom: 2,
                  borderBottom: "1px solid black",
                  borderBottomWidth: "100%",
                }}
              >
                Reason reject
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                style={{ marginBottom: 10 }}
              >
                <div className="reject-slot-detail">
                  <p className="reject-content-detail">
                    <div className="infor-user">
                      <p>Cong Khanh </p>
                      <Typography
                        sx={{
                          float: "left",
                          marginRight: "70%",
                          fontSize: "small",
                          marginBottom: 2,
                          color: "#8F8E8E",
                        }}
                      >
                        20/2/2023
                      </Typography>
                      <Tooltip title="Rejected at 20/2/2023">
                        <InfoIcon style={{ color: "red" }} />
                      </Tooltip>
                    </div>
                    <p style={{ color: "red" }}>Rejected</p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                </div>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
                style={{ marginBottom: 10 }}
              >
                <div className="reject-slot-detail">
                  <p className="reject-content-detail">
                    <div className="infor-user">
                      <p>Cong Khanh </p>
                      <Typography
                        sx={{
                          float: "left",
                          marginRight: "70%",
                          fontSize: "small",
                          marginBottom: 2,
                          color: "#8F8E8E",
                        }}
                      >
                        20/2/2023
                      </Typography>
                      <Tooltip title="Rejected at 20/2/2023">
                        <InfoIcon style={{ color: "red" }} />
                      </Tooltip>
                    </div>
                    <p style={{ color: "red" }}>Rejected</p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </p>
                </div>
              </Stack>
            </Box>
          </>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={props.close}>
            Save changes
          </Button>
        </DialogActions> */}
        <RejectSlot
          slotID={props.slot.id}
          show={openReject}
          close={() => setOpenReject(false)}
        />
      </Dialog>
    </>
  );
}

export default PartnerDetailSlotDeal;
