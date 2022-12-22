const body = document.querySelector("body");
const div = body.querySelector("div")
const isWelcome = div.id === 'welcome'


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
            if (isWelcome) {
                const topScore = document.createElement("p");
                topScore.textContent = `Top Score: ${stats["top_score"]}`
                const avgScore = document.createElement("p");
                avgScore.textContent = `Average Score: ${stats["avg_score"]}`
                const form = div.querySelector("form")
                form.insertAdjacentElement("afterend", topScore)
                topScore.insertAdjacentElement("afterend", avgScore)
            }

        })
    })
})
