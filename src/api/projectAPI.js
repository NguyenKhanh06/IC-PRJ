import React from 'react';
import axiosClient from './axiosClient';


const projectAPI = {
    getList() {
        const url = `project/getAllProject`;
        return axiosClient.get0(url);
},

getProjectDetail(Id) {
    const url = `project/getDetail/${Id}`;
    return axiosClient.getWithID(url);
  },
  CreateProject(data) {
    const url = `project/getDetail`;
    return axiosClient.post(url, data);
  },
}

  
export default projectAPI;