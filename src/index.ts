import App from "./App";
import appConfig from "./config/app";

App.listen(appConfig.port, () => {
  console.log(
    `The serve ${appConfig.app_name} is running on ${appConfig.url}:${appConfig.port}`
  );
});
