const helpBtn = document.querySelector(".help-btn");
const helpText = document.querySelector(".help-text");

helpBtn.addEventListener("click", (e) => {
  helpText.classList.add("help-text-show");
  e.stopPropagation();
});

window.addEventListener("click", () => {
  helpText.classList.remove("help-text-show");
});
