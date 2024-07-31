import { registerApplication, start, LifeCycles } from "single-spa";
import { bootstrap, mount, unmount } from "./root-component";

registerApplication(
  "root-app",
  () => import("./root-component"),
  () => true,
  { bootstrap, mount, unmount }
);

registerApplication({
  name: "@nutrien/mfe-1",
  app: () => System.import<LifeCycles>("@nutrien/mfe-1"),
  activeWhen: ["/mfe-1"],
});

registerApplication({
  name: "@nutrien/react-vite-app",
  app: () => System.import<LifeCycles>("@nutrien/react-vite-app"),
  activeWhen: ["/react-vite-app"],
});

setTimeout(() => {
  start({
    urlRerouteOnly: true,
  });
}, 1000);
