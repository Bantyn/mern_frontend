import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';
import tailwindcss from '@tailwindcss/vite'
import { env } from 'process';

// Get your LAN IP
function getLocalIP() {
  const network = os.networkInterfaces();
  for (let key in network) {
    for (let iface of network[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address || env.VITE_REACT_APP_API_URL;
      }
    }
  }
  
  return "localhost";
}

const LOCAL_IP = getLocalIP();

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: LOCAL_IP, 
    port: 5173,     
    strictPort: true,
  },
});
