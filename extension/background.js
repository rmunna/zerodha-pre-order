const TARGET_HOUR = 8; 
const TARGET_MINUTE = 59;
const TARGET_SECOND = 59; 
const TARGET_MILLISECOND = 980; // Network latency between bangalore and mumbai is ~20ms

function setAlarm() {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), TARGET_HOUR, TARGET_MINUTE, TARGET_SECOND, TARGET_MILLISECOND);

  // Adjust targetTime to the next day if it's already past the target time
  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeToTarget = targetTime.getTime() - now.getTime();
  chrome.alarms.create('clickAlarm', { when: Date.now() + timeToTarget });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'clickAlarm') {

/*    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: clickButton
      });
    });*/

   
   chrome.windows.getCurrent(w => {
   chrome.tabs.query({active: true, windowId: w.id}, tabs => {
      const tab_id = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tab_id },
        function: clickButton
      });
    });
  });


  }
});

function clickButton() {
  // Implement button click logic here
  const button = document.querySelector('.order-window .submit'); // Adjust selector as needed
  if (button) {
    button.click();
  }
}

// Set the alarm when the extension is installed or updated
chrome.runtime.onInstalled.addListener(setAlarm);
