"use client";

import { useEffect, useRef, useState } from "react";
const portada = { src: "/referencias/01-portada-noa.png" };
const invitados = { src: "/referencias/01b-invitados-noa.png" };
const cuentaRegresiva = { src: "/referencias/02-cuenta-regresiva.png" };
const fechaHora = { src: "/referencias/03-fecha-hora-noa.png" };
const comoLlegar = { src: "/referencias/04-como-llegar-noa.png" };
const dressCode = { src: "/referencias/05-dress-code-noa.png" };
const albumFotos = { src: "/referencias/06-album-fotos-bloomkeep.png" };
const regalos = { src: "/referencias/07-regalos.png" };
const musica = { src: "/referencias/08-musica.png" };
const venis = { src: "/referencias/09-venis-noa.png" };
const footerBloomdate = { src: "/referencias/10-footer-bloomdate.png" };
const noa01 = { src: "/fotos-noa/noa-01.jpeg" };
const noa02 = { src: "/fotos-noa/noa-02.jpeg" };
const noa03 = { src: "/fotos-noa/noa-03.jpeg" };
const noa04 = { src: "/fotos-noa/noa-04.jpeg" };
const noa05 = { src: "/fotos-noa/noa-05.jpeg" };
const noa06 = { src: "/fotos-noa/noa-06.jpeg" };
const noa07 = { src: "/fotos-noa/noa-07.jpeg" };
const noa08 = { src: "/fotos-noa/noa-08.jpeg" };
const entradaMusica = { src: "/entrada-musica-noa.png" };

const EVENT_DATE = new Date("2026-11-27T21:00:00-03:00").getTime();

