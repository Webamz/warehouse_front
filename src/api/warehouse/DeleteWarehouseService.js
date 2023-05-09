import axios from "../customAxiosConfig/CustomAxiosConfig";

const DeleteWarehouseService = (id) => {
  try {
    return axios.delete(`/theWarehouses/${id}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default DeleteWarehouseService;
