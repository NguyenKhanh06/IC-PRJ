import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Chip, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Filter from '../Filter';
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ColorButton } from '../../../styles/button';
import { Link } from 'react-router-dom';
import courseAPI from '../../../api/courseAPI';

CourseList.propTypes = {
    
};

function CourseList(props) {
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const fetchData = async () => {
      await courseAPI.getList().then((response) => {
        setCourses(response.responseSuccess
          )
        console.log(response.responseSuccess)
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
    return (
        <>
        <Stack
          sx={{ marginTop: 1 }}
          justifyContent="space-around"
          direction="row"
          alignItems="center"
          spacing="57%"
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
            <Typography variant="h5" component="h2" gutterBottom>
              List Course
            </Typography>
          </Stack>
          <Link to="/admin/create-course">
          <ColorButton
            endIcon={<AddIcon />}
            variant="contained"
          >
            Create Course
          </ColorButton>
          </Link>
  
        </Stack>
  
        <Filter />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Course's name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Time Distribution
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
              {courses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
  
                    <TableCell component="th" scope="row">
                    <Link to={`/admin/detail-course/${course.id}`} courses = {courses}>
                    <Button
                    
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {course.skillName}
                      </Button>
          </Link>
                    </TableCell>
                    <TableCell align="left">{course.activity}</TableCell>
                    <TableCell align="left">
                      {course.status == true ? (
                        <Chip label="Active" color="success" />
                      ) : <Chip label="Deactivate" color="error" />}
                    </TableCell>
                    <TableCell align="left">
                      {course.status == true ? (
                        <Button variant="contained" disabled>
                        Delete
                      </Button>
                       
                      ) :   <Button variant="contained" color="error">
                      Delete
                    </Button>}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  
      </>
    );
}

export default CourseList;