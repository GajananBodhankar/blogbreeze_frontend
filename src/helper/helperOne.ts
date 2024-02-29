function handleSidebarColor(mode: string) {
  let doc = document.querySelector(".sidebar");
  if (mode == "light") {
    if (doc?.classList.contains("sidebarFixedLight")) {
      doc?.classList.remove("sidebarFixedLight");
      doc.classList.add("sidebarFixedLightShow");
    } else {
      doc?.classList.add("sidebarFixedLight");
      doc?.classList.remove("sidebarFixedLightShow");
    }
  } else {
    if (doc?.classList.contains("sidebarFixedDark")) {
      doc.classList.remove("sidebarFixedDark");
      doc.classList.add("sidebarFixedDarkShow");
    } else {
      doc?.classList.add("sidebarFixedDark");
      doc?.classList.remove("sidebarFixedDarkShow");
    }
  }
}
export { handleSidebarColor };
