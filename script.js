const eventTime = new Date("2026-11-27T21:00:00-03:00").getTime();
const invitationEntry = document.getElementById("invitation-entry");
const invitationAudio = document.getElementById("invitation-audio");
const audioToggle = document.getElementById("audio-toggle");

function updateAudioToggle() {
  const isPlaying = !invitationAudio.paused;
  audioToggle.classList.toggle("is-playing", isPlaying);
  audioToggle.setAttribute("aria-pressed", String(isPlaying));
  audioToggle.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
}

document.querySelectorAll("[data-entry]").forEach(button => button.addEventListener("click", async () => {
  audioToggle.hidden = false;
  if (button.dataset.entry === "music") {
    try { await invitationAudio.play(); } catch { /* El control flotante permite reintentar. */ }
  }
  updateAudioToggle();
  invitationEntry.classList.add("is-closing");
  document.body.classList.remove("intro-open");
  setTimeout(() => { invitationEntry.hidden = true; }, 650);
}));

audioToggle.addEventListener("click", async () => {
  if (invitationAudio.paused) {
    try { await invitationAudio.play(); } catch { /* El navegador puede bloquear el audio. */ }
  } else {
    invitationAudio.pause();
  }
  updateAudioToggle();
});
invitationAudio.addEventListener("play", updateAudioToggle);
invitationAudio.addEventListener("pause", updateAudioToggle);

const ids = ["days", "hours", "minutes", "seconds"];
function updateCountdown() {
  const distance = Math.max(0, eventTime - Date.now());
  const values = [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60];
  ids.forEach((id, index) => document.getElementById(id).textContent = String(values[index]).padStart(2, "0"));
}
updateCountdown(); setInterval(updateCountdown, 1000);
const modal = document.getElementById("message-modal");
document.querySelectorAll("[data-message]").forEach(button => button.addEventListener("click", () => { document.getElementById("modal-message").textContent = button.dataset.message; modal.showModal(); }));
document.querySelectorAll("[data-dialog]").forEach(button => button.addEventListener("click", () => document.getElementById(button.dataset.dialog).showModal()));
const photoModal = document.getElementById("photo-modal");
const photoModalImage = document.getElementById("photo-modal-image");
document.querySelectorAll("[data-gallery-photo]").forEach(button => button.addEventListener("click", () => {
  const image = button.querySelector("img");
  photoModalImage.src = image.src;
  photoModalImage.alt = image.alt;
  photoModal.showModal();
}));
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
});
document.querySelector(".copy-alias").addEventListener("click", async event => {
  await navigator.clipboard.writeText(event.currentTarget.dataset.alias);
  const original = event.currentTarget.textContent;
  event.currentTarget.textContent = "ALIAS COPIADO ✓";
  setTimeout(() => event.currentTarget.textContent = original, 1800);
});
