"use strict";

/**
 * @file site/client-websocket.js
 * See this code {@link https://github.com/adam-coster/website/tree/5cb113ff1afc28523486f4930fa02be55ea2b1c6/site/client-websocket.js in its context}
 */
(function () {
  var socketUrl = "ws://localhost:5001";
  var socket = new WebSocket(socketUrl);
  socket.addEventListener("close", function () {
    var interAttemptTimeoutMilliseconds = 100;
    var maxDisconnectedTimeMilliseconds = 3000;
    var maxAttempts = Math.round(maxDisconnectedTimeMilliseconds / interAttemptTimeoutMilliseconds);
    var attempts = 0;

    var reloadIfCanConnect = function reloadIfCanConnect() {
      attempts++;

      if (attempts > maxAttempts) {
        console.error("Could not reconnect to dev server.");
        return;
      }

      socket = new WebSocket(socketUrl);
      socket.addEventListener("error", function () {
        setTimeout(reloadIfCanConnect, interAttemptTimeoutMilliseconds);
      });
      socket.addEventListener("open", function () {
        location.reload();
      });
    };

    reloadIfCanConnect();
  });
})();