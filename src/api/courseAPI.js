import axiosClient from './axiosClient';


const courseAPI = {
    getList() {
        const url = `course/getAllCourse`;
        return axiosClient.get0(url);
},

CreateCourse(data) {
    const url = `course/create`;
    return axiosClient.post(url, data);
  },
  getCourseWithID(id) {
    const url = `course/getDetail/${id}`;
    return axiosClient.getWithID(url);
  },
}

  
export default courseAPI;