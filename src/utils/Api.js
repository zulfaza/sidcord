import axios from "axios";

let API_URL;

if (window.location.hostname === "localhost") {
  API_URL = "http://localhost:5000";
} else {
  API_URL = "https://sidcord.herokuapp.com";
}
const Api = axios.create({
  baseURL: API_URL,
});

export default Api;
