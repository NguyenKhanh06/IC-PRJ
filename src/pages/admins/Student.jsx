import { Container, Typography, Button, Stack } from "@mui/material";
import Iconify from "../../components/iconify";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import ScrollableTab from "./Tabs";

// const theme = createTheme({
//     palette: {
//         primary: orange,
//     },
// });

export default function Student() {
    const [item, setItem] = useState([]);

    const importExcel = (fileEx) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(fileEx);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const workbook = XLSX.read(bufferArray, { type: "buffer" });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((r) => {
            // Test show result when imported file xlsx to console log
            console.log(fileEx);

            setItem(r);
        });
    };

    return (
        <div>
            <ScrollableTab/>
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        List Student
                    </Typography>
                    <Stack
                        direction="row"
                        // alignItems=""
                        // justifyContent="space-between"
                    >
                        {/* <Button variant="outlined">Choose File</Button> */}

                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Upload File
                            <input
                                hidden
                                multiple
                                type="file"
                                onChange={(e) => {
                                    const fileEx = e.target.files[0];
                                    importExcel(fileEx);
                                }}
                            />
                        </Button>
                        {/* <Button
                            // color="primary"
                            variant="contained"
                            startIcon={
                                <Iconify icon="material-symbols:folder" />
                            }
                        >
                            Export File
                        </Button> */}
                    </Stack>
                </Stack>

                {/* <div style={{ height: 500, width: "100%" }}> */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Full name</th>
                            <th scope="col">Roll number</th>
                            <th scope="col">Phone</th>
                            <th scope="col">School Year</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((r) => (
                            <tr key={r.No}>
                                <th>{r.No}</th>
                                <td>{r.Fullname}</td>
                                <td>{r.Rollnumber}</td>
                                <td>{r.Phone}</td>
                                <td>{r.SchoolYear}</td>
                                <td>{r.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* </div> */}
            </Container>
        </div>
    );
}
