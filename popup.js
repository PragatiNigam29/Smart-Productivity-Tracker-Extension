function updatePopup() {
    chrome.storage.local.get(["timeData"], (result) => {
        let data = result.timeData || {};
        let totalTime = 0;
        let sitesHTML = "";

        for (let key in data) {
            let minutes = Math.floor(data[key] / 60000);
            totalTime += data[key];

            let domain = key.replace(/^https?:\/\//, '').split('/')[0];

            sitesHTML += `
                <div>
                    ${domain} - ${minutes} mins
                    <div class="bar" style="width:${minutes * 5}px"></div>
                </div>
            `;
        }

        document.getElementById("time").textContent =
            Math.floor(totalTime / 60000) + " mins";

        document.getElementById("score").textContent =
            Math.min(100, Math.floor(totalTime / 60000) * 5) + "%";

        document.getElementById("sites").innerHTML = sitesHTML;
    });
}

setInterval(updatePopup, 1000);
updatePopup();