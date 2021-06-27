export const runOnKeys = (callback: () => void, ...codes: string[]) => {
  const pressed = new Set();
  let skip = false;
  const check = (code: string) => {
    if (skip) {
      return;
    }
    pressed.add(code);
    for (const code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    skip = true;
    setTimeout(() => (skip = false), 900);
    pressed.clear();
    callback();
  };
  const handleDown = ({ code }: KeyboardEvent) => check(code);
  const handleUp = ({ code }: KeyboardEvent) => pressed.delete(code);
  document.addEventListener("keydown", handleDown);
  document.addEventListener("keyup", handleUp);
  return () => {
    document.removeEventListener("keydown", handleDown);
    document.removeEventListener("keyup", handleUp);
  };
};

export default runOnKeys;
