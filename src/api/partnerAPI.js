import React from 'react';
import axiosClient from './axiosClient';


const partnerAPI = {
    getList() {
        const url = `partner/getAllPartner`;
        return axiosClient.get0(url);
},
getPartDetail(Id) {
    const url = `partner/getDetail/${Id}`;
    return axiosClient.getWithID(url);
  },

}

  
export default partnerAPI;