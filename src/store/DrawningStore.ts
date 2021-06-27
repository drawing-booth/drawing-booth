import { makeObservable, runInAction } from "mobx";
import { action, observable } from "mobx";

import enableLogging from "../utils/enableLogging";

const LOG_KEY = "BOOTH_DRAWNING";
const LOG_TOTAL = 50;

export class DrawningStore {
  constructor() {
    makeObservable(this, {
      auth: action.bound,
      dispose: action.bound,
      // sessionId: observable,
    });
    enableLogging(this, LOG_KEY, LOG_TOTAL);
  }

  async auth() {
  }

  dispose() {
  }
}

export default DrawningStore;
