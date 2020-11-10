/**
 * @file site/client-websocket.js
 * See this code {@link https://github.com/adam-coster/website/tree/5cb113ff1afc28523486f4930fa02be55ea2b1c6/site/client-websocket.js in its context}
 */
(() => {
  const socketUrl = "ws://localhost:5001";
  let socket = new WebSocket(socketUrl);
  socket.addEventListener("close", () => {
    const interAttemptTimeoutMilliseconds = 100;
    const maxDisconnectedTimeMilliseconds = 3000;
    const maxAttempts = Math.round(
      maxDisconnectedTimeMilliseconds / interAttemptTimeoutMilliseconds
    );
    let attempts = 0;
    const reloadIfCanConnect = () => {
      attempts++;
      if (attempts > maxAttempts) {
        console.error("Could not reconnect to dev server.");
        return;
      }
      socket = new WebSocket(socketUrl);
      socket.addEventListener("error", () => {
        setTimeout(reloadIfCanConnect, interAttemptTimeoutMilliseconds);
      });
      socket.addEventListener("open", () => {
        location.reload();
      });
    };
    reloadIfCanConnect();
  });
})();
