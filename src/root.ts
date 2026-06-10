import Game from "./game";

const _getContext = HTMLCanvasElement.prototype.getContext;
// @ts-ignore
HTMLCanvasElement.prototype.getContext = function (type: string, options?: CanvasRenderingContext2DSettings) {
  if (type === '2d') {
    return _getContext.call(this, type, { willReadFrequently: true, ...options });
  }
  return _getContext.call(this, type, options as any);
};
console.log("game start")
new Game()