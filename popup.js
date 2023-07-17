function modifyURL(url) {
    start = url.indexOf("/edit")
    end = url.indexOf("=")
    badText = url.substring(start, end+1)

    format = document.getElementById('format').value;
    if (format == "csv") {
        goodText = "/export?format=csv&gid="
    }
    else if (format == "xlsx") {
        goodText = "/export?format=xlsx&gid="
    }
    url = url.replace(badText, goodText)
    return url

}
async function getCurrentURL() {
    document.getElementById("errorText").style.visibility = "hidden";
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, function(tabs){
        if(tabs[0].url.indexOf("docs.google.com/spreadsheets") != -1) {
          updatedUrl = modifyURL(tabs[0].url)
          chrome.tabs.update({url: updatedUrl});
          window.close()
          return tabs[0].url;
        } else {
          console.log("sheets not selected >:(")
          document.getElementById("errorText").style.visibility = "visible";
        }

    });
  }

  // Saves options to chrome.storage
const saveOptions = () => {
    const format = document.getElementById('format').value;
  
    chrome.storage.sync.set(
      { fileFormat: format }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { fileFormat: 'csv'},
      (items) => {
        document.getElementById('format').value = items.fileFormat;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('format').addEventListener('change', saveOptions)
  document.getElementById('download').addEventListener('click', function(){getCurrentURL(); })