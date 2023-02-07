import { useState } from "react";
import { auth } from "../../../config/firebase/firebase";
import { UserAuth } from "../../../context/AuthContext";
// @mui
import { alpha } from "@mui/material/styles";
import {
    Box,
    Divider,
    Typography,
    Stack,
    MenuItem,
    Avatar,
    IconButton,
    Popover,
} from "@mui/material";
// mocks_
import account from "../../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: "Home",
        icon: "eva:home-fill",
    },
    {
        label: "Profile",
        icon: "eva:person-fill",
    },
    {
        label: "Settings",
        icon: "eva:settings-2-fill",
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const { logOut } = UserAuth();
    const user = auth.currentUser;
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                
                    
                        "&:hover": {
                           backgroundColor: "rgba(0, 0 , 0, 0.2)",
                           borderRadius: " 15px"
                        },
                    
                }}
            >
                <Avatar src={user?.photoURL} alt="photoURL" />
                <span style={{fontSize: 20, marginLeft: 20}} class="">
                                        {user?.displayName}
                                    </span>
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        "& .MuiMenuItem-root": {
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user?.displayName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                    >
                        {user?.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed" }} />

                <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={handleClose}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem onClick={() => handleSignOut()} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
