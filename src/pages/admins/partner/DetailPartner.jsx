import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import partnerAPI from '../../../api/partnerAPI';
import { Link, useLocation } from 'react-router-dom';
import { Stack } from '@mui/system';
import { Box, Button, FormControlLabel, InputAdornment, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledTextField } from '../../../styles/textfield';
import { ColorButton } from '../../../styles/button';
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";



DetailPartner.propTypes = {
    
};

function DetailPartner(props) {

  const location = useLocation();
  const partnerID = location.state;

const [partner, setPartner] = useState({});
const [name, setName] = useState("");
const [local, setLocal] = useState("");
const [note, setNote] = useState("");
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(15);
const [openCreate, setOpenCreate] = useState(false);
const [campuses, setCampuses] = useState([])



const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


    const fetchData = async () => {
        await partnerAPI.getPartDetail(partnerID).then((response) => {
            setPartner(response.responseSuccess[0])
       setCampuses(response.responseSuccess[0].campuses)
            setName(response.responseSuccess[0].name)
            setLocal(response.responseSuccess[0].local)
            
            {response.responseSuccess[0].note != null ? setNote(response.responseSuccess[0].note) : setNote("")}
        })
    }

    console.log("detail", partnerID)

    useEffect(() => {
        fetchData().catch((error) => {
          console.log(error);
        });
      }, []);


 

      const handleUpdate = () => {

      }
    


      const handleOnChangeName = (e) => {
        setName(e.target.value)
      }

      const handleOnChangelocal = (e) => {
        setLocal(e.target.value)
      }
      const handleOnChangeNote = (e) => {
        setNote(e.target.value)
      }

    return (
    <>
         <form onSubmit={handleUpdate}>
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
              DETAIL PARTNER
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
                Detail Partner
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
                Full Name
              </Typography>
              <StyledTextField
                placeholder="Full Name"
                autoComplete="off"
                fullWidth
                size="small"
                name="name"
                value={name}
                onChange={handleOnChangeName}
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
                Location
              </Typography>
              <StyledTextField
                placeholder="Location"
                autoComplete="off"
                fullWidth
                size="small"
                name="content"
                value={local}
                onChange={handleOnChangelocal}
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
                Note
              </Typography>
              <StyledTextField
                placeholder="Note"
                multiline={true}
                rows={5}
                autoComplete="off"
                fullWidth
                
                size="small"
                name="note"
                value={note}
                onChange={handleOnChangeNote}
              />
            </Box>
         
     
     
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 6 }}
            >
              <ColorButton
                onClick={() => {
                  handleUpdate();
                }}
                variant="contained"
              >
                  Update course
              </ColorButton>
            </Stack>
          </Box>
        </Box>
      </form>

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
            List Campus
          </Typography>

          <ColorButton
            sx={{ marginTop: "35px" }}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Create Syllabus
          </ColorButton>
        </Stack>

        <Stack
          sx={{
            marginBottom: 2,
            marginTop: 2,
            height: 75,
            backgroundColor: "white",
          }}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          spacing={1}
        >
 
    
          <Box style={{ marginRight: "30px" }}>
            <TextField
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
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Campus's name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Address
                </TableCell>
              
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campuses?.length ? campuses.filter(camp => camp.isActive)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((campus, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>

                    <TableCell component="th" scope="row">
                      <Button
                        
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {campus.name}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {campus.address}
                    </TableCell>
                    <TableCell align="left">
                    <Button variant="contained" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                )): <></>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={campuses?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* list avt */}


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
            List Avatar
          </Typography>

          <ColorButton
            sx={{ marginTop: "35px" }}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Create Avatar
          </ColorButton>
        </Stack>

        <Stack
          sx={{
            marginBottom: 2,
            marginTop: 2,
            height: 75,
            backgroundColor: "white",
          }}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          spacing={1}
        >
 
    
          <Box style={{ marginRight: "30px" }}>
            <TextField
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
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Avatar's name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Address
                </TableCell>
              
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partner?.avatars?.length ? partner.avatars
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((campus, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>

                    <TableCell component="th" scope="row">
                      <Button
                        
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {campus.name}
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {campus.address}
                    </TableCell>
                    <TableCell align="left">
                    <Button variant="contained" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                )): <></>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={campuses?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
    );
}

export default DetailPartner;