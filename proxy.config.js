export const proxy = {
  "/api/*": {
    "target": "http://steamlease.dev/api/",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug"
  }
};