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
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { ColorButton } from "../../../styles/button";
import { StyledTextField } from "../../../styles/textfield";
import syllabusAPI from "../../../api/syllabusAPI";
import slotAPI from "../../../api/slotAPI";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import RejectDetail from "./RejectDetail";

DetailSlotDeal.propTypes = {};

function DetailSlotDeal(props) {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState([]);
  const [editSession, setEditSession] = useState("");
  const [editTopic, setEditTopic] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editType, setEditType] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [openRejectDetail, setOpenRejectDetail] = useState(false);
  const [reasonDetail, setReasonDetail] = useState({});

  const fetchData = async () => {
    await syllabusAPI.getSlotWithID(props.SlotID).then((response) => {
      setSlot(response.responseSuccess[0]);
    });
  };
  console.log("response", props.slot);
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);
  useEffect(() => {
    if (props.slot != null) {
      setSlot(props.slot);
      setEditSession(props.slot.session);
      setEditTopic(props.slot.name);
      setEditTime(props.slot.timeAllocation);
      setEditType(props.slot?.type);
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
  const handleRejectSlot = () => {
    axios
      .put(
        `https://localhost:7115/api/v1/slot/updateStatus/${props.SlotID}?Status=2`
      )
      .then((response) => {
        handleClose();
        {
          response.isSuccess ? showAlert() : showAlertError();
        }
      });
  };

  console.log();

  return (
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
              {props?.slot?.slotStatus === 1 ? (
                <Chip
                  label="Approve"
                  color="success"
                  style={{ marginLeft: "10px" }}
                  size="small"
                />
              ) : props?.slot?.slotStatus === 2 ? (
                <Chip
                  label="Reject"
                  color="error"
                  style={{ marginLeft: "10px" }}
                  size="small"
                />
              ) : props?.slot?.slotStatus === 0 ? (
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
              <StyledTextField
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
              {/* <StyledTextField
                autoComplete="off"
                fullWidth
                size="small"
                name="SESSION"
                value={editTime}
                onChange={handleOnChangeTime}
              /> */}
              <OutlinedInput
                style={{ backgroundColor: "white" }}
                type="number"
                autoComplete="off"
                fullWidth
                size="small"
                name="fee"
                value={editTime}
                onChange={handleOnChangeTime}
                endAdornment={
                  <InputAdornment position="end">Minutes</InputAdornment>
                }
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
              <StyledTextField
                autoComplete="off"
                fullWidth
                size="small"
                name="type"
                value={editType}
                onChange={handleOnChangeType}
              />
              {/* <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={editType}
                  onChange={handleOnChangeType}
                  sx={{ backgroundColor: "white", textAlign: "left" }}
                  size="small"
                >
                  <MenuItem value={"0"}>None</MenuItem>
                  <MenuItem value={"1"}>Offline</MenuItem>
                  <MenuItem value={"2"}>Online</MenuItem>
                  <MenuItem value={"3"}>Offline/Online</MenuItem>
                </Select>
              </FormControl> */}

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


              <ColorButton
                onClick={() => {
                  handleUpdateSlot();
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
            {props?.slot?.reasons?.length ? props.slot.reasons.map((reason, index) => (
 <Stack
 direction="row"
 justifyContent="space-evenly"
 alignItems="center"
 spacing={2}
 style={{ marginBottom: 10 }}
>
{/* <div className="reject-slot">
  
                      <p className="reject-content">
                        <p style={{color: "red"}} >Rejected</p>
                        {reason.reasonContent}
                      </p>
                      <ColorButton onClick={() => setOpenRejectDetail(true)}>View Detail</ColorButton>
                    </div> */}
 <div className="reject-slot">
   <p className="reject-content">

     <div className="infor-user">
     <Tooltip  title= {`Rejected at: ${moment(reason.dateCreate).format("DD/MM/YYYY")}`}>
         <InfoIcon style={{color: "red", marginBottom: "15px"}} />
       </Tooltip>
       <p>Cong Khanh </p>
       <Typography
         sx={{
           float: "left",
           marginRight: "60%",
           fontSize: "small",
           marginBottom: 2,
           color: "#8F8E8E",
         }}
       >
         {moment(reason.dateCreate).format("DD/MM/YYYY")}
         
       </Typography>
       
     
     </div>
     <p style={{ color: "red" }}>Rejected</p>
     {reason.reasonContent}
   </p>
   <Stack
 direction="column"
 justifyContent="space-between"
 alignItems="flex-end"
 spacing={2}
   >
 
   <ColorButton onClick={() => {setOpenRejectDetail(true); setReasonDetail(reason)}}>View Detail</ColorButton>
   </Stack>


 </div>

</Stack>
)) : <></>}
          </Box>
        </>
      </DialogContent>
      {/* <DialogActions>
          <Button autoFocus onClick={props.close}>
            Save changes
          </Button>
        </DialogActions> */}
        <RejectDetail reason = {reasonDetail} show={openRejectDetail} close = {() => setOpenRejectDetail(false)}/>

    </Dialog>
  );
}

export default DetailSlotDeal;
