import axiosClient from './axiosClient';


const courseAPI = {
    getList() {
        const url = `course/getAllCourse`;
        return axiosClient.get0(url);
},

CreateCourse(activity, content, skill) {
    const url = `https://localhost:7115/api/v1/course/create?Activity=${activity}&Content=${content}&SkillName=${skill}`;
    return axiosClient.post(url, activity, content, skill);
  },
  getCourseWithID(id) {
    const url = `course/getDetail/${id}`;
    return axiosClient.getWithID(url);
  },
}

  
export default courseAPI;