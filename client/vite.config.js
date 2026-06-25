import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
      plugins: [react(), tailwindcss()],
      server : {
        proxy:{
            "/todo" :{
                target :"http://localhost:8000"
            }
        }
      }

})