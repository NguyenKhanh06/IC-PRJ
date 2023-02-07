import axiosClient from './axiosClient';

const staffAPI = {
    getList() {
        const url = `staff/getAll`;
        return axiosClient.get0(url);
},
UpToLead() {

}

}

export default staffAPI;