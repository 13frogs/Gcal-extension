document.getElementById("save").onclick = () => {

    chrome.storage.sync.set({
        keywords:
        document.getElementById("keywords").value
    });
};
