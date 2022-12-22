chrome.webRequest.onBeforeRequest.addListener(
    function (response) {
        let score = JSON.parse(response.requestBody.formData.problems).length - 1;
        let stats = { "scores": [], "top_score": 0, "avg_score": 0.0 }

        chrome.storage.sync.get("scores", function (items) {
            let scores = items
            if (Object.keys(scores).length > 0) {
                stats["scores"] = scores["scores"]
            }
            chrome.storage.sync.get("top_score", function (items) {
                let top_score = items
                if (Object.keys(top_score).length > 0) {
                    stats["top_score"] = top_score["top_score"]
                }
                chrome.storage.sync.get("avg_score", function (items) {
                    let avg_score = items
                    if (Object.keys(avg_score).length > 0) {
                        stats["avg_score"] = avg_score["avg_score"]
                    }
                    stats["scores"].push(score)
                    stats["avg_score"] = (stats["scores"].reduce((a, b) => a + b, 0)) / parseFloat(stats["scores"].length)
                    if (score > stats["top_score"]) {
                        stats["top_score"] = score
                    }
                    chrome.storage.sync.set(stats, function () { });
                })
            })
        })
    }
    , { urls: ["https://arithmetic.zetamac.com/log"] }, ["requestBody"]
);
