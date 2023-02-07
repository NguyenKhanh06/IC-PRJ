import React from "react";
// import PropTypes from "prop-types";
import "../../styles/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/style.css";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase/firebase";
import { UserAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";
// import { Padding } from "@mui/icons-material";

Header.propTypes = {};
function Header(props) {
    const { logOut } = UserAuth();
    const user = auth.currentUser;
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-light header-app">
                    <img
                        src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/logo_1.png"
                        className="navbar-brand"
                    />

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    About us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    News
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Programs
                                </a>
                            </li>
                        </ul>
                        <li className="header__navbar-item header__navbar-user">
                            {user != null ? (
                                <>
                                    <img
                                        src={user?.photoURL}
                                        alt="avt user"
                                        className="header__navbar-user-img"
                                    />
                                    <span className="header__navbar-user-name">
                                        {user?.displayName}
                                    </span>

                                    <ul className="header__navbar-user-menu">
                                        <li className="header__navbar-user-item">
                                            <Link>My account</Link>
                                        </li>
                                        <li className="header__navbar-user-item"></li>
                                        <li className="header__navbar-user-item header__navbar-user-item--seprate">
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={() => handleSignOut()}
                                            >
                                                Log out
                                            </Button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <Link
                                    style={{ color: "white" }}
                                    className="nav-link"
                                    to="/signin"
                                >
                                    Sign in
                                </Link>
                            )}

                            {/* 
           <img
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/319636696_543414471136146_1672434171953617978_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-_EOYEzHAMoAX9WMd4w&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDSBvuB5hJDDmZIpn8C9mKN-4lIXso-SxpAu8NVfg5CUA&oe=63B7098C"
              alt=""
              className="header__navbar-user-img"
            />
            <span className="header__navbar-user-name"
              >Nguyen Cong Khanh (K13 HCM)</span
            >

            <ul className="header__navbar-user-menu">
              <li className="header__navbar-user-item">
                <a href="">My account</a>
              </li>
              <li
                className="header__navbar-user-item header__navbar-user-item--seprate"
              >
                <a className="log-out" href="">Log out</a>
              </li>
            </ul>  */}
                        </li>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
