import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreateTask from "./CreateTask";
import {
  Alert,
  Button,
  Chip,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Filter from "../Filter";
import taskAPI from "../../../api/taskAPI";
import { ColorButton } from "../../../styles/button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import CreatePlan from "./CreatePlan";
import { Link } from "react-router-dom";

PlanList.propTypes = {};

function PlanList(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [value, setValue] = useState(null);
  const [age, setAge] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [plans, setPlans] = useState([]);

  const handleClickOpenAssign = () => {
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenMember = () => {
    setOpenMember(true);
  };

  const handleCloseMember = () => {
    setOpenMember(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    await taskAPI.getList().then((response) => {
      setPlans(response.responseSuccess);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {});
  }, []);

  return (
    <>
      <Stack
        sx={{ marginTop: 1 }}
        justifyContent="flex-end"
        direction="row"
        alignItems="center"
      >
        <ColorButton
          style={{ float: "right" }}
          endIcon={<AddIcon />}
          onClick={handleClickOpenCreate}
          variant="contained"
        >
          Create Plan
        </ColorButton>
      </Stack>

      <Filter />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow hover>
              <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Title Plan
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Create date
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.length ? (
              plans
                .filter((plans) => plans.isActive)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>

                    <TableCell component="th" scope="row">
                      <Link to="/admin/task-list-before" state={row}>
                        <Button sx={{ color: "black" }} variant="text">
                          {row.planName}
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {moment(row.dateCreate).format("DD/MM/YYYY")}
                    </TableCell>

                    <TableCell align="left">
                      <Button
                        onClick={handleClickOpenMember}
                        color="error"
                        variant="contained"
                        size="small"
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
        count={plans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* deatil task */}

      <CreatePlan
        show={openCreate}
        close={() => setOpenCreate(false)}
        setShowAlert={setShowAlert}
        setShowAlertErr={setShowAlertErr}
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
    </>
  );
}

export default PlanList;
