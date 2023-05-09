import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const SaveWarehouseService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  try {
    return axios.post(`/theWarehouses/save`, null, {
      params: {
        id,
        username,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default SaveWarehouseService;
