const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://web.superfrete.com/",
    viewportWidth: 1366,
    viewportHeight: 768,
    chromeWebSecurity: false,
    
    setupNodeEvents(on, config) {
      // Configuração para abrir o Chrome em modo anônimo
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--incognito'); // Abre em modo anônimo
        }
        return launchOptions;
      });
    },
  },
});
