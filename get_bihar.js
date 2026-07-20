const axios = require('axios');
async function run() {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/Hassan-M-Mughal/Indian-States-Districts-and-Cities-JSON/master/states/Bihar.json");
    console.log(res.data.slice(0, 100));
  } catch(e) {
    console.log("Failed");
  }
}
run();
