import axios from "axios";

const SEJLBOD_API_BASE_URL = "http://localhost:8090/sejlbode";
const OPRET_API_BASE_URL = "http://localhost:8090/opretsejlbod";
const SLET_API_BASE_URL = "http://localhost:8090/deletebod";
const UPDATE_API_BASE_URL = "http://localhost:8090/update";
const ADDPOINTS_API_BASE_URL = "http://localhost:8090/addpoints"

class SejlbodsService {
  getSejlbode() {
    return axios.get(SEJLBOD_API_BASE_URL);
  }

  createSejlbod(sejlbod) {
    return axios.post(OPRET_API_BASE_URL, sejlbod);
  }

  deleteSejlbod(id) {
    return axios.delete(`${SLET_API_BASE_URL}/${id}`);
  }

  updateSejlbod(id, sejlbod) {
    return axios.put(`${UPDATE_API_BASE_URL}/${id}`, sejlbod);
  }

  addPointsToSejlbod(id, points) {
    return axios.put(`${ADDPOINTS_API_BASE_URL}/${id}?points=${points}`);
  }

  calculateTotalWinner() {
    return axios.get(`${UPDATE_API_BASE_URL}/totalwinner`);
  }
}

export default new SejlbodsService();


