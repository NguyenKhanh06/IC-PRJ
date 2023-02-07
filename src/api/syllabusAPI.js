import axiosClient from './axiosClient';

const syllabusAPI = {
    getList() {
        const url = `syllabus/getAllSyllabus`;
        return axiosClient.get0(url);
},
CreateSyllabus(data) {
    const url = `syllabus/create?${data}`;
    return axiosClient.post(url, data);
  },
  getSyllabusWithID(id) {
    const url = `syllabus/getDetail/${id}`;
    return axiosClient.getWithID(url);
  },
  getListSlot() {
    const url = `slot/getAllSlot`;
    return axiosClient.get0(url);
},
getSlotWithID(id) {
  const url = `slot/getDetail/${id}`;
  return axiosClient.getWithID(url);
},
}

export default syllabusAPI;