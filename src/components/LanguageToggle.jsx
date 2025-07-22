import { useState, useEffect } from "react";

const LanguageToggle = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Load Google Translate script
    const addScript = () => {
      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Add CSS to hide ALL Google Translate branding and banners
      const style = document.createElement("style");
      style.innerHTML = `
        .skiptranslate, .goog-te-banner-frame, .goog-te-menu-value, 
        .goog-te-menu-frame, .goog-te-ftab, .goog-te-gadget, 
        .goog-te-combo, .goog-te-banner *, .goog-te-float *, 
        .goog-te-menu-value *, .goog-te-menu-frame * {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);

      // Remove the iframe that Google adds
      const removeGoogleBanner = () => {
        const iframes = document.getElementsByTagName("iframe");
        for (let i = 0; i < iframes.length; i++) {
          if (iframes[i].title === "Language Translate Widget") {
            iframes[i].remove();
          }
        }
        const divs = document.getElementsByTagName("div");
        for (let i = 0; i < divs.length; i++) {
          if (divs[i].className.includes("goog-te-banner-frame")) {
            divs[i].remove();
          }
        }
      };

      // Run immediately and also on interval to catch delayed elements
      removeGoogleBanner();
      const interval = setInterval(removeGoogleBanner, 500);

      return () => clearInterval(interval);
    };

    addScript();

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  const toggleLanguage = () => {
    if (currentLang === "en") {
      setCurrentLang("hi");
      const selectField = document.querySelector(".goog-te-combo");
      if (selectField) {
        selectField.value = "hi";
        selectField.dispatchEvent(new Event("change"));
      }
    } else {
      setCurrentLang("en");
      // Reset Google Translate by clearing cookies and reload
      document.cookie = "googtrans=/en/en;path=/";
      document.cookie = "googtrans=/;path=/";
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"

        // className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        {currentLang === "en" ? "हिंदी" : "English"}
      </button>
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
};

export default LanguageToggle;
