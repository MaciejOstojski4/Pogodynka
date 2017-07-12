import axios from "axios";

const APIKEY ="057420ef754b30b2b45ecd0d40b6281d"
var apiClient = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}"
});







export default apiClient;
