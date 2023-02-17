import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import moment from 'moment/moment';

import { Link } from 'react-router-dom';
import { ColorButton } from '../../styles/button';
import { Stack } from '@mui/system';
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Filter from '../admins/Filter';

PartnerDeal.propTypes = {
    
};

function PartnerDeal(props) {
    var partner = JSON.parse(sessionStorage.getItem("partner"));

    const items = JSON.parse(localStorage.getItem('items'));


    const [projects, setProjects] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  var result = partner.projects.map(project => (console.log(project.projectName)));

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
            List project
          </Typography>
        </Stack>
        <Link to="/admin/create-project">
          <ColorButton endIcon={<AddIcon />} variant="contained">
            Create project
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
                Project's name
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Start date <ArrowUpwardIcon sx={{ width: 20 }} />
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                End date <ArrowUpwardIcon sx={{ width: 20 }} />
              </TableCell>
              {/* <TableCell sx={{ fontWeight: 700 }} align="left">
                Course
              </TableCell> */}
              <TableCell sx={{ fontWeight: 700 }} align="left">
               Fee
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partner.projects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>

                  <TableCell component="th" scope="row">
                    <Link  to={`/partner/detail-project-deal/${project?.courseId}`}>
                      <Button sx={{ color: "black" }} variant="text">
                        {project.projectName}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    {moment(project.estimateTimeStart).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="left">
                    {moment(project.estimateTimeEnd).format("DD/MM/YYYY")}
                  </TableCell>
                  {/* <TableCell align="left">{project.course.skillName}</TableCell> */}
                  <TableCell align="left">
                    {project.fee}
                  </TableCell>
                  <TableCell align="left">
                    {project.status === 0 ? (
                      <Chip label="New" color="warning" />
                    ) : project.status === 1 ? (
                      <Chip label="Process" color="primary" />
                    ) : project.status === 2 ? (
                      <Chip label="Review" color="secondary" />
                    ) : (
                      <Chip label="Done" color="success" />
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
        count={partner.projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </> 
    );
}

export default PartnerDeal;