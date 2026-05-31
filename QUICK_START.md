# StudyHub Quick Start Guide

## For Admins

### Access Admin Dashboard
```
1. Open StudyHub website
2. Click "Admin" button (top right, dark with lock icon)
3. Click "Sign in with Google"
4. Sign in with: prriiyansunegi@gmail.com
5. You're logged in!
```

### Create a Course Folder
```
1. Go to Admin Dashboard (/admin/dashboard)
2. Click "Create Folder" button
3. Enter folder name (e.g., "Data Structures")
4. Click "Create Folder"
5. ✓ New folder appears in tree
```

### Create a Subfolder
```
1. Click on a folder in the tree
2. Folder details appear on right
3. Click "Add Subfolder" button
4. Enter subfolder name
5. ✓ Subfolder appears nested under parent
```

### Allow User Uploads
```
1. Select a folder
2. Click "Contributions" toggle button
3. Green unlock = Users can upload
4. Red lock = Users cannot upload
5. Toggle on/off as needed
```

### Delete a Folder
```
1. Select folder in tree
2. Click "Delete Folder" button
3. Confirm deletion
4. ✓ Folder and all contents removed
```

---

## For Users

### Upload a PDF
```
1. Click "Contribute" in navigation
2. Select folder from dropdown
3. Click upload area or drag PDF
4. Click "Upload PDF" button
5. ✓ Success message appears
6. PDF shows in Recent Uploads
```

### Browse Materials
```
1. Go to Contribute page (/contribute)
2. See "Active Folders" in sidebar
3. Click folder dropdown to see all
4. Each folder shows what's available
5. View recent uploads at bottom
```

### Find Courses
```
1. Go to Home page
2. See "Course Materials" section
3. Shows all available folders
4. Click any folder to browse
5. Upload from Contribute page
```

---

## Navigation

### Header Menu
- **StudyHub** - Logo, click to go home
- **Home** - Course materials list
- **Doubts** - Q&A section
- **About** - About page
- **Contribute** - PDF upload
- **Admin** - Admin login (dark button)
- **Dark/Light Toggle** - Theme switcher

### Admin Routes
- `/admin` - Login page
- `/admin/callback` - OAuth redirect (auto)
- `/admin/dashboard` - Admin panel

### User Routes
- `/` - Home
- `/contribute` - Upload materials
- `/doubts` - Q&A
- `/about` - Info
- `/admin` - Admin login

---

## Common Tasks

### Change Upload Permissions
```
Admin Dashboard → Select Folder → Toggle "Contributions"
```

### Create Course Structure
```
Create Folder → Create Subfolders → Toggle Permissions
Example: Data Structures → Lectures, Assignments, Exams
```

### Upload Study Materials
```
Contribute Page → Select Folder → Upload PDF
```

### Find Materials
```
Home Page → See Course Folders → Visit Contribute → Browse Materials
```

### Remove Old Course
```
Admin Dashboard → Select Folder → Click Delete → Confirm
(Removes all subfolders and PDFs too)
```

---

## Troubleshooting

### "Can't log in as admin"
- Check you're using: `prriiyansunegi@gmail.com`
- Only this email can access admin
- Try signing out first, then back in

### "Can't upload PDF"
- Make sure folder has green "Contributions" toggle
- Check file is a valid PDF
- File should be under 50MB

### "Can't see folders"
- Refresh page to reload from database
- Make sure you're logged in
- Check folder permissions

### "Upload fails"
- Try a smaller file
- Check file format (must be PDF)
- Verify internet connection
- Check browser console for errors

---

## File Upload Guidelines

✓ PDF files only  
✓ Maximum 50MB per file  
✓ Original or properly credited content  
✓ Relevant to course  
✓ Non-duplicate materials  

✗ Non-PDF files  
✗ Oversized files  
✗ Copyrighted without permission  
✗ Unrelated content  
✗ Malicious files  

---

## Tips & Tricks

### For Admins
- Create folders before enabling contributions
- Use clear, descriptive folder names
- Organize with subfolders for large courses
- Disable contributions if folder is archived
- Check recent uploads regularly

### For Users
- Check upload guidelines first
- Use descriptive PDF names
- Upload high-quality materials
- One material per PDF file
- Share notes within folder topics

### For Everyone
- Use dark mode for night studying
- Search your browser history to find pages
- Bookmark Contribute page for easy access
- Share StudyHub link with classmates
- Provide feedback via Doubts page

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click folder | Select in tree |
| Drag PDF | Upload file |
| Escape | Close dialog |
| Refresh | Reload page |
| Ctrl+B or Cmd+B | Toggle sidebar |

---

## Database Info

### Where Data is Stored
- **Folders** - Supabase PostgreSQL
- **PDFs** - Supabase Storage bucket "pdfs"
- **Metadata** - PDF references in database
- **All Encrypted** - Supabase security

### Data Privacy
- Only authenticated users can access
- Admin can see all folders
- Users see only upload-enabled folders
- Can delete own uploads
- Data is secure in Supabase

---

## Support

### Docs Available
- `GOOGLE_OAUTH_SETUP.md` - Google setup
- `ADMIN_AUTH_COMPLETE.md` - Auth guide
- `FOLDER_MANAGEMENT_GUIDE.md` - System guide
- `IMPLEMENTATION_SUMMARY.md` - Full docs

### Quick Links
- Home: `/`
- Admin: `/admin`
- Contribute: `/contribute`
- Help/Doubts: `/doubts`

---

## What's Next?

### Soon
- Download PDFs
- Search materials
- Rate materials
- Comment on PDFs

### Later
- Analytics
- User profiles
- Moderation
- Advanced search
- Collections

---

## One-Minute Setup

```
Admin Login:
1. Click Admin button
2. Sign with Google
3. Go to dashboard

Create Course:
1. Click Create Folder
2. Type name
3. Done!

User Upload:
1. Go to Contribute
2. Select folder
3. Upload PDF
4. Done!
```

---

Done! You now have a complete, working StudyHub platform.

**Questions?** Check the detailed guides or explore the interface.

**Ready to deploy?** Follow IMPLEMENTATION_SUMMARY.md deployment section.

**Enjoy!** 📚
