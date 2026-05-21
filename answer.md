# Answers to your questions

### 1. How did we add the voice?
Instead of using a simple "beep" sound, we used the browser's built-in **Web Speech API** (`window.speechSynthesis`). This allows the browser to read text out loud like a real human. When the timer finishes, the code sends a sentence (like *"Great job! You have completed a 25 minute focus session"*) to the API, and the browser speaks it out loud for you.

### 2. How to change the time?
You are absolutely right that you shouldn't be stuck with just 25 minutes! To change the time:
1. Click the **Settings** button (with the ⚙️ gear icon) under the timer controls.
2. Type whatever number of minutes you want for your Focus and Break sessions.
3. Click **Apply Settings**. The timer will instantly update to your new time.

### 3. How to push your code using Antigravity
Since Antigravity has a simple chat interface, you don't even need to open a separate terminal. Whenever you make changes and want to save them to GitHub, you can just ask Antigravity:
*"Please push my latest changes to GitHub"*
Antigravity will automatically run the git commands (`git add .`, `git commit`, `git push`) for you in the background!
