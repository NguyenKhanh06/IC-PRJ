import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { StyledTextField } from '../styles/textfield';
import axios from 'axios';
import { ColorButton } from '../styles/button';
import { useNavigate } from 'react-router-dom';
import partnerAPI from '../api/partnerAPI';

SiginPartner.propTypes = {
    
};

function SiginPartner(props) {
    const navigate = useNavigate();
    const [partner, setPartner] = useState([])
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
      });
    const handleOnChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        const input = {
          ...inputValue,
          [name]: value,
        };
    
        setInputValue(input);
      };
      const data = {
        userName: inputValue.username,
        password: inputValue.password,
      }
      const fetchdataPartner = (id) => {
        partnerAPI.getPartDetail(id).then((response) => {
          setPartner(response.responseSuccess[0])
          localStorage.setItem('items', JSON.stringify( response.responseSuccess[0]));
          sessionStorage.setItem("partner", JSON.stringify( response.responseSuccess[0]));
          navigate("/partner", {state:{partner:partner}})
          console.log(response);
        })
      }
      const handleSignin = () => {
        axios.post(`https://localhost:7115/api/v1/login/login`, data).then((response) => {
          sessionStorage.setItem("avatar", JSON.stringify(response.responseSuccess.user));

            {response.isSuccess ?  fetchdataPartner(response.responseSuccess?.user?.partnerId): alert("sai")}
        })
      }
    return (
       <Box>
<StyledTextField
              label="Project's name"
              autoComplete="off"
              fullWidth
              size="small"
              name="username"
              value={inputValue.username}
              onChange={handleOnChangeInput}
            />
            <StyledTextField
              label="Project's name"
              autoComplete="off"
              fullWidth
              size="small"
              name="password"
              value={inputValue.password}
              onChange={handleOnChangeInput}
            />
            <ColorButton onClick={() => handleSignin()}>Sign In</ColorButton>
       </Box>
    );
}

export default SiginPartner;