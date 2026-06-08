import path from "path"
import fs from "fs"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

function coursesManifestPlugin() {
  const generateManifest = () => {
    try {
      const coursesDir = path.resolve(__dirname, 'public/courses');
      if (!fs.existsSync(coursesDir)) {
        fs.mkdirSync(coursesDir, { recursive: true });
      }

      const folders: any[] = [];
      const pdfs: any[] = [];

      function traverse(currentPath: string, parentId: string | null) {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });

        // Sort items so order is deterministic
        items.sort((a, b) => a.name.localeCompare(b.name));

        for (const item of items) {
          const fullPath = path.join(currentPath, item.name);
          const relPath = path.relative(coursesDir, fullPath);
          const cleanId = relPath.replace(/\\/g, '/').replace(/\//g, '-');

          if (item.isDirectory()) {
            const folderStats = fs.statSync(fullPath);
            folders.push({
              id: cleanId,
              name: item.name,
              parent_id: parentId,
              allow_contributions: false,
              created_at: folderStats.birthtime.toISOString(),
              created_by: '0',
              updated_at: folderStats.mtime.toISOString()
            });

            // Recurse
            traverse(fullPath, cleanId);
          } else if (item.isFile() && item.name.toLowerCase().endsWith('.pdf')) {
            const fileStats = fs.statSync(fullPath);
            const servePath = '/courses/' + relPath.replace(/\\/g, '/');
            pdfs.push({
              id: cleanId,
              folder_id: parentId,
              file_name: item.name,
              file_path: servePath,
              file_size: fileStats.size,
              uploaded_by: '0',
              created_at: fileStats.birthtime.toISOString()
            });
          }
        }
      }

      traverse(coursesDir, null);

      const manifestPath = path.resolve(__dirname, 'src/courses-manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify({ folders, pdfs }, null, 2), 'utf-8');
      console.log(`[manifest-plugin] Successfully updated courses manifest with ${folders.length} folders and ${pdfs.length} PDFs.`);
    } catch (err) {
      console.error('[manifest-plugin] Error generating manifest:', err);
    }
  };

  return {
    name: 'courses-manifest-plugin',
    buildStart() {
      generateManifest();
    },
    configureServer(server: any) {
      const coursesPath = path.resolve(__dirname, 'public/courses');
      server.watcher.add(coursesPath);
      
      const handleEvent = (filePath: string) => {
        if (filePath.includes('public/courses')) {
          generateManifest();
        }
      };

      server.watcher.on('add', handleEvent);
      server.watcher.on('unlink', handleEvent);
      server.watcher.on('change', handleEvent);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), coursesManifestPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase') || id.includes('supabase-js')) {
              return 'supabase';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
