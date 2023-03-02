import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import partnerAPI from "../../../api/partnerAPI";
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { ColorButton } from "../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

import DetailCampus from "./DetailCampus";
import CreateCampus from "./CreateCampus";

ManageCampus.propTypes = {
    
};

function ManageCampus(props) {
    var partner = JSON.parse(sessionStorage.getItem("partner"));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [openCreate, setOpenCreate] = useState(false);
  
    const [campuses, setCampuses] = useState([]);
    const [campus, setCampus] = useState({});
    const [openDetail, setOpenDetail] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const fetchData = async () => {
      await partnerAPI.getListCampus().then((response) => {
        setCampuses(
          response.responseSuccess.filter((camp) => camp.partnerId === partner.id)
        );
        console.log("camp",response.responseSuccess);
      });
    };
  
    useEffect(() => {
      fetchData().catch((error) => {
        console.log(error);
      });
    }, []);
  
    const handleDetailCamp = (camp) => {
      setCampus(camp);
      setOpenDetail(true);
    };
    return (
        <>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "25%",
              
            }}
          >
            <CircularProgress style={{color: "#22a19a"}} />
            <p>creating....</p>
          </Box>
        ) : (
          <>
                <Box>
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
          style={{ marginRight: "80%" }}
          variant="h5"
          component="h2"
          gutterBottom
        >
          List Campus
        </Typography>
  
        <Stack
          sx={{
            marginBottom: 2,
            marginTop: 2,
            height: 75,
            backgroundColor: "#F8F8F8",
          }}
          justifyContent="space-around"
          direction="row"
          alignItems="center"
          spacing={70}
        >
          <Stack
            Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            spacing={1}
          >
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
          </Stack>
          <ColorButton
            sx={{ marginTop: "35px" }}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Create Campus
          </ColorButton>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                 Campus name
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
              {campuses?.length ? (
                campuses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((camp, index) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
  
                      <TableCell component="th" scope="row">
                        <Button
                          onClick={() => handleDetailCamp(camp)}
                          sx={{ color: "black" }}
                          variant="text"
                        >
                          {camp.name}
                        </Button>
                      </TableCell>
                  
                   
                      <TableCell align="left">{camp.address}</TableCell>
                     
                      <TableCell align="left">
                      <Button variant="contained" color="error">Delete</Button>
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
          count={campuses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <DetailCampus
          camp={campus}
          show={openDetail}
          close={() => setOpenDetail(false)}
   
        />
        <CreateCampus partnerID={partner.id}
          show={openCreate}
          close={() => setOpenCreate(false)}
          setShowAlert={setShowAlert}
          setShowAlertErr={setShowAlertErr} 
          setLoading={setLoading}
          />
  
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            variant="filled"
            onClose={() => setShowAlert(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Create new course successful!!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showAlertErr}
          autoHideDuration={6000}
          onClose={() => setShowAlertErr(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            variant="filled"
            onClose={() => setShowAlertErr(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Create new course fail!!!!
          </Alert>
        </Snackbar>
      </Box>
          </>
        )}
      </>
    );
}

export default ManageCampus;