import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
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
import syllabusAPI from "../../../../api/syllabusAPI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ColorButton } from "../../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import axios from "axios";
import { StyledTextField } from "../../../../styles/textfield";
import { padding } from "@mui/system";
import CreateSlot from "../CreateSlot";
import SearchIcon from "@mui/icons-material/Search";
import DetailSlot from "../DetailSlot";
AcopySyllabus.propTypes = {};

function AcopySyllabus(props) {
  const [syllabusDetail, setSyllabusDetail] = useState({});
  const [slots, setSlots] = useState([]);
  const [slotDetail, setSlotDetail] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openCreateSlot, setOpenCreateSlot] = useState(false);
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [detail, setDetail] = useState({});
  const [viewDetail, setViewDetail] = useState(false);
  const [inputSlot, setInputSlot] = useState({
    name: "",
    detail: "",
    session: "",
    timeAllocation: 0,
    type: "",
    syllabusId: props.syllabusCopy.id,
  });
  const [editSession, setEditSession] = useState("");
  const [editTopic, setEditTopic] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editType, setEditType] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [editIndex, setEditIndex] = useState("");

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

  const handleCloseCreate = () => {
    setOpenCreateSlot(false);
  };
  const handleOpenCreate = () => {
    setOpenCreateSlot(true);
  };

  const handleCloseDetail = () => {
    setViewDetail(false);
  };
  const handleOpenDetail = () => {
    setViewDetail(true);
  };

  const handleClose = () => {
    setOpen(props.close);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditContent = (event) => {
    setEditContent(event.target.value);
  };
  const handleEditDes = (event) => {
    setEditDescription(event.target.value);
  };
  // setSyllabusDetail(props.syllabusDetail)
  // console.log("syllabusDetail",props.syllabusDetail);
  const handleIDSlot = (detail, index) => {
    setDetail(detail);
    setEditSession(detail.session);
    setEditTopic(detail.name);
    setEditTime(detail.timeAllocation);
    setEditType(detail.type);
    setEditDetail(detail.detail);
    setEditIndex(index);
    console.log("detail", index);
    handleOpenDetail();
  };

  useEffect(() => {
    if (props.syllabusCopy != null) {
      setEditContent(props.syllabusCopy.content);
      setEditDescription(props.syllabusCopy.description);
      setSlots(props.syllabusCopy.slots);
    }
  }, [props.syllabusCopy]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const input = {
      ...inputSlot,
      [name]: value,
    };

    setInputSlot(input);
  };

  const handleAddSlotToDraft = () => {
    const newArr = [...slots, inputSlot];
    setSlots(newArr);
    const newObj = {
      ...inputSlot,
      name: "",
      detail: "",
      session: "",
      timeAllocation: 0,
      type: "",
      syllabusId: props.syllabusCopy.id,
    };
    setInputSlot(newObj);
  };
  const handleDeleteDraft = (index) => {
    const newArr = [...slots];
    newArr.splice(index, 1);
    setSlots(newArr);
  };

  const handleUpdateSlot = () => {
    console.log("Before update: ", slots[editIndex]);
    slots[editIndex].session = editSession;
    slots[editIndex].name = editTopic;
    slots[editIndex].timeAllocation = editTime;
    slots[editIndex].type = editType;
    slots[editIndex].detail = editDetail;
    console.log("After update: ", slots[editIndex]);
  };

  const handleSubmit = (e) => {
    axios
      .post(
        `https://localhost:7115/api/v1/syllabus/create?Content=${editContent}&Description=${editDescription}&CourseId=${props.syllabusCopy.courseId}`
      )
      .then((responseSyl) => {
        console.log(responseSyl);
        responseSyl.isSuccess
          ? slots.map((slot, index) =>
              axios
                .post(
                  `https://localhost:7115/api/v1/slot/create?Name=${slot.name}&Detail=${slot.detail}&Session=${slot.session}&TimeAllocation=${slot.timeAllocation}&Type=${slot.type}&SyllabusId=${responseSyl.responseSuccess.id}`
                )
                .then((response) => {
                  console.log(response);
                  window.location.reload(false);
                })
            )
          : alert("khong the tao slot");
      });
  };
  console.log("draft", slots);
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
              onChange={handleEditContent}
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
              Description
            </Typography>
            <StyledTextField
              autoComplete="off"
              fullWidth
              size="small"
              name="description"
              value={editDescription}
              onChange={handleEditDes}
            />
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
            <Box>
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
                backgroundColor: "white",
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
                sx={{ marginRight: "30px" }}
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => {
                  setOpenCreateSlot(true);
                }}
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
                  {slots.length ? (
                    slots
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((slot, index) => (
                        <TableRow
                          hover
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{slot.session}</TableCell>

                          <TableCell component="th" scope="row">
                            <Button
                              onClick={() => handleIDSlot(slot, index)}
                              sx={{ color: "black" }}
                              variant="text"
                            >
                              {slot.name}
                            </Button>
                          </TableCell>

                          <TableCell align="left">{slot.type}</TableCell>
                          <TableCell align="left">
                            {slot.timeAllocation}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              onClick={() => handleDeleteDraft(index)}
                              variant="contained"
                              color="error"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={slots.length}
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
            sx={{ marginLeft: "auto" }}
          >
            <Button
              style={{ color: "#22A19A" }}
              variant="text"
              onClick={() => handleClose()}
            >
              Close
            </Button>
            <ColorButton
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Syllabus
            </ColorButton>
          </Stack>
        </Box>

        {/* detail slot */}
        <Dialog
          fullWidth
          maxWidth="md"
          onClose={handleCloseDetail}
          aria-labelledby="customized-dialog-title"
          open={viewDetail}
        >
          {/* <DialogTitle
          id="customized-dialog-title"
          onClose={props.close}
        ></DialogTitle> */}
          <DialogContent>
            <Box>
              <Stack>
                <p
                  style={{ padding: "6px 0px 0px 10px", marginTop: 40 }}
                  className="title-section"
                >
                  DETAIL SLOT
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
                  <StyledTextField
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="SESSION"
                    value={editSession}
                    onChange={handleOnChangeSession}
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
                    Topic
                  </Typography>
                  <StyledTextField
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="SESSION"
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
                  {/* <StyledTextField
              label="Time Allocation"
              autoComplete="off"
              fullWidth
              size="small"
              name="SESSION"
              value={editTime}
              onChange={handleOnChangeTime}
            /> */}
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
                    name="SESSION"
                    value={editType}
                    onChange={handleOnChangeType}
                  />
                  {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editType}
          label="Learning Type"
          onChange={handleOnChangeType}
          sx={{ backgroundColor: "white", textAlign: "left" }}
          size="small"
        >
                  <MenuItem value={""}>None</MenuItem>
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
                    Update slot
                  </ColorButton>
                </Stack>
              </Box>
            </Box>
          </DialogContent>
          {/* <DialogActions>
          <Button autoFocus onClick={props.close}>
            Save changes
          </Button>
        </DialogActions> */}
        </Dialog>

        {/* create slot */}
        <Dialog
          fullWidth
          maxWidth="md"
          open={openCreateSlot}
          onClose={handleCloseCreate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Box>
              <p
                style={{ padding: "6px 0px 0px 10px" }}
                className="title-section"
              >
                CREATE SLOT
              </p>

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
                    Create new slot
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
                    Slot
                  </Typography>
                  <StyledTextField
                    label=" Slot"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="session"
                    value={inputSlot.session}
                    onChange={handleOnChange}
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
                    Topic
                  </Typography>
                  <StyledTextField
                    label="Topic"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="name"
                    value={inputSlot.name}
                    onChange={handleOnChange}
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
                    Time Allocation
                  </Typography>
                  <StyledTextField
                    type="number"
                    label=" Time Allocation"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="timeAllocation"
                    value={inputSlot.timeAllocation}
                    onChange={handleOnChange}
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
                    Learning Type
                  </Typography>
                  <StyledTextField
                    label="Detail"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="type"
                    value={inputSlot.type}
                    onChange={handleOnChange}
                  />
                  {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Learning Type"
          onChange={handleChange}
          sx={{ backgroundColor: "white" }}
          size="small"
        >
          <MenuItem value= {0}>None</MenuItem>
          <MenuItem value= {1}>Offline</MenuItem>
          <MenuItem value={2}>Online</MenuItem>
          <MenuItem value={3}>Offline/Online</MenuItem>
        </Select>
      </FormControl> */}
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
                    Detail
                  </Typography>
                  <StyledTextField
                    label="Detail"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    name="detail"
                    value={inputSlot.detail}
                    onChange={handleOnChange}
                  />
                </Box>
                <Box sx={{ marginTop: 6, marginLeft: "80%" }}>
                  <ColorButton
                    onClick={() => {
                      handleAddSlotToDraft();
                      handleCloseCreate();
                    }}
                    variant="contained"
                  >
                    Create Slot
                  </ColorButton>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </form>
    </Box>
  );
}

export default AcopySyllabus;
