import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import NavPartner from "./nav/indexPartner";
import HeaderPartner from "./header/indexPartner";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------

export default function PartnerLayout() {
    const [open, setOpen] = useState(false);

    return (
        <StyledRoot>
            <HeaderPartner onOpenNav={() => setOpen(true)} />

            <NavPartner openNav={open} onCloseNav={() => setOpen(false)} />

            <Main>
                <Outlet />
            </Main>
        </StyledRoot>
    );
}
