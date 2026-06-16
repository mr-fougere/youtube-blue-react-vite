
# ▶️ YoutubeBlue 

## 🔎 Introduction

### 🤔 Why did I start developing YoutubeBlue?

That's a great question! I really enjoy listening to 10-hour chill/rock mixes on YouTube in the background while I'm developing. 

BUT ❗ 

For several years now, YouTube has allowed ads to pop up during video playback.

### 🤷‍♂️ What's the issue?

I need to switch tabs to skip or wait 15-30 seconds for my video to come back, which can disrupt moments of concentration ☠️.

So, I decided to address this with a web extension and, at the same time, enhance my use of YouTube.

For example, I realized that sometimes I set my video quality high for watching videos, but I forget to lower it when I switch to music videos.

The result is high data consumption for a video I'm not actually watching, so I needed to solve this too!

### ❓ Why this name?

It's a reference to the original name of YouTube Premium, which was YouTubeRed 🟥.

The web extension offers features similar to YouTube Premium but for free.

The freedom is symbolized by the color blue 🟦.

## 🌐 Installation

Download the latest package from GitHub Releases:
- `youtube-blue-chrome-<version>.zip`
- `youtube-blue-firefox-<version>.zip`

### Chrome (EN)
1. Extract `youtube-blue-chrome-<version>.zip`.
2. Open `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted folder.

### Chrome (FR)
1. Décompresse `youtube-blue-chrome-<version>.zip`.
2. Ouvre `chrome://extensions/`.
3. Active le **mode développeur**.
4. Clique sur **Charger l’extension non empaquetée**.
5. Sélectionne le dossier décompressé.

### Firefox (EN)
1. Extract `youtube-blue-firefox-<version>.zip`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**.
4. Select `manifest.json` from the extracted folder.

### Firefox (FR)
1. Décompresse `youtube-blue-firefox-<version>.zip`.
2. Ouvre `about:debugging#/runtime/this-firefox`.
3. Clique sur **Charger un module complémentaire temporaire**.
4. Sélectionne le fichier `manifest.json` dans le dossier décompressé.

### Other browsers / Autres navigateurs
For Chromium-based browsers (Edge, Brave, Opera), use the same steps as Chrome with the Chrome ZIP.
Pour les navigateurs basés sur Chromium (Edge, Brave, Opera), utilise les mêmes étapes que Chrome avec le ZIP Chrome.

## 🔧 Features

- ### 📣 Auto skip ads [ STABLE ]
	- - You can enable/disable the feature with the key 'A'
	- You can see the current state in the video settings bar
	 
- ### 📈 Dashboard [ STABLE ]
	- You can find your stats in the extension popup 

- ### ⚙️ Auto resolution reducer [ IN PROGRESS ]
	- You can enable/disable the feature in the video settings menu
	- When you are not on the YouTube video for 5s, the quality decreases to 144P
	- When you come back to the YouTube video for more than 2s, it reapplies your previous quality.
