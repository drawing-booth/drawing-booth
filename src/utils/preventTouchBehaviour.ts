
const eventMap: Record<string, string> = {
    "touchstart": "mousedown",
    "touchmove": "mousemove",
    "touchend": "mouseup",
};

export const preventTouchBehaviour = (el: HTMLElement) => {
    const touchHandler = (event: TouchEvent) => {
        const touches = event.changedTouches;
        const first = touches[0];
        const { type: touchType } = event;
        const type: string = eventMap[touchType];
        const simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(
            type, true, true, window, 1, 
            first.screenX, first.screenY, 
            first.clientX, first.clientY, false, 
            false, false, false, 0/*left*/, null
        );
        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    }
    el.addEventListener("touchstart", touchHandler, true);
    el.addEventListener("touchmove", touchHandler, true);
    el.addEventListener("touchend", touchHandler, true);
    el.addEventListener("touchcancel", touchHandler, true);
    return () => {
        el.removeEventListener("touchstart", touchHandler, true);
        el.removeEventListener("touchmove", touchHandler, true);
        el.removeEventListener("touchend", touchHandler, true);
        el.removeEventListener("touchcancel", touchHandler, true);
    };
};

export default preventTouchBehaviour;
