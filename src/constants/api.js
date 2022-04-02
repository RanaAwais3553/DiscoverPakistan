// // General api to access data
// import axios from "axios";
// import { decode as atob, encode as btoa } from "base-64";
// import { KEYS, CONSTANTS } from ".";
// import { simplify, isObjEmpty } from "../helpers/general";

// axios.defaults.baseURL = "https://discoverpakistan.tv/dp-admin/Legacy_api/";
// //axios.defaults.baseURL = CONSTANTS?.BASE_URL;
// axios.defaults.headers = {
//   Authorization:
//     "Basic " +
//     btoa(
//       "WEJnTnFPNE96Zm0yOUZWT29OSWxRMzNsbHQ5c0V1ZTI0bDZha2E4clE0NlRndW9JSnN1ZFRGS0dJYjlCM3Y5VjE1ODAzMDI2NzM" +
//         ":" +
//         "NVRscEJJMUZhWXNiNW9RZ0p2RGhaeTBmOE1lZlAzSlcxNTgwMzAyNjcz"
//     ),
//   //  Authorization: "Basic " + btoa(KEYS?.BA_UNAME + ":" + KEYS?.BA_PWD),
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

// export default async function Api(data) {
//   let uri = data.uri ? data.uri : "";
//   let method = data.method === undefined ? "POST" : data.method;
//   let headers = data.headers === undefined ? data.headers : {};

//   let formData = new FormData();
//   if (!isObjEmpty(data.data)) {
//     for (let key in data.data) {
//       formData.append(key, data.data[key]);
//       // if(data.data[key] === '' || data.data[key] === undefined){
//       // return;
//       // }
//     }
//   }

//   if (simplify(method) === "post") {
//     return axios.post(uri, formData, headers);
//   }
//   if (simplify(method) === "get") {
//     return axios.get(uri);
//   }
// }
