import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Alert, Dialog, DialogContent, Snackbar, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { StyledTextField } from '../../../styles/textfield';
import { ColorButton } from '../../../styles/button';

CreatePartner.propTypes = {
    
};

function CreatePartner(props) {

  
    const [open, setOpen] = useState(true)
    const handleClose = () => {
      setOpen(props.close);
    };
      const [inputValue, setInputValue] = useState({
        name: "",
        local: "",
        note: "",
      });
      const handleOnChangeInputPartner = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        const input = {
          ...inputValue,
          [name]: value,
        };
    
        setInputValue(input);
      };
    
      
      const handleSubmit = async (e) => {
        await axios.post(`https://localhost:7115/api/v1/partner/create?Name=${inputValue.name}&Local=${inputValue.local}&Note=${inputValue.note}&IsActive=true`).then((response) => {
            window.location.reload(false)
            {response.isSuccess ? props.setShowAlert(true) : props.setShowAlertErr(true)}

        })

      };
    return (
        <Dialog
        fullWidth
        maxWidth="md"
         open={props.show}
         onClose={props.close}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
    
         <DialogContent>
         <Box>
         <Stack>
           <p
             style={{ padding: " 0px 0px 10px", marginTop: 20 }}
             className="title-section"
           >
             Create Partner
           </p>
           <Box
             sx={{
               display: "flex",
               flexDirection: "column",
               backgroundColor: "#F8F8F8",
               width: "100%",
               padding: "10px 20px 20px 40px",
               borderRadius: "20px",
             }}
           >
             <Box
               sx={{
                 borderBottom: "1px solid black",
                 borderBottomWidth: "100%",
               }}
             >
               <Typography
                 sx={{
                   paddingBottom: 2,
                   float: "left",
                   fontWeight: "bold",
                   marginBottom: 2,
                 }}
               >
                 Create new partner
               </Typography>
             </Box>
             <Box
               sx={{
                 marginTop: 3,
               }}
             >
               <Typography
                 sx={{
                   float: "left",
                   fontWeight: "bold",
                   marginBottom: 2,
                 }}
               >
                 Full Name *
               </Typography>
               <StyledTextField
               required
                 label="Full Name"
                 autoComplete="off"
                 fullWidth
                 size="small"
                 name="name"
                 value={inputValue.name}
                 onChange={handleOnChangeInputPartner}
               />
             </Box>
             <Box
               sx={{
                 marginTop: 3,
               }}
             >
               <Typography
                 sx={{
                   float: "left",
                   fontWeight: "bold",
                   marginBottom: 2,
                 }}
               >
                 Location *
               </Typography>
               <StyledTextField
               required
                 label="Location"
                 autoComplete="off"
                 fullWidth
                 size="small"
                 name="local"
                 value={inputValue.local}
                 onChange={handleOnChangeInputPartner}
                 multiline={true}
               />
             </Box>
             <Box
               sx={{
                 marginTop: 3,
               }}
             >
               <Typography
                 sx={{
                   float: "left",
                   fontWeight: "bold",
                   marginBottom: 2,
                 }}
               >
                 Note
               </Typography>
               <StyledTextField
                 label="Content"
                 autoComplete="off"
                 fullWidth
                 size="small"
                 name="note"
                 value={inputValue.note}
                 rows={4}
                 onChange={handleOnChangeInputPartner}
                 multiline={true}
               />
             </Box>
             <Box sx={{ marginTop: 6, marginLeft: "80%" }}>
               <ColorButton
                 onClick={() => {
                   handleSubmit();
                   handleClose()
                 }}
                 variant="contained"
               >
                 Create Course
               </ColorButton>
             </Box>
           </Box>
         </Stack>
       </Box>
         </DialogContent>
  
       </Dialog>
 
    );
}

export default CreatePartner;