function getCountdown() {
  const distance = Math.max(0, EVENT_DATE - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Home() {
  const [time, setTime] = useState(getCountdown());
  const [giftOpen, setGiftOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);
  const [entryOpen, setEntryOpen] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPhoto]);

  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiesta%20de%2015%20de%20Noa&dates=20261128T000000Z/20261128T083000Z&details=Te%20espero%20para%20celebrar%20juntos&location=Jano%27s%2C%20Manuel%20Savio%20y%20Calchaqu%C3%AD%203151";

  async function enterInvitation(withMusic: boolean) {
    if (withMusic && audioRef.current) {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    }
    setEntryOpen(false);
  }

  async function toggleMusic() {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  }

  return (
    <>
      {entryOpen && (
        <div className="invitation-entry" role="dialog" aria-modal="true" aria-label="Elegir cómo entrar a la invitación">
          <div className="entry-card">
            <img src={entradaMusica.src} alt="Noa, mis quince" />
            <button className="entry-choice entry-choice--music" onClick={() => enterInvitation(true)} aria-label="Entrar con música" />
            <button className="entry-choice entry-choice--silent" onClick={() => enterInvitation(false)} aria-label="Entrar sin música" />
          </div>
        </div>
      )}
      <audio ref={audioRef} src="/audio/musica-noa.mp3" preload="metadata" loop onPlay={() => setMusicPlaying(true)} onPause={() => setMusicPlaying(false)} />
      {!entryOpen && (
        <button className={`audio-toggle${musicPlaying ? " is-playing" : ""}`} type="button" onClick={toggleMusic} aria-label={musicPlaying ? "Pausar música" : "Reproducir música"} aria-pressed={musicPlaying}>
          <span className="audio-toggle-icon" aria-hidden="true" />
        </button>
      )}
      <main>
      <section className="piece effect-hero">
        <img src={portada.src} alt="Invitación de Noa" />
      </section>

      <section className="piece guest-section" aria-labelledby="guest-title">
        <img className="guest-backdrop" src={invitados.src} alt="" aria-hidden="true" />
        <div className="guest-copy">
          <span className="guest-kicker">INVITADOS</span>
          <p>Esta invitación fue preparada<br />especialmente para</p>
          <h2 id="guest-title">Vos</h2>
          <span className="guest-divider" aria-hidden="true" />
          <p className="guest-message">Nos encantaría compartir esta noche inolvidable con vos.</p>
        </div>
      </section>

      <section className="piece countdown-piece">
        <img src={cuentaRegresiva.src} alt="Cada vez falta menos" />
        <div className="countdown" aria-label="Cuenta regresiva para la fiesta">
          {[
            [time.days, "DÍAS"],
            [time.hours, "HORAS"],
            [time.minutes, "MINUTOS"],
            [time.seconds, "SEGUNDOS"],
          ].map(([value, label]) => (
            <div className="countdown-item" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="piece action-piece">
        <img src={fechaHora.src} alt="Viernes 27 de noviembre de 2026, de 21:00 a 5:30 horas" />
        <a className="hotspot calendar" href={calendarUrl} target="_blank" rel="noreferrer" aria-label="Agregar la fiesta al calendario" />
      </section>

      <section className="piece action-piece">
        <img src={comoLlegar.src} alt="Cómo llegar a Jano's, Manuel Savio y Calchaquí 3151" />
        <button className="hotspot map" onClick={() => setLocationOpen(true)} aria-label="Ver cómo llegar" />
      </section>

      <section className="piece effect-dress">
        <img src={dressCode.src} alt="Dress code elegante: evitá azul, negro y gris" />
      </section>

      <section className="piece action-piece">
        <img src={albumFotos.src} alt="Álbum de fotos: compartí tus fotos de la fiesta y guardemos juntos cada recuerdo" />
        <a className="bloomkeep-button" href="https://app.bloomkeep.site/noa-15" target="_blank" rel="noreferrer" aria-label="Entrar a Bloomkeep" />
      </section>

      <section className="photo-gallery" aria-labelledby="gallery-title">
        <header className="gallery-heading">
          <span className="gallery-kicker">RECUERDOS</span>
          <h2 id="gallery-title">Un poquito<br /><em>de mí</em></h2>
          <span className="gallery-star" aria-hidden="true">✦</span>
        </header>
        <div className="gallery-grid">
          <button className="gallery-photo gallery-photo--wide" onClick={() => setSelectedPhoto({ src: noa01.src, alt: "Foto nocturna de Noa" })} aria-label="Ampliar foto nocturna de Noa"><img src={noa01.src} alt="Noa posando de noche" loading="lazy" /></button>
          <button className="gallery-photo" onClick={() => setSelectedPhoto({ src: noa02.src, alt: "Retrato nocturno de Noa" })} aria-label="Ampliar retrato nocturno de Noa"><img src={noa02.src} alt="Noa junto al río de noche" loading="lazy" /></button>
          <button className="gallery-photo" onClick={() => setSelectedPhoto({ src: noa03.src, alt: "Foto de Noa en las escalinatas" })} aria-label="Ampliar foto de Noa en las escalinatas"><img src={noa03.src} alt="Noa en las escalinatas" loading="lazy" /></button>
          <button className="gallery-photo gallery-photo--landscape" onClick={() => setSelectedPhoto({ src: noa04.src, alt: "Foto de Noa junto a las flores" })} aria-label="Ampliar foto de Noa junto a las flores"><img src={noa04.src} alt="Noa junto a las flores" loading="lazy" /></button>
          <button className="gallery-photo gallery-photo--tall" onClick={() => setSelectedPhoto({ src: noa05.src, alt: "Foto de Noa sentada en las escalinatas" })} aria-label="Ampliar foto de Noa sentada en las escalinatas"><img src={noa05.src} alt="Noa sentada en las escalinatas" loading="lazy" /></button>
          <button className="gallery-photo gallery-photo--tall" onClick={() => setSelectedPhoto({ src: noa06.src, alt: "Foto nocturna de Noa" })} aria-label="Ampliar foto nocturna de Noa"><img src={noa06.src} alt="Noa en una pasarela de madera" loading="lazy" /></button>
          <button className="gallery-photo gallery-photo--landscape gallery-photo--focus-upper" onClick={() => setSelectedPhoto({ src: noa07.src, alt: "Foto nocturna de Noa junto a una mesa" })} aria-label="Ampliar foto nocturna de Noa junto a una mesa"><img src={noa07.src} alt="Noa junto a una mesa bajo las luces" loading="lazy" /></button>
        </div>
      </section>

      {selectedPhoto && (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" onClick={() => setSelectedPhoto(null)}>
          <button className="photo-lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Cerrar foto">×</button>
          <img src={selectedPhoto.src} alt={selectedPhoto.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}

      <section className="piece action-piece effect-gifts">
        <img src={regalos.src} alt="Regalos: lo más lindo es compartir este momento con vos" />
        <button className="hotspot gifts" onClick={() => setGiftOpen(true)} aria-label="Ver datos para regalos" />
      </section>

      <section className="piece action-piece effect-music">
        <img src={musica.src} alt="Música: armemos juntos la playlist de mi fiesta" />
        <a className="hotspot song" href="https://open.spotify.com/playlist/64ZjTYKYNlk7DWYe7UvJPz?si=_L0lxqzVTaaqviHFTkRMkw&utm_source=whatsapp&pt=4dad3bd9cccd1acfe8beda715e45427d&pi=wD1quk4lQea_k" target="_blank" rel="noreferrer" aria-label="Abrir la playlist de Noa en Spotify" />
      </section>

      <section className="piece action-piece effect-rsvp">
        <img src={venis.src} alt="¿Venís? Confirmá tu asistencia hasta el 12 de noviembre" />
        <a className="hotspot rsvp" href="https://bloomdate-rsvp.netlify.app/r/cumple-xv-noa" target="_blank" rel="noreferrer" aria-label="Confirmar asistencia" />
      </section>

      <section className="piece farewell">
        <img src={noa08.src} alt="Retrato de Noa" loading="lazy" />
        <div className="farewell-copy"><span>Te espero</span><h2>Noa</h2></div>
      </section>

      <footer className="bloomdate-footer effect-footer">
        <img src={footerBloomdate.src} alt="Hecho con amor por BloomDate" />
        <a className="footer-link footer-instagram" href="https://www.instagram.com/bloomdate.invitaciones/" target="_blank" rel="noreferrer" aria-label="Instagram de BloomDate" />
        <a className="footer-link footer-whatsapp" href="https://wa.me/541140436324" target="_blank" rel="noreferrer" aria-label="WhatsApp de BloomDate" />
        <a className="footer-link footer-web" href="https://bloomdate-site.netlify.app/" target="_blank" rel="noreferrer" aria-label="Sitio web de BloomDate" />
      </footer>

      {giftOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="gift-title" onClick={() => setGiftOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setGiftOpen(false)} aria-label="Cerrar">×</button>
            <span className="eyebrow">REGALOS</span>
            <h2 id="gift-title">Datos para regalar</h2>
            <dl><div><dt>Nombre</dt><dd>Noa Mía Shanti Sosa</dd></div><div><dt>Alias</dt><dd>noii.51</dd></div></dl>
            <button className="modal-action" onClick={() => navigator.clipboard.writeText("noii.51")}>COPIAR ALIAS</button>
          </div>
        </div>
      )}
      {locationOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="location-title" onClick={() => setLocationOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setLocationOpen(false)} aria-label="Cerrar">×</button>
            <span className="eyebrow">CÓMO LLEGAR</span><h2 id="location-title">Jano&apos;s</h2>
            <p>Manuel Savio y Calchaquí N° 3151</p>
            <a className="modal-action" href="https://www.google.com/maps/search/?api=1&query=Jano%27s+Manuel+Savio+y+Calchaqui+3151" target="_blank" rel="noreferrer">ABRIR EN GOOGLE MAPS</a>
          </div>
        </div>
      )}
      </main>
    </>
  );
}
