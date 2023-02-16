import * as React from "react";
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
import staffAPI from "../../../api/staffAPI";
import { useState } from "react";
import { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ColorButton } from "../../../styles/button";

AssignLeader.propTypes = {};

function AssignLeader(props) {
  const [staffs, setStaffs] = useState([]);
  const [idLeader, setIDLeader] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchData = async () => {
    await staffAPI.getList().then((response) => {
      setStaffs(response.responseSuccess);
      console.log(response.responseSuccess);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);
  const handleIdleader = (id) => {
    setIDLeader(id);
    console.log("id staff", id);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(props.close);
  };

  return (
    <div>
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
        <p
            style={{ padding: " 0px 0px 10px", marginTop: 40 }}
            className="title-section"
          >
            Assign Leader
          </p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow hover>
                  <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Full Name
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="left">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((staff, index) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>

                      <TableCell component="th" scope="row">
                        <Link to={`/admin/detail-project/${staff.id}`}>
                          <Button sx={{ color: "black" }} variant="text">
                            {staff.fullName}
                          </Button>
                        </Link>
                      </TableCell>

                      <TableCell align="left">{staff.email}</TableCell>
                      <TableCell align="left">
                        <ColorButton onClick={() => {props.setNewLeader(staff); handleClose()}}>
                          Assign
                        </ColorButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={staffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        {/* <DialogActions>
        <ColorButton
                onClick={() => {

                  handleClose()
                }}
                variant="contained"
              >
                Close
              </ColorButton>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default AssignLeader;
