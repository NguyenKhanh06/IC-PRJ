import axiosClient from './axiosClient';

const slotAPI = {
approveSlot(id){
    const url = `slot/updateStatus/${id}?Status=1`
    return axiosClient.putWithId(url)
},
rejectSlot(data){
    const url = `reason/create`;
    return axiosClient.post(url, data);
}
}

export default slotAPI;