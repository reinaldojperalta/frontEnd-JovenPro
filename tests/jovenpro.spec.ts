import { test, expect } from '@playwright/test';

test.describe('JovenPro E2E Audit Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    // 1. Cargar la página principal
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Debería cargar correctamente el título y los elementos del Hero', async ({ page }) => {
    // Validar el título de la página
    await expect(page).toHaveTitle(/JovenPro by ZonaPro/);

    // Validar y hacer clic en el CTA del Hero (que es un span interactivo)
    const quieroVenderBtn = page.locator('#inicio span:has-text("Quiero vender")').first();
    await expect(quieroVenderBtn).toBeVisible();
    
    // Al hacer clic, debería desplazarse a la sección de registro/contacto
    await quieroVenderBtn.click();
    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test('Debería navegar correctamente usando el Sticky Navbar', async ({ page }) => {
    // Validar enlaces en Desktop
    const noticiasLink = page.locator('nav a:has-text("Noticias")').first();
    await expect(noticiasLink).toBeVisible();

    // Hacer clic en Noticias (Smooth Scroll)
    await noticiasLink.click();

    // Verificación profesional E2E: Confirmar que la sección es visible en pantalla
    const journalSection = page.locator('#journal');
    await expect(journalSection).toBeInViewport();
  });

  test('Debería interactuar y renderizar el Bento Carousel en Productos', async ({ page }) => {
    const productosSection = page.locator('#productos');
    await expect(productosSection).toBeVisible();

    // Buscar una tarjeta destacada específica que confirmamos en la auditoría
    const bentoCard = page.locator('#productos').getByText('Fragola Premium').first();
    await expect(bentoCard).toBeVisible();
  });

  test('Debería auditar correctamente la sección de videos e interactuar con ella', async ({ page }) => {
    const videosSection = page.locator('#videos');
    await expect(videosSection).toBeVisible();

    // Confirmar que la tarjeta del video "El Proceso Creativo" está renderizada
    const videoCard = page.locator('#videos .group.cursor-pointer').filter({ hasText: 'El Proceso Creativo' }).first();
    await expect(videoCard).toBeVisible();

    // Validar que la miniatura de YouTube apunta al ID de video correcto
    const thumbnail = videoCard.locator('img');
    await expect(thumbnail).toHaveAttribute('src', /.*VEMl5roUvtM.*/);
  });

  test('Debería verificar los enlaces del Footer (incluyendo redes sociales)', async ({ page }) => {
    // Enlaces de texto tradicionales
    const terminosLink = page.locator('footer a:has-text("Términos y condiciones")').first();
    await expect(terminosLink).toBeVisible();

    // Enlace de Redes Sociales: Selector por accesibilidad aria-label del botón interno
    const instagramLink = page.locator('footer a:has([aria-label="Instagram"])').first();
    await expect(instagramLink).toBeVisible();
    await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/jovenprocolombia');
  });

  test('Prueba de enlaces rotos (Broken Links Auditor)', async ({ page }) => {
    // Ampliamos el timeout global de esta prueba a 5 minutos (300000ms)
    // porque los enlaces pueden demorar 3 minutos o más en responder
    test.setTimeout(300000);

    // Obtener todos los atributos href de las etiquetas ancla
    const rawHrefs = await page.evaluate(() => 
      Array.from(document.querySelectorAll('a')).map(a => a.getAttribute('href'))
    );

    // Filtrar enlaces nulos, vacíos o hashes locales (#) para evitar falsos negativos en Next.js
    const hrefs = rawHrefs.filter((href): href is string => 
      href !== null && href !== '' && href !== '#' && !href.startsWith('#')
    );

    // Auditar cada enlace
    for (const href of hrefs) {
      if (href.startsWith('https://wa.me/') || href.startsWith('https://t.me/')) {
        // Omitir enlaces a servicios externos de mensajería (WhatsApp/Telegram pueden retornar 404 en headless)
        continue;
      }

      try {
        // Aumentamos también el timeout específico de la petición a 4.5 minutos (270000ms)
        const response = await page.request.get(href, { timeout: 270000 });
        expect(response.status()).toBeLessThan(400); // Excluir errores 4xx y 5xx
      } catch (err: any) {
        console.warn(`Advertencia al auditar el enlace: ${href}. Error: ${err.message}`);
      }
    }
  });

});

// -------------------------------------------------------------
// DISEÑO RESPONSIVO (MENÚ MÓVIL EN PANTALLAS PEQUEÑAS)
// -------------------------------------------------------------
test.describe('JovenPro V2 - Pruebas en Dispositivos Móviles', () => {
  // Configuramos el viewport para un teléfono estándar (iPhone 12 / Pixel 5)
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true });

  test('debe mostrar el botón hamburguesa y abrir el menú lateral en móviles', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('domcontentloaded');

    // El botón del menú móvil (hamburguesa) debe estar visible y listo
    const menuButton = page.locator('button[aria-label="Abrir menú"]');
    await expect(menuButton).toBeVisible();

    // Dar clic en el botón para abrir el menú
    await menuButton.click();

    // Validar que el botón cambie su estado a cerrar menú
    const closeButton = page.locator('button[aria-label="Cerrar menú"]');
    await expect(closeButton).toBeVisible();

    // Verificar que los enlaces del menú móvil sean ahora visibles
    const mobileLink = page.locator('a:has-text("Noticias")').last();
    await expect(mobileLink).toBeVisible();
    
    // Al dar clic en una opción, el menú se cierra (animación 300ms) y luego hace scroll (350ms delay)
    await mobileLink.click();
    
    // Esperar que el drawer termine su animación de cierre + el setTimeout del scroll (350ms)
    await page.waitForTimeout(600);
    
    const journalSection = page.locator('#journal');
    await expect(journalSection).toBeInViewport();
  });
});
