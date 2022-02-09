const createTab = () => {
  chrome.tabs.get(chrome.devtools.inspectedWindow.tabId, (tab) => {
    if (tab.url.indexOf("https://open.spotify.com") !== -1) {
      chrome.devtools.panels.create(
        "LyricExtractor",
        "", // icon
        "./panel.html",
        (panel) => {} // callback
      );
    }
  });
};

createTab();
chrome.devtools.network.onNavigated.addListener(() => {
  createTab();
});
