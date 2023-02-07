// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const navConfig = [
    {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: icon("apps"),
    },
    {
        title: "Project",
        path: "/admin/project",
        icon: icon("clipboard-regular"),
    },
    {
        title: "News",
        path: "/admin/news",
        icon: icon("table-list-solid"),
    },
    {
        title: "Employee",
        path: "/admin/employee",
        icon: icon("circle-user-solid"),
    },
    {
        title: "Student",
        path: "/admin/student",
        icon: icon("user-group-solid"),
    },
    {
        title: "Task",
        path: "/admin/task",
        icon: icon("user-group-solid"),
    },
];

export default navConfig;
