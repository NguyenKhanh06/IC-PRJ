import React from "react";
// import PropTypes from "prop-types";
import Header from "../../components/header/Header";
import Project from "./Project";
import News from "./News";
import About from "./About";
import Footer from "../../components/footer/Footer";

Home.propTypes = {};

function Home(props) {
    const test = sessionStorage.getItem("user")
    console.log(JSON.parse(test))
    return (
        <>
            <Header />
            <div className="home-container">
                <div id="slider">
                    <div className="text-content">
                        <h3 className="text-heading">
                            YOUR GLOBAL JOURNEY STARTS HERE
                        </h3>
                        <div className="text-description">
                            <button className="btn-app btn--primary_big">
                                Register program
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Project />
            <News />
            <About />
            <Footer />
        </>
    );
}

export default Home;
