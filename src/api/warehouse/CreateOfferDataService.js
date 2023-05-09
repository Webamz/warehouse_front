import axios from "../customAxiosConfig/CustomAxiosConfig";

const CreateOfferDataService = (info) => {
  try {
    return axios.post(`/theWarehouses`, info);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default CreateOfferDataService;
