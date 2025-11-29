(async () => {
  const { experiences } = await import(chrome.runtime.getURL("objects.js"));

  function fillLatestForm(exp) {
    // Always target the last (most recently added) work experience form
    const allForms = document.querySelectorAll('[data-fkit-id*="workExperience-"][data-fkit-id$="--null"]');
    const latestForm = allForms[allForms.length - 1];
    
    if (!latestForm) {
      console.log("No form found");
      return;
    }

    function setInForm(selector, value) {
      const el = latestForm.querySelector(selector);
      if (el) {
        el.focus();
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        console.log(`Set ${selector} to ${value}`);
      } else {
        console.log(`Element not found: ${selector}`);
      }
    }

    setInForm("input[name='jobTitle']", exp.position);
    setInForm("input[name='companyName']", exp.company);
    setInForm("textarea[id*='roleDescription']", exp.description);

    const [startMM, startYY] = exp.start.split("/");
    const [endMM, endYY] = exp.end.split("/");

    setInForm("input[id*='startDate-dateSectionMonth-input']", startMM);
    setInForm("input[id*='startDate-dateSectionYear-input']", startYY);
    setInForm("input[id*='endDate-dateSectionMonth-input']", endMM);
    setInForm("input[id*='endDate-dateSectionYear-input']", endYY);
  }

  function clickAddButton() {
    return new Promise((resolve) => {
      const addButton = document.querySelector("button[data-automation-id='add-button']");
      if (addButton) {
        console.log("Clicking add button");
        addButton.click();
        // Wait longer for the new form to load
        setTimeout(resolve, 2000);
      } else {
        console.log("Add button not found");
        resolve();
      }
    });
  }

  console.log(`Starting to fill ${experiences.length} experiences`);


  for (let i = 0; i < experiences.length; i++) {
    console.log(`Adding experience ${i + 1}`);
    await clickAddButton();
    fillLatestForm(experiences[i]);
  }

  console.log("Finished filling all experiences");
})();