import chokidar from "chokidar";

export function createWatcher(paths: string | string[]): chokidar.FSWatcher {
  const w = chokidar.watch(paths, {
    persistent: true,
  });
  return w;
}
