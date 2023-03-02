import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import partnerAPI from "../../../api/partnerAPI";
import { Alert, Button, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddIcon from "@mui/icons-material/Add";
import { ColorButton } from '../../../styles/button';
import Filter from '../Filter';
import CreatePartner from './CreatePartner';

PartnerList.propTypes = {
    
};

function PartnerList(props) {
    const [partners, setPartners] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [createPartner, setCreatePartner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertErr, setShowAlertErr] = useState(false);
 // fetch data partner
 const fetchDataPartner = async () => {
    await partnerAPI.getList().then((response) => {
        var partnerActive = response.responseSuccess.filter(partner => partner.isActive)
      setPartners(partnerActive)
      console.log("partner", partnerActive)
    });
  };
  useEffect(() => {
    fetchDataPartner().catch((error) => {
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
              List Partner
            </Typography>
          </Stack>
       
          <ColorButton
       onClick={() => setCreatePartner(true)}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Create Partner
          </ColorButton>
     
  
        </Stack>
  
        <Filter />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                 Full name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                 Location
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                 Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners != null ? partners
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((partner, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
  
                    <TableCell component="th" scope="row" align='left'>
                    
                  <Link to="/admin/detail-partner" state={partner.id}>

                    <Button
                    
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {partner.name}
                      </Button>
          </Link>
                    </TableCell>
                    <TableCell align="left">{partner.local}</TableCell>
                    <TableCell align="left">
                    <Button
                             
                              variant="contained"
                              color="error"
                            >
                              Delete
                            </Button>
                    </TableCell>
                  </TableRow>
                )) : <></>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={partners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
<CreatePartner show= {createPartner} close = {() => setCreatePartner(false)} setShowAlert={setShowAlert} setShowAlertErr={setShowAlertErr}/>
<Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant='filled' onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }} >
   Create new partner successful!!!!
  </Alert>
</Snackbar>
<Snackbar open={showAlertErr} autoHideDuration={6000} onClose={() => setShowAlertErr(false)}  anchorOrigin={{
      vertical: "top",
      horizontal: "right"
   }}>
  <Alert variant='filled' onClose={() => setShowAlertErr(false)} severity="error" sx={{ width: '100%' }} >
    Create new partner fail!!!!
  </Alert>
</Snackbar>
      </>
    );
}

export default PartnerList;