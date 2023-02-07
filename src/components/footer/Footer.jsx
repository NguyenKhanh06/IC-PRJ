import React from "react";
import "../../styles/footer.css";
import "../../styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationPin,
    faPhone,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
// import { IconButton } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";

function Footer(props) {
    return (
        <footer className="footer-app">
            <h3 style={{ color: "white" }}>YOUR GLOBAL JOURNEY STARTS HERE</h3>
            <div className="contain-footer">
                <img
                    className="img-footer"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/logo_1.png"
                    alt=""
                />
                <ul style={{ textAlign: "left" }}>
                    <li>
                        <FontAwesomeIcon
                            icon={faLocationPin}
                            style={{ fontSize: 20, marginRight: 10 }}
                        />
                        Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
                        Đức, Thành phố Hồ Chí Minh
                    </li>
                    <li style={{ textDecoration: "underline" }}>
                        <FontAwesomeIcon
                            icon={faPhone}
                            style={{ fontSize: 20, marginRight: 10 }}
                        />
                        +84 24 6291 5066
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ fontSize: 20, marginRight: 10 }}
                        />
                        fpt@gmail.com
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
