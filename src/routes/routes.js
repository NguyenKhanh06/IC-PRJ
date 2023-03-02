import { Navigate, useRoutes } from "react-router-dom";
//
import AdminLayout from "../layouts/dashboard";
import Signin from "../pages/Signin";
// Client
import Home from "../pages/students/Home.jsx";
// Admin
import Dashboard from "../pages/admins/Dashboard";


import Student from "../pages/admins/Student";
import ProjectList from "../pages/admins/project/ProjectList";
import ProjectListDeal from "../pages/admins/dealing/ProjectListDeal";
import CreateProject from "../pages/admins/project/CreateProject";
import DetailProject from "../pages/admins/project/DetailProject";
import Manager from "../pages/admins/project/Manager";
import CreateCourse from "../pages/admins/course/CreateCourse";
import CreateSyllabus from "../pages/admins/syllabus/CreateSyllabus";
import DetailCourse from "../pages/admins/course/DetailCourse";
import DetailSyllabus from "../pages/admins/syllabus/DetailSyllabus";
import CreateSlot from "../pages/admins/syllabus/CreateSlot";
import DetailSlot from "../pages/admins/syllabus/DetailSlot";
import CourseList from "../pages/admins/course/CourseList";
import DetailCourseDeal from "../pages/admins/dealing/DetailCourseDeal";
import PartnerLayout from "../layouts/dashboard/PartnerLayout";
import PartnerDashboard from "../pages/partner/PartnerDashboard";
import PartnerDeal from "../pages/partner/PartnerDeal";
import PartnerDetailProjectDeal from "../pages/partner/PartnerDetailProjectDeal";
import TaskListAfter from "../pages/admins/task/TaskListAfter";
import PartnerList from "../pages/admins/partner/PartnerList";
import DetailPartner from "../pages/admins/partner/DetailPartner";
import TaskList from "../pages/admins/task/TaskList";
import ManageAvt from "../pages/partner/avatar/ManageAvt";
import ManageCampus from "../pages/partner/campus/ManageCampus";

export default function Router() {
    const routes = useRoutes([
        {
            path: "signin",
            element: <Signin />,
        },
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                { element: <Navigate to="/admin/dashboard" /> },
                { path: "dashboard", element: <Dashboard /> },
                { path: "project", element: <ProjectList/> },
               
    
                { path: "student", element: <Student /> },
                { path: "task", element: <Manager/> },
                { path: "task-list-after", element: <TaskListAfter/> },
                { path: "task-list-before", element: <TaskList/> },
                { path: "create-project", element: <CreateProject /> },
                { path: "create-course", element: <CreateCourse /> },
                { path: "create-syllabus", element: <CreateSyllabus /> },
                { path: "detail-project", element: <DetailProject /> },
                { path: "detail-course", element: <DetailCourse /> },
                { path: "detail-syllabus/:id", element: <DetailSyllabus /> },
                { path: "detail-slot/:id", element: <DetailSlot /> },
                { path: "create-slot", element: <CreateSlot /> },
                { path: "course", element: <CourseList /> },
                { path: "dealing", element: <ProjectListDeal /> },
                { path: "partner", element: <PartnerList /> },
                { path: "detail-partner", element: <DetailPartner/> },
                { path: "detail-project-deal/:id", element: <DetailCourseDeal /> },
                
            ],
        },
        {
            path: "/partner",
            element: <PartnerLayout />,
            children: [
                { element: <Navigate to="/partner/dashboard" /> },
                { path: "dashboard", element: <PartnerDashboard /> },
                { path: "deal", element: <PartnerDeal /> },
                { path: "avatar", element: <ManageAvt /> },
                { path: "campus", element: <ManageCampus /> },
                { path: "detail-project-deal/:id", element: <PartnerDetailProjectDeal/> },
                
                
            ],
        },
    ]);
    return routes;
}
