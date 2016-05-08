var xhr = function(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        var response = this.responseText;
        callback(response);
    };
    req.open("get", url, true);
    req.send();
};

var html;
xhr(chrome.extension.getURL("html/webtionary.html"), function(res) {
    html = res;
});

$(document.body).append(html);

// make jQuery object of card prototype

chrome.runtime.onMessage.addListener(function(data) {
    var eventType = data._event;

    console.log(eventType, data);

    if (eventType === "definitions-get") {
        console.log(data.definitions);

        $(document.body).addClass("webtionary-opened");
    }
});

console.log("Webtionary running");
