const backendUrl = window.location.host.includes("localhost")
  ? "http://127.0.0.1:4000/"
  : "https://konjomeet.herokuapp.com/";

export default backendUrl;
