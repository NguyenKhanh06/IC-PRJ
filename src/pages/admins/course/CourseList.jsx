import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Chip, IconButton, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Filter from '../Filter';
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ColorButton } from '../../../styles/button';
import { Link } from 'react-router-dom';
import courseAPI from '../../../api/courseAPI';
import moment from 'moment';
import CreateCourse from './CreateCourse';

CourseList.propTypes = {
    
};

function CourseList(props) {
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [openCreate, setOpenCreate] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
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
       
          <ColorButton
          onClick={() => setOpenCreate(true)}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Create Course
          </ColorButton>
     
  
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
                 Create Date
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
                    
                  <Link to="/admin/detail-course" state={course.id}>

                    <Button
                    
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {course.skillName}
                      </Button>
          </Link>
                    </TableCell>
                    <TableCell align="left">{moment(course.dateCreate).format("DD/MM/YYYY")}</TableCell>
                    <TableCell align="left">
                    <Button
                             
                              variant="contained"
                              color="error"
                            >
                              Delete
                            </Button>
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
  <CreateCourse show={openCreate} close={() => setOpenCreate(false)} setShowAlert={setShowAlert} setShowAlertErr={setShowAlertErr} />
  <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant='filled' onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
   Create new course successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErr} autoHideDuration={6000} onClose={() => setShowAlertErr(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant='filled' onClose={() => setShowAlertErr(false)} severity="error" sx={{ width: '100%' }} >
    Create new course fail!!!!
  </Alert>
</Snackbar>
      </>
    );
}

export default CourseList;