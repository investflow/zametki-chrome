chrome.contextMenus.create({
    title: "-> Investflow",
    contexts: ["page", "selection", "link"],
    onclick: process
});

function openTab(title, text, url) {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.create({
            "index": tab.index + 1,
            "url": "http://localhost:8080/zametki/new?title=" + title + "&text=" + text + "&url=" + url,
            "selected": true
        });
    });
}
function process(info) {
    chrome.tabs.getSelected(null, function (tab) { //<-- "tab" has all the information
        var title = tab.title;
        var text = info.selectionText ? info.selectionText : "";
        var url = info.linkUrl ? info.linkUrl : info.srcUrl ? info.srcUrl : info.pageUrl ? info.pageUrl : info.frameUrl ? info.frameUrl : tab.url;
        openTab(title, text, url);
    });
}

