import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "#22a19a"
      },
    
    
      [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
        color: "#22a19a"
      },
      backgroundColor: "white"
      
  });