var xhr = function(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        var response = this.responseText;
        callback(response);
    };
    req.open("get", url, true);
    req.send();
};

var API_URLS = {
    "urbandictionary": "http://api.urbandictionary.com/v0/define?term={{query}}&page=0"
};

var API_RESPONSE_NORMALIZERS = {
    "urbandictionary": function(response) {
        var definitions = [];

        for (item of response.list) {
            definitions.push({
                definition: item.definition,
                author: item.author,
                example: item.example,
                link: item.permalink
            });
        }

        return definitions;
    }
};

chrome.contextMenus.create({
    title: "Webtionary define",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(e, tab) {
    var text = e.selectionText.toLowerCase();

    // send text-select event to tab
    chrome.tabs.sendMessage(tab.id, {
        _event: "text-select",
        text: text
    });

    // request definitions
    for (var provider in API_URLS) {
        if (API_URLS.hasOwnProperty(provider)) {
            var url = API_URLS[provider].replace(/{{\w*}}/g, text);
            console.log(url);
            xhr(url, function(data) {
                var definitions = API_RESPONSE_NORMALIZERS["urbandictionary"](JSON.parse(data));
                chrome.tabs.sendMessage(tab.id, {
                    _event: "definitions-get",
                    definitions: definitions
                });
            });
        }
    }
});

console.log("background.js");
