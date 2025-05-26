const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const tabId = button.dataset.tab;

        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        contents.forEach(content => {
          content.classList.remove("active");
          if (content.id === tabId) {
            content.classList.add("active");
          }
        });
      });
    });