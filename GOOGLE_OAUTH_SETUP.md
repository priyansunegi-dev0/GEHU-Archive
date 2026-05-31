# Google OAuth Setup Guide for StudyHub Admin

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click the project dropdown at the top
4. Click "NEW PROJECT"
5. Enter project name: "StudyHub Admin"
6. Click "CREATE"

---

## Step 2: Enable Google+ API

1. In the left sidebar, go to **APIs & Services > Library**
2. Search for **"Google+ API"**
3. Click on it and press **"ENABLE"**

---

## Step 3: Create OAuth Credentials

1. Go to **APIs & Services > Credentials**
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"OAuth client ID"**
4. You may see a warning to create an OAuth consent screen first:
   - Click **"CREATE CONSENT SCREEN"**
   - Choose **"External"** user type
   - Fill form:
     - App name: "StudyHub Admin"
     - User support email: prriiyansunegi@gmail.com
     - Developer contact: prriiyansunegi@gmail.com
   - Click **"SAVE AND CONTINUE"**
   - Skip optional scopes, click **"SAVE AND CONTINUE"**
   - Review and click **"BACK TO DASHBOARD"**

5. Now go back to **Credentials** and click **"+ CREATE CREDENTIALS"**
6. Select **"OAuth client ID"**
7. Choose **Application type: "Web application"**
8. Under **Authorized redirect URIs**, add these URLs:
   ```
   https://biohqytxjfrcfzozfcsh.supabase.co/auth/v1/callback
   http://localhost:5173/admin/callback
   ```
9. Click **"CREATE"**

---

## Step 4: Copy Your Credentials

After creating, you'll see:
- **Client ID**: Copy this
- **Client Secret**: Copy this

---

## Step 5: Add to Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication > Providers**
4. Find **Google** and click to expand
5. Enable it (toggle ON)
6. Paste your **Client ID** in the first field
7. Paste your **Client Secret** in the second field
8. Click **"Save"**

---

## Step 6: Add Allowed User Email

1. In Supabase, go to **Authentication > User Management**
2. Later when user signs in, you'll need to add them to allow list

---

## Your Credentials
- **Supabase URL**: https://biohqytxjfrcfzozfcsh.supabase.co
- **Supabase Anon Key**: (Already in .env)
- **Redirect URL (Local Dev)**: http://localhost:5173/admin/callback
- **Redirect URL (Production)**: https://biohqytxjfrcfzozfcsh.supabase.co/auth/v1/callback

---

## Testing

1. Start your dev server: `npm run dev`
2. Go to http://localhost:5173/admin
3. Click "Sign in with Google"
4. Sign in with: prriiyansunegi@gmail.com
5. You'll be redirected to admin dashboard
