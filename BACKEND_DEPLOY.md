# Render Backend Deployment

## Quick Deploy to Render.com

1. Go to [render.com](https://render.com) and sign up/login

2. Click "New +" → "Web Service"

3. Connect your GitHub repository: `https://github.com/DavidJayaraj01/MIABC`

4. Configure:
   - **Name**: miabc-backend
   - **Environment**: Python 3
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free

5. Add Environment Variables (Optional):
   - Click "Advanced" → "Add Environment Variable"
   - Add any needed vars

6. Click "Create Web Service"

7. Wait 2-3 minutes for deployment

8. Copy your backend URL (e.g., `https://miabc-backend.onrender.com`)

## Update Frontend API URL

After backend is deployed, update the frontend:

1. Edit `frontend/database/api.js`
2. Change API_BASE_URL to your Render URL
3. Rebuild and redeploy frontend:
   ```bash
   cd frontend
   npx expo export:web
   netlify deploy --prod
   ```

## Alternative: Railway.app

1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Select your repo
4. Configure:
   - Root Directory: `backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Deploy and copy URL

---

## Your Deployed URLs

**Frontend**: https://miabc-app-2026.netlify.app
**Backend**: (deploy following steps above)

Once backend is deployed, update frontend API URL and redeploy!
