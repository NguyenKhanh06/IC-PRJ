// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const navConfigPartner = [
    {
        title: "Dashboard",
        path: "/partner/dashboard",
        icon: icon("apps"),
    },
    {
        title: "Dealing",
        path: "/partner/deal",
        icon: icon("apps"),
    },
    {
        title: "Avatar",
        path: "/partner/avatar",
        icon: icon("apps"),
    },
    {
        title: "Campus",
        path: "/partner/campus",
        icon: icon("apps"),
    },
   
];

export default navConfigPartner;
