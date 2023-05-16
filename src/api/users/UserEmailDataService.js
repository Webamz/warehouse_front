import axios from "axios";

const UserEmailDataService = async (email) => {
  try {
    return axios.post(`https://warehousebackend-production.up.railway.app/notification`, null, {
      params: {
        email,
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

export default UserEmailDataService;
