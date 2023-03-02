import axiosClient from './axiosClient';

const taskAPI = {
    getList() {
        const url = `plan/getAllPlan`;
        return axiosClient.get0(url);
},
CreatePlan(data) {
    const url = `plan/create`;
    return axiosClient.post(url, data);
  },
}

export default taskAPI;