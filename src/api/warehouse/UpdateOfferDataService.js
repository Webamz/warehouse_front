import axios from "../customAxiosConfig/CustomAxiosConfig";

const UpdateOfferDataService = async (warehouse) => {
  try {
    return await axios.put(`/theWarehouses`, warehouse);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default UpdateOfferDataService;
