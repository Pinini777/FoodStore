import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command, isPreview }) => ({
  // en GitHub Pages la pagina queda en /FoodStore/, en desarrollo en /
  base: command === "build" || isPreview ? "/FoodStore/" : "/",
  build: {
    rollupOptions: {
      // cada pagina es un html distinto
      input: {
        index: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/pages/auth/login/login.html"),
        registro: resolve(__dirname, "src/pages/auth/registro/registro.html"),
        adminHome: resolve(__dirname, "src/pages/admin/home/home.html"),
        clientHome: resolve(__dirname, "src/pages/client/home/home.html"),
      },
    },
  },
}));
