# MiABC App - Deployment Guide

## 🌐 Current Running URLs

### Development URLs
- **Web App**: http://localhost:8082
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### To Share Development Version
1. Find your local IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 10.12.48.140)

2. Share these URLs on your local network:
   - Web App: `http://YOUR_IP:8082`
   - Backend: `http://YOUR_IP:8000`

---

## 📦 Deployment Options

### Option 1: Expo Publish (Easiest - Free)
Share app via QR code for mobile testing:

```bash
cd frontend
npx expo publish
```

This creates a shareable link like: `exp://exp.host/@username/miabc-app`

### Option 2: Web Deployment (Recommended for URL sharing)

#### Build for Web
```bash
cd frontend
npm run build:web
```
This creates a `web-build` folder with static files.

#### Deploy to Netlify (Free)
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd frontend
   netlify deploy --dir=web-build --prod
   ```

3. You'll get a URL like: `https://miabc-app.netlify.app`

#### Deploy to Vercel (Free)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

#### Deploy to GitHub Pages (Free)
1. Create GitHub repository
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/miabc-app"
   ```
3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Add deploy script:
   ```json
   "deploy:github": "npm run build:web && gh-pages -d web-build"
   ```
5. Deploy:
   ```bash
   npm run deploy:github
   ```

### Option 3: Mobile App Stores

#### Android (Google Play)
```bash
cd frontend
eas build --platform android
```

#### iOS (Apple App Store)
```bash
cd frontend
eas build --platform ios
```

Note: Requires EAS account. Sign up at: https://expo.dev

---

## 🔧 Backend Deployment

### For production, deploy backend to:

#### Render.com (Free tier available)
1. Create account at render.com
2. Create new Web Service
3. Connect GitHub repo
4. Build command: `pip install -r requirements.txt`
5. Start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Railway.app (Free tier available)
1. Create account at railway.app
2. Create new project from GitHub
3. Add service > Backend
4. Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Heroku
```bash
# Add Procfile in backend folder
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

Then deploy via Heroku CLI or GitHub integration.

---

## 🎯 Quick Start for Sharing

### Fastest Way (Local Network Only):
```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm run web
```

Share: `http://YOUR_LOCAL_IP:8082`

### Production-Ready URL:
```bash
# Build web app
cd frontend
npm run build:web

# Deploy to Netlify
netlify deploy --dir=web-build --prod
```

You'll get: `https://your-app-name.netlify.app`

---

## 📝 Environment Variables

Before deploying, update API URL in `frontend/database/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.com';
```

---

## ✅ Pre-Deployment Checklist

- [ ] Backend running without errors
- [ ] All 271 words loaded in database
- [ ] Images loading correctly
- [ ] Audio playback working
- [ ] Firebase credentials configured (if using Firebase)
- [ ] API endpoints tested
- [ ] Web build successful
- [ ] Update API_BASE_URL to production URL

---

## 🆘 Troubleshooting

### Images Not Loading
- Check Firebase Storage CORS settings
- Verify image URLs are accessible
- Check network/firewall settings

### Audio Not Playing
- Ensure proper MIME types on server
- Check CORS headers for audio files
- Verify audio URLs are HTTPS

### Backend Errors
- Check database file exists
- Verify all dependencies installed
- Check port not in use

---

## 📞 Support
For issues, check the logs:
- Backend: Console where `uvicorn` is running
- Frontend: Browser DevTools Console (F12)
