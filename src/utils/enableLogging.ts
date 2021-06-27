/* eslint-disable no-empty-pattern */
import { spy, toJS } from "mobx";

// eslint:disable-next-line: new-parens
const createLogger = (LOG_KEY: string, LOG_TOTAL: number) =>
  new (class {
    private get mutations() {
      return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    }
    private set mutations(v) {
      localStorage.setItem(LOG_KEY, JSON.stringify(v));
    }
    stringify(mutation: any) {
      try {
        return JSON.stringify(mutation);
      } catch (e) {
        console.warn(e);
        return "";
      }
    }
    log(mutation: any) {
      this.mutations = [
        this.stringify(mutation),
        ...this.mutations.slice(0, LOG_TOTAL - 1),
      ];
    }
  })();

const isCyclic = (obj: any) => {
  const seenObjects: any[] = [];
  const detect = (obj: any) => {
    if (obj && typeof obj === "object") {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  };
  return detect(obj);
};

const createSnapshot = (ref: any) =>
  Object.entries(toJS(ref))
    .filter(([{}, v]) => typeof v !== "function")
    .reduce((acm, [k, v]) => ({ ...acm, [k]: v }), {});

const filterCyclic = (arr: any[]) => arr.filter((v) => !isCyclic(v));

export const enableLogging = (self: any, key = "unset-log-key", total = 25) => {
  const logger = createLogger(key, total);
  spy((ev: any) => {
    if (ev.type === "action") {
      logger.log({
        snapshot: createSnapshot(self),
        args: filterCyclic(ev.arguments),
        name: ev.name,
      });
    }
  });
};

export default enableLogging;
