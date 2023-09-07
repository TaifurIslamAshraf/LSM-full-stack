import { app } from "./app";
import config from "./src/config/config";

app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
