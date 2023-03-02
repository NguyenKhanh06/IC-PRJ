import React from "react";
import axiosClient from "./axiosClient";

const partnerAPI = {
  getList() {
    const url = `partner/getAllPartner`;
    return axiosClient.get0(url);
  },
  getPartDetail(Id) {
    const url = `partner/getDetail/${Id}`;
    return axiosClient.getWithID(url);
  },
  getListAvt() {
    const url = `avatar/getAll`;
    return axiosClient.get0(url);
  },
  getAvtDetail(Id) {
    const url = `avatar/getDetail/${Id}`;
    return axiosClient.getWithID(url);
  },
  getListCampus() {
    const url = `campus/getAll`;
    return axiosClient.get0(url);
  },
  getCampusDetail(Id) {
    const url = `campus/getDetail/${Id}`;
    return axiosClient.getWithID(url);
  },
};

export default partnerAPI;
