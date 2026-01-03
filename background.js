chrome.action.onClicked.addListener((tab) => {
  if (!tab.url) return;

  try {
    const url = new URL(tab.url);
    
    // בדיקה אם אנחנו כבר בתוך ספריית ויקיפדיה כדי לא לעשות לופ
    if (url.hostname.includes("wikipedialibrary")) {
        return; 
    }

    // החלפת נקודות במקפים
    const newHost = url.hostname.replace(/\./g, "-");
    
    // יצירת הכתובת החדשה
    const newUrl = `https://${newHost}.wikipedialibrary.idm.oclc.org${url.pathname}${url.search}`;

    // מעבר לכתובת החדשה באותה לשונית
    chrome.tabs.update(tab.id, { url: newUrl });

  } catch (e) {
    console.log("Error converting URL");
  }
});