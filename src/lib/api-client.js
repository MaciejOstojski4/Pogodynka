
import axios from "axios";

const APPID ="057420ef754b30b2b45ecd0d40b6281d";

var apiClient = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5",
  params: { "APPID": APPID }
});

export default apiClient;
