
export class ButtonHandlerService {
  public buttonInjected = false;

  public injectButton(player: HTMLDivElement) {
    console.log("Injecting button...", player);
    const buttonContainer =
      player.querySelector<HTMLDivElement>(".ytp-right-controls-left");
    if (!buttonContainer) return;

    console.log("Button container found:", buttonContainer);

    const existingButton =
      buttonContainer.querySelector<HTMLButtonElement>(".ytp-custom-button");
    if (existingButton) return;

    const isVisible = (button: HTMLButtonElement) => {
      const computedStyle = window.getComputedStyle(button);
      return computedStyle.display !== "none" && computedStyle.visibility !== "hidden";
    };

    const settingsReferenceButton = Array.from(
      player.querySelectorAll<HTMLButtonElement>("button.ytp-settings-button")
    ).find(isVisible);

    const fallbackReferenceButton = Array.from(
      player.querySelectorAll<HTMLButtonElement>("button.ytp-button")
    ).find((button) => isVisible(button) && !button.classList.contains("ytp-custom-button"));

    const referenceButton = settingsReferenceButton ?? fallbackReferenceButton;
    if (!referenceButton) return;

    const button = referenceButton.cloneNode(true) as HTMLButtonElement;
    button.classList.add("ytp-custom-button");
    button.setAttribute("aria-keyshortcuts", "A");
    button.setAttribute("data-priority", "5");
    button.setAttribute("data-title-no-tooltip", "Enable Ads");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Enable Ads Keyboard shortcut A");
    button.setAttribute("data-tooltip-title", "Enable Ads (A)");
    button.removeAttribute("aria-expanded");
    button.removeAttribute("aria-haspopup");
    button.removeAttribute("aria-controls");
    button.removeAttribute("data-tooltip-target-id");
    button.style.display = "";
    button.firstElementChild!.innerHTML = `<<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M840-440h-80q-17 0-28.5-11.5T720-480q0-17 11.5-28.5T760-520h80q17 0 28.5 11.5T880-480q0 17-11.5 28.5T840-440ZM664-288q10-14 26-16t30 8l64 48q14 10 16 26t-8 30q-10 14-26 16t-30-8l-64-48q-14-10-16-26t8-30Zm120-424-64 48q-14 10-30 8t-26-16q-10-14-8-30t16-26l64-48q14-10 30-8t26 16q10 14 8 30t-16 26ZM200-360h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l139-84q20-12 40.5 0t20.5 35v338q0 23-20.5 35t-40.5 0l-139-84h-40v120q0 17-11.5 28.5T240-200q-17 0-28.5-11.5T200-240v-120Zm240-22v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z"/></svg>`;
    button.addEventListener("click", () => {
      console.log("Custom button clicked!");
    });
    buttonContainer.prepend(button);
    this.buttonInjected = true;
  }

}