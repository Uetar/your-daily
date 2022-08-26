import axios from "axios";

export default axios.create({
  baseURL: "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/",
});
