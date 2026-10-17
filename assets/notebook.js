(() => {
  const input = document.querySelector("#entry-search");
  if (input) {
    document.querySelector("[data-search-box]").hidden = false;
    input.addEventListener("input", () => {
      const query = input.value.trim().toLocaleLowerCase();
      const entries = [...document.querySelectorAll("[data-entry]")];
      let count = 0;
      entries.forEach((entry) => {
        entry.hidden = !entry.dataset.search
          .toLocaleLowerCase()
          .includes(query);
        if (!entry.hidden) count++;
      });
      document.querySelector("#search-status").textContent = query
        ? count
          ? `${count} ${count === 1 ? "note" : "notes"} found.`
          : "No notes found. Try another word or clear your search."
        : "";
    });
  }
  const body = document.querySelector(".post-body");
  if (!body) return;
  const contents = document.querySelector("#contents");
  const headings = [...body.querySelectorAll("h2, h3")];
  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `section-${index + 1}`;
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    contents.appendChild(link);
  });
  if (!headings.length)
    document.querySelector(".reading-sidebar").hidden = true;
  const progress = document.querySelector(".reading-progress span");
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${distance > 0 ? Math.min(100, Math.max(0, (window.scrollY / distance) * 100)) : 100}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
  const copy = document.querySelector("#copy-link");
  if (navigator.clipboard && window.isSecureContext) {
    copy.hidden = false;
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href.split("#")[0]);
        document.querySelector("#copy-status").textContent = "Link copied.";
      } catch {
        document.querySelector("#copy-status").textContent =
          "Couldn’t copy. Copy the address from your browser instead.";
      }
    });
  }
})();
