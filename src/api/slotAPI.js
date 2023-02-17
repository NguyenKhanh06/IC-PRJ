import axiosClient from './axiosClient';

const slotAPI = {
approveSlot(id){
    const url = `slot/updateStatus/${id}?Status=1`
    return axiosClient.putWithId(url)
}
}

export default slotAPI;