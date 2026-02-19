<div align="center">
  <img src="https://i.imgur.com/nYORXlL.png" alt="Discord Logo" width="120" />
  
  <h1 style="font-size:2.5em; color:#5865F2; margin-bottom:0.2em;">AutoComplete</h1>
  <p style="font-size:1.2em; color:#23272A; font-weight:bold;">
    Automatize missões do Discord (games e vídeos) de forma rápida e prática!
  </p>
  <br>
  <a href="CREDS.md" style="font-size:1.1em; color:#5865F2; font-weight:bold;">
    → Créditos & Referências
  </a>
</div>

---

<div align="center">
  <img src="https://img.shields.io/badge/Discord-Automation-blue?style=for-the-badge&logo=discord" />
  <img src="https://img.shields.io/badge/Status-Experimental-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</div>

---

## ⚠️ Aviso Importante

> **Não me responsabilizo em caso de ban em sua conta.**
>
> Por mais que não tenha nenhum banimento apurado, teoricamente usar automações assim é contra a ToS do Discord. Use por sua conta e risco.

---

## 🚀 Como usar?

1. **Instale a versão de testes do Discord:**  
   https://ptb.discord.com/

2. **Abra o DevTools:**  
   Após instalar o app, faça login em sua conta.  
   Pressione `Ctrl + Shift + I` para abrir o console/DevTools.

3. **Permita colar scripts:**  
   No DevTools, digite:

   ```
   allow pasting
   ```

4. **Cole o script abaixo:**

```js
(async function() {
    "use strict";

    const GITHUB_USER = 'Z3phyrkkj';
    const GITHUB_REPO = 'AutoComplete';
    const GITHUB_BRANCH = 'main';
    const CDN_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}`;

    try {
        console.log('[Quest Helper] Carregando módulos via CDN...');

        await import(`${CDN_BASE}/config.js`);
        console.log('[Quest Helper] Config carregado!');

        await import(`${CDN_BASE}/utils.js`);
        console.log('[Quest Helper] Utils carregado!');

        await import(`${CDN_BASE}/ui.js`);
        console.log('[Quest Helper] UI carregado!');

        await import(`${CDN_BASE}/quest-processor.js`);
        console.log('[Quest Helper] Quest Processor carregado com sucesso!');

        await import(`${CDN_BASE}/loader.js`);
        console.log('[Quest Helper] Loader principal executado com sucesso!');

    } catch (error) {
        console.error('[Quest Helper] Erro ao carregar módulos:', error);
        alert('Quest Helper: Erro ao carregar de ' + CDN_BASE + '\n\nVerifique se todos os arquivos estão no repositório GitHub.');
    }
})();
```

---

## ✅ Finalizando

Após isso, basta aceitar uma missão e, na UI, clicar em **Start**.

<img src="AcceptMission.png" alt="Aceitar Missão" width="500" />