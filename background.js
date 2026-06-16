let startTime = Date.now();
let activeUrl = null;

// Check active tab every second
setInterval(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length === 0) return;
        const tab = tabs[0];
        const now = Date.now();

        if (activeUrl !== null && startTime !== null) {
            let timeSpent = now - startTime;

            chrome.storage.local.get(["timeData"], (result) => {
                let data = result.timeData || {};
                const url = tab.url || "unknown";
                data[url] = (data[url] || 0) + timeSpent;
                chrome.storage.local.set({timeData: data});
            });
        }

        // Update for next tick
        activeUrl = tab.url;
        startTime = now;
    });
}, 1000);

// Reset startTime when window focus changes
chrome.windows.onFocusChanged.addListener(() => {
    startTime = Date.now();
});