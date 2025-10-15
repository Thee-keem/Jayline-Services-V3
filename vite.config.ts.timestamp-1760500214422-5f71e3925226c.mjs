// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [react()],
  esbuild: {
    target: "es2020",
    format: "esm"
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react"
    ],
    exclude: []
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "@/components": resolve(__vite_injected_original_dirname, "./src/components"),
      "@/ui": resolve(__vite_injected_original_dirname, "./src/components/ui"),
      "@/layout": resolve(__vite_injected_original_dirname, "./src/components/layout"),
      "@/layouts": resolve(__vite_injected_original_dirname, "./src/layouts"),
      "@/sections": resolve(__vite_injected_original_dirname, "./src/components/sections"),
      "@/forms": resolve(__vite_injected_original_dirname, "./src/components/forms"),
      "@/hooks": resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@/lib": resolve(__vite_injected_original_dirname, "./src/lib"),
      "@/types": resolve(__vite_injected_original_dirname, "./src/types"),
      "@/utils": resolve(__vite_injected_original_dirname, "./src/utils")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"]
        }
      }
    },
    target: "es2020",
    minify: "esbuild",
    chunkSizeWarningLimit: 500
  },
  server: {
    port: 3e3,
    open: false,
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 4173
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGVzYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICAgIGZvcm1hdDogJ2VzbScsXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdyZWFjdCcsXG4gICAgICAncmVhY3QtZG9tJyxcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICdmcmFtZXItbW90aW9uJyxcbiAgICAgICdsdWNpZGUtcmVhY3QnLFxuICAgIF0sXG4gICAgZXhjbHVkZTogW10sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAnQC9jb21wb25lbnRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzJyksXG4gICAgICAnQC91aSc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cy91aScpLFxuICAgICAgJ0AvbGF5b3V0JzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzL2xheW91dCcpLFxuICAgICAgJ0AvbGF5b3V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbGF5b3V0cycpLFxuICAgICAgJ0Avc2VjdGlvbnMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMvc2VjdGlvbnMnKSxcbiAgICAgICdAL2Zvcm1zJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzL2Zvcm1zJyksXG4gICAgICAnQC9ob29rcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcbiAgICAgICdAL2xpYic6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbGliJyksXG4gICAgICAnQC90eXBlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdHlwZXMnKSxcbiAgICAgICdAL3V0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIHVpOiBbJ2ZyYW1lci1tb3Rpb24nLCAnbHVjaWRlLXJlYWN0J10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcGVuOiBmYWxzZSxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA0MTczLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUM7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQy9CLGdCQUFnQixRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3JELFFBQVEsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxNQUNoRCxZQUFZLFFBQVEsa0NBQVcseUJBQXlCO0FBQUEsTUFDeEQsYUFBYSxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUMvQyxjQUFjLFFBQVEsa0NBQVcsMkJBQTJCO0FBQUEsTUFDNUQsV0FBVyxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLE1BQ3RELFdBQVcsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDM0MsU0FBUyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUN2QyxXQUFXLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzNDLFdBQVcsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ2pELElBQUksQ0FBQyxpQkFBaUIsY0FBYztBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
