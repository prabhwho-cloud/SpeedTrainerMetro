# SpeedTrainerMetro
Speed Trainer Metronome

 🥁 Incremental Speed Trainer Metronome

A high-precision, distraction-free web metronome tailored for musicians looking to build speed, accuracy, and muscle memory systematically. 

Built natively with the **Web Audio API**, this app avoids the rhythmic drift common in standard JavaScript timers, ensuring hardware-level clock precision even during visual UI updates.

---

## 🚀 Live Demo
You can view and use the live application directly in your browser here:  
👉 **https://prabhwho-cloud.github.io/SpeedTrainerMetro/Speed%20Trainer%20Metronome.html** 

---

## ✨ Features

* **Precision Timing:** Powered by the Web Audio API to prevent stuttering, lag, or tempo shifts during browser rendering or layout calculation.
* **Automated Speed Trainer:** Accelerates by **+1 BPM** automatically at user-defined intervals (`3`, `5`, `7`, `10`, `15`, or `20` seconds).
* **Intuitive Downbeat Accent:** Features a dynamic 4-beat cycle where the first beat of every measure is synthesized at a higher pitch ($1200\\text{ Hz}$) than the remaining beats ($800\\text{ Hz}$), allowing you to keep track of your measures effortlessly.
* **Pre-flight BPM Customization:** Set your ideal starting tempo (defaults to `110` BPM) using responsive `+` and `-` controls. Interlocking mechanics automatically lock these controls during playback to maintain clock safety.
* **Integrated Countdown UI:** A minimal countdown visualization alerts you precisely when the next tempo jump will take place so you are never caught off-guard mid-phrase.

---

## 🛠️ Tech Stack & Architecture

This project is a pure **static web application** built from scratch without bulky framework dependencies:

* **HTML5:** Structured semantic markup focusing on high readability from a distance (essential for instrument practice).
* **CSS3 (Modern UI):** A dark-themed, eye-friendly, and responsive user interface suited for low-light practice environments and recording studios.
* **Vanilla JavaScript (ES6+):** Orchestrates the lookahead audio scheduling loop and visual countdown triggers.

---

## 💾 Installation & Local Development

No compilation, `npm install`, or local server environment is required. You can run this completely offline.

1. **Clone the repository:**
