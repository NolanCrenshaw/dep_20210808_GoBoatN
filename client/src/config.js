// Dev BASE_URL must be set to non-static WSL2 IP.
// flask server runs on command ``` flask run -h {IP} -p 5000 ```
export const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  `http://${process.env.REACT_APP_DEV_URL}:5000`;

export const IMG_KEY = "https://goboatnbucky.s3.amazonaws.com/";
