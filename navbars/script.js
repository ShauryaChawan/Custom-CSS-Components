let toggleStates = {
    "top-navbar": false,
    "left-navbar": false,
    "right-navbar": false,
  };
  
  let isToggledOn = (section) => {
    toggleStates[section] = !toggleStates[section];
    console.log(section, toggleStates[section]);
    return toggleStates[section];
  };
  
  const hamburgers = document.querySelectorAll(".hamburger");
  
  hamburgers.forEach((hamburger) => {
    const parentSection = hamburger.closest("section");
    const navLinksMobile = parentSection.querySelector(".nav-links-mobile");
  
    hamburger.addEventListener("click", () => {
      const sectionClass = parentSection.classList[0]; // e.g., "top-navbar"
      if (isToggledOn(sectionClass)) {
        addClasses(navLinksMobile, sectionClass);
      } else {
        reverseClasses(navLinksMobile, sectionClass);
        setTimeout(() => {
          removeClasses(sectionClass);
        }, 1005);
      }
    });
  });
  
  let addClasses = (navLinksMobile, sectionClass) => {
    if (navLinksMobile.classList.contains("close")) {
      navLinksMobile.classList.replace("close", "active");
    } else {
      navLinksMobile.classList.add("active");
    }
  
    const hamburger = document.querySelector(`.${sectionClass} .hamburger`);
  
    hamburger.querySelector("#ham-line-1").classList.add("ham-line-1");
    hamburger.querySelector("#ham-line-2").classList.add("ham-line-2");
    hamburger.querySelector("#ham-line-3").classList.add("ham-line-3");
    hamburger.querySelector("#ham-line-cross").classList.add("ham-line-cross");
  };
  
  let reverseClasses = (navLinksMobile, sectionClass) => {
    navLinksMobile.classList.replace("active", "close");
  
    const hamburger = document.querySelector(`.${sectionClass} .hamburger`);
  
    hamburger.querySelector("#ham-line-1").classList.replace("ham-line-1", "ham-line-1-r");
    hamburger.querySelector("#ham-line-2").classList.add("ham-line-2-r");
    hamburger.querySelector("#ham-line-3").classList.add("ham-line-3-r");
    hamburger.querySelector("#ham-line-cross").classList.add("ham-line-cross-r");
  };
  
  let removeClasses = (sectionClass) => {
    const hamburger = document.querySelector(`.${sectionClass} .hamburger`);
  
    hamburger.querySelector("#ham-line-1").classList.remove("ham-line-1", "ham-line-1-r");
    hamburger.querySelector("#ham-line-2").classList.remove("ham-line-2", "ham-line-2-r");
    hamburger.querySelector("#ham-line-3").classList.remove("ham-line-3", "ham-line-3-r");
    hamburger.querySelector("#ham-line-cross").classList.remove("ham-line-cross", "ham-line-cross-r");
  };
  