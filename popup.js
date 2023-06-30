console.log("This is a popup!")
getCurrentURL()

function modifyURL(url) {
    start = url.indexOf("/edit")
    end = url.indexOf("=")
    console.log(start)
    console.log(end)
    badText = url.substring(start, end+1)
    goodText = "/export?format=xlsx&gid="
    url = url.replace(badText, goodText)
    return url

}
async function getCurrentURL() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, function(tabs){
        console.log(tabs[0].url)
        updatedUrl = modifyURL(tabs[0].url)
        chrome.tabs.update({url: updatedUrl});
        return tabs[0].url;
    });
  }