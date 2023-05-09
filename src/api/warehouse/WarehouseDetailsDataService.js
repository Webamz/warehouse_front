import axios from "../customAxiosConfig/CustomAxiosConfig";

const WarehouseDetailsDataService = (id) => {
  try {
    return axios.get(`/theWarehouses/${id}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default WarehouseDetailsDataService;
