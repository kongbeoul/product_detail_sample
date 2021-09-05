import { createStore } from "./core/store.js";
import reducers from "./reducers/index.js";

import App from "./App.js";

const store = createStore(reducers);

new App(document.getElementById("app"), store);
