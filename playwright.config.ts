import { defineConfig, devices } from '@playwright/test';

/**
 * Ver documentación de configuración de Playwright:
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Ejecutar pruebas en paralelo para ahorrar tiempo */
  fullyParallel: true,
  /* Impedir focos accidentales (.only) en integración continua */
  forbidOnly: !!process.env.CI,
  /* Reintentos en caso de fallo */
  retries: process.env.CI ? 2 : 0,
  /* Limitar trabajadores en CI */
  workers: process.env.CI ? 1 : undefined,
  /* Formato del reporte de resultados */
  reporter: 'html',
  /* Configuración compartida de las pruebas */
  use: {
    /* Puerto por defecto de tu aplicación local Next.js */
    baseURL: 'http://localhost:3000',
    /* Capturar trazas al reintentar para depuración */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Proyectos configurados para los navegadores basados en tus preferencias */
  projects: [
    {
      name: 'Brave Engine (Chromium)',
      use: { 
        ...devices['Desktop Chrome'],
        // NOTA: Para utilizar tu propio navegador Brave instalado localmente en Windows,
        // puedes descomentar la siguiente línea ajustando la ruta si es necesario:
        // executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
      },
    },

    {
      name: 'Zen Engine (Firefox)',
      use: { 
        ...devices['Desktop Firefox'],
        // NOTA: Para probar específicamente sobre Zen Browser en lugar del motor estándar de Firefox:
        // executablePath: 'C:\\Users\\<TuUsuario>\\AppData\\Local\\Programs\\zen\\zen.exe',
      },
    },

    /* Emulación para asegurar que el diseño responsivo de JovenPro sea impecable */
    {
      name: 'Mobile Chrome (Android)',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari (iPhone)',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
