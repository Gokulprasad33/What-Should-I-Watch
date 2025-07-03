# 🎬 Movie Finder
[Preview](https://movies.nuxt.space](https://6865fcfc2010220008884f4a--whatshouldiwatchnow.netlify.app/)

## 🍿 A simple, fun web app to help you decide *what movie to watch next!*  

### Pick your genre, language, rating preference and get a recommendation.  
### Perfect for times when you just can’t decide!!!

---

## 📸 Screenshots
## Home page

![landing_page](https://github.com/user-attachments/assets/a580ab35-2256-4fb9-96e5-842b9f836758)

## Movie Overview

![batman_example](https://github.com/user-attachments/assets/73f6b186-205f-406e-b07f-1a40f5894ba0)
![screenshot_1751511219](https://github.com/user-attachments/assets/e263f423-1d63-497e-bc6b-fad1428badda)

## Mobile
<p align="center">
  <img src="https://github.com/Gokulprasad33/What-Should-I-Watch/blob/main/Sreenshots/mobile_preview_2.png?raw=true" width="300" height="650"/>
  <img src="https://github.com/Gokulprasad33/What-Should-I-Watch/blob/main/Sreenshots/mobile_preview_1.png?raw=true" width="300" height="650"/>
</p>


## 🚀 Features

- 🎲 Random movie suggestion based on filters
- 🎯 Filter by genre, language, release year, NSFW toggle, and more
- 🗒️ Add to your personal watchlist 
- 💥 Works fast with a simple backend API

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Flask python (deployed on Render)

---

## ⚙️ Run Locally

Clone the project:
```bash
git clone https://github.com/Gokulprasad33/What-Should-I-Watch.git
cd What-Should-I-Watch
```
Installing dependencies
```bash
npm install
```
Start the Frontend
```bash
npm run dev 

or

npm run build
npx serve dist
```

### Backend
Install backend from [Here](https://github.com/Gokulprasad33/Movie-finder-backend)

Clone the project :
```bash
git clone https://github.com/Gokulprasad33/Movie-finder-backend
cd movie-finder-backend
```

Create virtual environment :
```bash
# Create virtual environment
python -m venv venv 

# Activete the virtual environment
source venv/bin/activate  
```

```bash
# Installing dependencies
pip install -r requirements.txt
# Running backend
python backend.py
```
## 🔗 Connect Frontend to Backend

After starting your Flask backend locally, it will run on a host like:

```bash
http://127.0.0.1:5000
```

Now update the `backend_url` inside [src/App.jsx](https://github.com/Gokulprasad33/What-Should-I-Watch/blob/main/src/App.jsx) with your local backend URL:

```bash
const backend_url = "http://127.0.0.1:5000"; 
```
This ensures the frontend can communicate with the backend properly during development.


## 🌐 Deployment

### 1.Backend (python)
User render for backend hosting (Flask)
Follow this tutorial if needed [Link](https://youtu.be/vwoUriuqcio?si=JfMUv2fF2i4nCTze)

 After deploying copy the live API URL (e.g., https://your-backend.onrender.com)
Paste it inside [src/App.jsx](https://github.com/Gokulprasad33/What-Should-I-Watch/blob/main/src/App.jsx) where `backend_url` is used:

```js
const backend_url = "https://your-backend.onrender.com";
```

### 2.Deploy Frontend(React + Vite)

- Push your frontend code to GitHub

- Visit vercel.com or netify.com

- Import your GitHub repository

- Build Command: npm run build

- Output Directory: dist

- Add environment variable (Backend website's URL)
Click Deploy

| Make sure the frontend is pointing to the deployed backend's URL.

## 📝 TODO

- [ ] 💾 Add persistent watchlist using `localStorage` or backend DB
- [ ] 💾 Add cloud storage for User
- [ ] 🎨 Improve UI/UX for mobile screens
- [ ] 🔍 Add search feature by movie title and keywords







