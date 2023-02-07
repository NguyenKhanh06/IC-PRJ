import React from 'react';
import axiosClient from './axiosClient';


const partnerAPI = {
    getList() {
        const url = `partner/getAllPartner`;
        return axiosClient.get0(url);
},


}

  
export default partnerAPI;