const generateDeviceInformation = () => {
  return {
    httpBrowserLanguage: navigator.language || navigator.language || "en-US",
    httpBrowserJavaEnabled: navigator.javaEnabled() || false,
    httpBrowserJavaScriptEnabled: true, // JavaScript is always enabled in modern browsers
    httpBrowserColorDepth:
      window.screen.colorDepth || window.screen.pixelDepth || 24,
    httpBrowserScreenHeight: window.screen.height || 0,
    httpBrowserScreenWidth: window.screen.width || 0,
    httpBrowserTimeDifference: new Date().getTimezoneOffset(),
    userAgentBrowserValue: navigator.userAgent,
    deviceChannel: "Browser",
  };
};
