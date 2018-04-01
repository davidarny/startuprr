// Application entry point

import "styles/index.scss";

// Hot module replacement
if (module && module.hot) {
    module.hot.accept("./index.js");
}
