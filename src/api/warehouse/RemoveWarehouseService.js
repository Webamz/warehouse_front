import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const RemoveWarehouseService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  try {
    return axios.delete(`/theWarehouses/remove`, {
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

export default RemoveWarehouseService;
