(async () => {
  const { experiences } = await import(chrome.runtime.getURL("objects.js"));

  function fill(exp) {
    function set(selector, value) {
      const el = document.querySelector(selector);
      if (el) {
        el.focus();
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    set("input[name='jobTitle']", exp.position);
    set("input[name='companyName']", exp.company);
    set("textarea[id*='roleDescription']", exp.description);

    const [startMM, startYY] = exp.start.split("/");
    const [endMM, endYY] = exp.end.split("/");

    set("input[id*='startDate-dateSectionMonth-input']", startMM);
    set("input[id*='startDate-dateSectionYear-input']", startYY);
    set("input[id*='endDate-dateSectionMonth-input']", endMM);
    set("input[id*='endDate-dateSectionYear-input']", endYY);
  }

  function clickAddButton() {
    return new Promise((resolve) => {
      const addButton = document.querySelector("button[data-automation-id='add-button']");
      if (addButton) {
        addButton.click();
        // Wait a bit for the new form to load
        setTimeout(resolve, 1000);
      } else {
        resolve();
      }
    });
  }

  // Fill the first job (should already be on the page)
  fill(experiences[0]);

  // Add and fill remaining jobs
  for (let i = 1; i < experiences.length; i++) {
    await clickAddButton();
    fill(experiences[i]);
  }
})();