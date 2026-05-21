# Answers

### 1. How to run
To run this project on a fresh machine:
1. Ensure **Node.js** is installed.
2. Clone this repository and open the folder in your terminal.
3. Run `npm install` to install dependencies (React, Vite, Tailwind CSS).
4. Run `npm run dev` to start the local development server.
5. Open your browser and go to `http://localhost:5173/`.

### 2. Stack & design choices
**Stack:** I chose **React 19**, **Vite**, and **Tailwind CSS v4**. React is excellent for managing the complex, fast-changing state of a timer and interval lifecycle without messy DOM manipulations. Tailwind CSS allowed me to rapidly build a responsive, modern UI with complex styling (like glassmorphism) directly in the markup. Vite provides an incredibly fast build and HMR experience compared to Create React App.

**Visual/Interaction Decisions:**
1. **Dynamic Background Gradients:** Instead of just changing the text or a small icon to indicate the mode, the entire background is an animated gradient that shifts based on the mode. Deep violet/indigo for Focus Mode creates an immersive, deep-work feel. Teal/emerald for Break Mode creates a calming, refreshing vibe. This ensures the user instantly knows their state at a glance.
2. **Circular SVG Progress Ring with Glow:** Rather than a simple linear progress bar, I built a custom SVG circular ring with a blur filter for a glowing effect. This takes up a large portion of the viewport because the timer is the absolute core of the app. It provides a highly satisfying visual countdown that feels premium and "alive."

### 3. Responsive & accessibility
**Responsiveness:**
- On a **360px phone**, the app uses a single-column layout. The circular timer shrinks appropriately to prevent horizontal scrolling, and the control buttons stack vertically or wrap smoothly. Touch targets are large and accessible.
- On a **1440px laptop**, the app centers the main glassmorphism card with generous padding, making the typography look elegant and preventing the UI from stretching unnecessarily wide.

**Accessibility:**
- **Handled:** Keyboard navigation and semantic HTML. Every interactive element is a `<button>` or `<input>`, ensuring a user can Tab through the entire app. The timer text itself uses `aria-live="polite"` so screen readers are aware it's a changing timer without being too aggressive.
- **Skipped:** I knowingly skipped announcing *every single second* via screen readers. While `aria-live` is present, depending on screen reader configurations, announcing every second can be overwhelmingly annoying. A more robust implementation might only announce the last 10 seconds, or 5-minute intervals, rather than every tick.

### 4. AI usage
I used an AI assistant (Antigravity/Gemini) as a pair programmer to build this project rapidly. 
- **What I asked:** I provided my complete spec for the Pomodoro timer, including the requirement for persistent local storage, daily history, and premium UI. 
- **What it gave me:** It scaffolded the Vite project, created the Tailwind CSS configuration, and wrote the React components and custom `usePomodoro` hook.
- **What I changed:** The AI initially implemented a simple "beep" using the Web Audio API for the session completion sound. I realized that a generic tone felt a bit lifeless, so I asked the AI to switch it to the Web Speech API (`window.speechSynthesis`). Now, instead of a beep, a human-sounding voice actually announces "Great job! You have completed a 25 minute focus session" which makes the "session done" moment much more satisfying. We also had to explicitly add a global click listener to unlock the AudioContext on the first user interaction to bypass browser autoplay policies.

### 5. Honest gap
One thing that isn't polished enough is the handling of heavily throttled background tabs. While I implemented a `visibilitychange` event listener to calculate elapsed time and "catch up" the timer when the user returns to the tab, modern browsers aggressively throttle `setInterval` to 1 minute or worse if a tab is inactive for a long time. 
**If I had another day:** I would move the core timer ticking logic into a **Web Worker**. Web Workers run on a separate thread and are generally immune to aggressive background tab throttling, guaranteeing the timer remains perfectly accurate down to the millisecond even if the user leaves the tab hidden for an hour.
