import React from "react";
import axios from "axios";

const HomeService = () => {
  try {
    return axios.get("https://warehousebackend-production.up.railway.app");
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default HomeService;
