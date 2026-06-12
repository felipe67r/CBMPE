import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-QNMSVXRX.js";
import {
  componentOnReady
} from "./chunk-DY2Q6NI4.js";
import {
  readTask,
  writeTask
} from "./chunk-WSHSILEQ.js";
import {
  __async
} from "./chunk-SCNEKAWF.js";

// ../node_modules/@ionic/core/dist/esm/status-tap-Kan2W7sh.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(() => __async(null, null, function* () {
            contentEl.style.setProperty("--overflow", "hidden");
            yield scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          }));
        });
      }
    });
  });
};
export {
  startStatusTap
};
//# sourceMappingURL=status-tap-Kan2W7sh-2MYWFB6Y.js.map
