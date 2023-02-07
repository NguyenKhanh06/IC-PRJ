import React from "react";
import "../../styles/home.css";
import "../../styles/style.css";

function About(props) {
    return (
        <div>
            <p className="title-section">About us</p>
            <div className="about-img">
                <div className="about-content">
                    <p className="about-heading">
                        FPT Education not only impresses students with the
                        unique architecture of buildings across 3 regions of the
                        country but also the green and comfortable campuses.
                        This has brought a dynamic learning space for students
                        from North to South. From the beginning days, starting
                        with FPT Aptech's simple className at Yet Kieu in Hanoi
                        and Nam Quoc Cang City in HCM City, FPT Edu people
                        dreamed of a strong educational institution which owns
                        multi-level and multi-location schools with large and
                        modern campuses, meeting the learning and living needs
                        of students.
                    </p>
                    <div className="about-description">
                        <a
                            href="https://www.facebook.com/FPTU.HCM/?ref=page_internal"
                            className="btn-app btn--primary"
                        >
                            See more on facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
