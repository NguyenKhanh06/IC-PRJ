import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import Filter from "../Filter";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ColorButton } from "../../../styles/button";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Stack } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CreateTask from "./CreateTask";
import DetailTask from "./DetailTask";

function createData(name, calories, fat, carbs, protein, chip) {
  return { name, calories, fat, carbs, protein, chip };
}

const rows = [
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "review"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "process"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "done"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "process"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "process"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "review"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "todo"
  ),
  createData(
    "Task 1",
    "Nguyen Cong Khanh",
    "20/12/2022",
    "20/12/2022",
    "Nguyen Cong Khanh",
    "review"
  ),
];
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];


TaskList.propTypes = {
    
};

function TaskList(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [value, setValue] = useState(null);
    const [age, setAge] = useState("");
    const [openAssign, setOpenAssign] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
  
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
              Project: Study overseas
            </Typography>
          </Stack>
          <ColorButton
            endIcon={<AddIcon />}
            onClick={handleClickOpenCreate}
            variant="contained"
          >
            Create task
          </ColorButton>
        </Stack>
  
        <Filter />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Created by
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Create date < ArrowUpwardIcon sx={{width: 20}}/>
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  End date < ArrowUpwardIcon sx={{width: 20}}/>
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  Assign
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
  
                    <TableCell component="th" scope="row">
                      <Button
                        onClick={handleClickOpenDetail}
                        sx={{ color: "black" }}
                        variant="text"
                      >
                        {row.name}
                      </Button>
                    </TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell align="left">{row.fat}</TableCell>
                    <TableCell align="left">{row.carbs}</TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" spacing={0.6}>
                        <Tooltip title={row.protein}>
                          <Avatar
                            sx={{ width: 24, height: 24 }}
                            src="/broken-image.jpg"
                          />
                        </Tooltip>
                        <IconButton onClick={handleClickOpenAssign} aria-label="delete">
                          <PersonAddAlt1Icon sx={{ color: "#22a19a" }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {row.chip === "todo" ? (
                        <Chip label="To do" color="warning" />
                      ) : row.chip === "process" ? (
                        <Chip label="Process" color="primary" />
                      ) : row.chip === "review" ? (
                        <Chip label="Review" color="secondary" />
                      ) : (
                        <Chip label="Done" color="success" />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {row.chip === "todo" ? (
                        <Button onClick={handleClickOpenMember} color="error" variant="contained" size="small">
                          Delete
                        </Button>
                      ) : (
                        <Button disabled size="small" variant="contained">
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <CreateTask show={openCreate} close={() => setOpenCreate(false)}/>
  
  {/* deatil task */}
        <DetailTask show={openDetail} close={() => setOpenDetail(false)}/>
  
    {/* deatil member task */}
    <Dialog
          maxWidth={false}
          open={openMember}
          onClose={handleCloseMember}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          <p>Task 1</p>
            <p
              style={{ padding: "6px 0px 0px 10px" }}
              className="title-section"
            ></p>
          </DialogTitle>
          <DialogContent>
            <ul style={{ lineHeight: 3.5, listStyle: "none" }}>
              <li>
                Project: <b>Study overseas</b>
              </li>
              <li>
                Assign:{" "}
                  <Chip  style={{ marginRight: "20px" }} label="Nguyen Cong Khanh" />

                  <Chip  style={{ marginRight: "20px" }} label="Nguyen Cong Khanh" />
              </li>
              <li style={{ marginTop: 2 }}>
                Dealine:{" "}
                <b>20/12/2023</b>
              </li>
              <li style={{ marginTop: 2 }}>
                Status:{" "}
                <FormControl sx={{ width: 240 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value={10}>To do</MenuItem>
                    <MenuItem value={20}>Process</MenuItem>
                    <MenuItem value={23}>Review</MenuItem>
                    <MenuItem value={30}>Done</MenuItem>
                  </Select>
                </FormControl>
              </li>
            </ul>
            <p className="title-section">Description</p>
            <textarea placeholder="Click to add Description" style={{ width: 766, height: 250 }}></textarea>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              onClick={handleCloseMember}
              variant="text"
              sx={{ color: "#22a19a" }}
            >
              Cancel
            </Button>
  
            <ColorButton size="small" onClick={handleCloseMember} variant="contained">
              Save & close
            </ColorButton>
          </DialogActions>
        </Dialog>
  
        {/* create task */}
       
  
        {/* assign */}
        <Dialog
          open={openAssign}
          onClose={handleCloseAssign}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {  <Typography variant="h5" component="h2" gutterBottom>
              Assign task
            </Typography>}
          </DialogTitle>
          <DialogContent>
          <Autocomplete
          style={{width: "500px"}}
          multiple
          id="tags-outlined"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Assign member"
            />
          )}
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssign}>Cancel</Button>
            <Button onClick={handleCloseAssign} autoFocus>
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}

export default TaskList;