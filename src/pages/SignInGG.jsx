import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Typography, Button, TextField, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import "../styles/signin.css";
import jwtDecode from "jwt-decode";
function SignInGG(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    function handleSignOut(event) {
      setUser({});
      sessionStorage.removeItem("user")
    }
    let regex = new RegExp("[a-z0-9]+@fpt.edu.vn");
    function handleCallbackResponse(response) {
      console.log(response);
      var userObj = jwtDecode(response.credential);
      console.log("decode",userObj);
      if (
        !regex.test(userObj.email) &&
        userObj.email !== "congkhanhnguyen1999@gmail.com"
      ) {
        alert("sai emal")
        sessionStorage.removeItem("user")
      }else if(userObj.email === "congkhanhnguyen1999@gmail.com") {
        sessionStorage.setItem("user", JSON.stringify(userObj));
        navigate("/admin");
        // axios
        //   .post("https://localhost:7115/api/v1/staff/create", staff)
        //   .then((response) => {
        //     console.log("response", response);
        //   });
      } else if (regex.test(userObj.email)) {
        navigate("/");
      }
    }
  
    useEffect(() => {
      // google global

// eslint-disable-next-line no-undef
google.accounts.id.initialize({
        client_id:
          "207253804256-1jtkh1mk3t9kunvd1obnt8l5pbsps0a1.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
  

// eslint-disable-next-line no-undef
google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
            theme: 'outline',
            size: 'large',
          type: "standardButton",
        }
      );
  
    }, []);
    return (
        <div>
            <div id="signInDiv"></div>
        </div>
    );
}

export default SignInGG;