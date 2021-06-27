import { makeObservable } from "mobx";
import { action, observable } from "mobx";

import enableLogging from "../utils/enableLogging";

const STORAGE_KEY = "BOOTH_LAST_STATE";

const STORAGE_FIELDS: string[] = [
    "fadeWidth",
    "isReverse",
];

const LOG_KEY = "BOOTH_DRAWNING";
const LOG_TOTAL = 50;

const stateManager = new (class {
    getData() {
        try {
            const json = localStorage.getItem(STORAGE_KEY) || "{}";
            const data = JSON.parse(json);
            const entries = Object.entries(data).filter(([key]) => STORAGE_FIELDS.includes(key));
            const object = entries.reduce((acm, [k, v]) => ({ ...acm, [k]: v }), {});
            return object;
        } catch {
            console.log('stateManager broken data');
            return {};
        }
    }
    setData(data: Record<string, any>) {
        const entries = Object.entries(data).filter(([key]) => STORAGE_FIELDS.includes(key));
        const object = entries.reduce((acm, [k, v]) => ({ ...acm, [k]: v }), {});
        const json = JSON.stringify(object, null, 2);
        localStorage.setItem(STORAGE_KEY, json);
    }
})();

class StateManagerWrapper {
    protected restoreChanges() {
        Object.entries(stateManager.getData())
            .forEach(([k, v]) => (this as any)[k] = v);
    }
    protected flushChanges() {
        stateManager.setData(this);
    }
}

export class DrawningStore extends StateManagerWrapper {

    /** 
     * Настройки. Сохраняются в localStorage
     * и не сбрасываются при переключении между
     * страницами
     */
    public fadeWidth = '300';
    public isReverse = false;

    /**
     * Параметры. Динамично меняются при переходе
     * между страницами и сбрасываются в dispose
     */
    public isHeaderCollapsed = false;
    public isDrawningBlocked = false;
    public isForceClear = false;

    constructor() {
        super();
        makeObservable(this, {
            setFadeWidth: action.bound,
            setIsDrawningBlocked: action.bound,
            setIsHeaderCollapsed: action.bound,
            setIsForceClear: action.bound,
            setIsReverse: action.bound,
            dispose: action.bound,
            isHeaderCollapsed: observable,
            isDrawningBlocked: observable,
            isReverse: observable,
            isForceClear: observable,
            fadeWidth: observable,
        });
        enableLogging(this, LOG_KEY, LOG_TOTAL);
        this.restoreChanges();
        window.addEventListener("beforeunload", () => {
            this.flushChanges();
        }, false);
    }

    setIsHeaderCollapsed(isHeaderCollapsed: boolean) {
        this.isHeaderCollapsed = isHeaderCollapsed;
    }

    setIsDrawningBlocked(isDrawningBlocked: boolean) {
        this.isDrawningBlocked = isDrawningBlocked;
    }

    setIsReverse(isReverse: boolean) {
        this.isReverse = isReverse;
    }

    setIsForceClear(isForceClear: boolean) {
        this.isForceClear = isForceClear;
    }

    setFadeWidth(fadeWidth: string) {
        this.fadeWidth = fadeWidth;
    }

    dispose() {
        this.isHeaderCollapsed = false;
        this.isDrawningBlocked = false;
        this.flushChanges();
    }
}

export default DrawningStore;
