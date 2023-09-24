import { v2 as cloudinary } from "cloudinary";

import { app } from "./app";
import config from "./src/config/config";

//setup cloudinary config
cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
});

app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
