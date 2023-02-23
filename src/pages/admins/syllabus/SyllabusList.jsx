import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
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
import Filter from "../Filter";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ColorButton } from "../../../styles/button";
import { Link } from "react-router-dom";
import courseAPI from "../../../api/courseAPI";
import syllabusAPI from "../../../api/syllabusAPI";
import SearchIcon from "@mui/icons-material/Search";
import { TextFields } from "@mui/icons-material";

SyllabusList.propTypes = {};

function SyllabusList(props) {
  const [syllabus, setSyllabus] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [age, setAge] = useState("");

  const fetchData = async () => {
    await syllabusAPI.getList().then((response) => {
      setSyllabus(response.responseSuccess);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
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
        style={{ marginRight: "85%" }}
        variant="h5"
        component="h2"
        gutterBottom
      >
        List Syllabus
      </Typography>

      <Stack
        sx={{
          marginBottom: 2,
          marginTop: 2,
          height: 75,
          backgroundColor: "#F8F8F8",
        }}
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Status</InputLabel>
          <Select
            sx={{ backgroundColor: "white" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Active</MenuItem>
            <MenuItem value={20}>Deactivate</MenuItem>
          </Select>
        </FormControl>
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
                Syllabus's name
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Create date
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syllabus
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((syl, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>

                  <TableCell component="th" scope="row">
                    <Link to={`/admin/detail-syllabus/${syl.id}`}>
                      <Button sx={{ color: "black" }} variant="text">
                        {syl.content}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="left">{syl.startTime}</TableCell>
                  <TableCell align="left">
                    {syl.status == true ? (
                      <Chip label="Active" color="success" />
                    ) : (
                      <Chip label="Deactivate" color="error" />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {syl.status == true ? (
                      <Button variant="contained" disabled>
                        Delete
                      </Button>
                    ) : (
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={syllabus.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default SyllabusList;
