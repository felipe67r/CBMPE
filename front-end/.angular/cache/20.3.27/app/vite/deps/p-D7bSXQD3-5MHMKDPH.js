import {
  c,
  m
} from "./chunk-2Y2SJGYA.js";
import {
  e
} from "./chunk-6AQ3YPUD.js";
import {
  H,
  P
} from "./chunk-PWL36LIX.js";
import {
  __async
} from "./chunk-SCNEKAWF.js";

// ../node_modules/@ionic/core/components/p-D7bSXQD3.js
var i = () => {
  const i2 = window;
  i2.addEventListener("statusTap", (() => {
    H((() => {
      const o = document.elementFromPoint(i2.innerWidth / 2, i2.innerHeight / 2);
      if (!o) return;
      const n = m(o);
      n && new Promise(((o2) => e(n, o2))).then((() => {
        P((() => __async(null, null, function* () {
          n.style.setProperty("--overflow", "hidden"), yield c(n, 300), n.style.removeProperty("--overflow");
        })));
      }));
    }));
  }));
};
export {
  i as startStatusTap
};
//# sourceMappingURL=p-D7bSXQD3-5MHMKDPH.js.map
