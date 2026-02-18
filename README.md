<div align="center">
  <img src="https://i.imgur.com/nYORXlL.png" alt="Discord Logo" width="120" />
  
  <h1 style="font-size:2.5em; color:#5865F2; margin-bottom:0.2em;">AutoComplete</h1>
  <p style="font-size:1.2em; color:#23272A; font-weight:bold;">Automatize missões do Discord (games e vídeos) de forma rápida e prática!</p>
  <br>
  <a href="CREDS.md" style="font-size:1.1em; color:#5865F2; font-weight:bold;">→ Créditos & Referências</a>
</div>

---

<div align="center">
  <img src="https://img.shields.io/badge/Discord-Automation-blue?style=for-the-badge&logo=discord" />
  <img src="https://img.shields.io/badge/Status-Experimental-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</div>

---

## ⚠️ <span style="color:#F04747">Aviso Importante</span>

> **Não me responsabilizo em caso de ban em sua conta.**
>
> Por mais que não tenha nenhum banimento apurado, teoricamente usar automações assim é contra a ToS do Discord. Use por sua conta e risco.

---

## 🚀 <span style="color:#57F287">Como usar?</span>

<ol>
  <li><b>Instale a versão de testes do Discord:</b><br>
    <a href="https://ptb.discord.com/">Discord PTB</a>
  </li>
  <br>
  <li><b>Abra o DevTools:</b><br>
    Após instalar o app, faça login em sua conta.<br>
    Pressione <code>Ctrl + Shift + I</code> para abrir o console/DevTools.
  </li>
  <br>
  <li><b>Permita colar scripts:</b><br>
    No DevTools, digite:
    <br>
    <pre style="background:#23272A; color:#57F287; padding:8px; border-radius:6px;">allow pasting</pre>
  </li>
  <br>
  <li><b>Cole o script abaixo:</b><br>
    <br>
    <pre style="background:#23272A; color:#5865F2; padding:12px; border-radius:8px; font-size:0.95em;">
(function() {
    "use strict";

    const GITHUB_USER = 'Z3phyrkkj';
    const GITHUB_REPO = 'AutoComplete';
    const GITHUB_BRANCH = 'main';
    const CDN_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}`;

    async function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        });
    }

    async function initQuestHelper() {
        try {
            console.log('[Quest Helper] Carregando módulos via CDN...');

            await loadScript(`${CDN_BASE}/config.js`);
            console.log('[Quest Helper] Config carregado');

            await loadScript(`${CDN_BASE}/utils.js`);
            console.log('[Quest Helper] Utils carregado');

            await loadScript(`${CDN_BASE}/ui.js`);
            console.log('[Quest Helper] UI carregado');

            await loadScript(`${CDN_BASE}/quest-processor.js`);
            console.log('[Quest Helper] Quest Processor carregado');

            await loadScript(`${CDN_BASE}/loader.js`);
            console.log('[Quest Helper] Loader principal executado');

        } catch (error) {
            console.error('[Quest Helper] Erro ao carregar módulos:', error);
            alert('Quest Helper: Erro ao carregar de ' + CDN_BASE + '\n\nVerifique se todos os arquivos estão no repositório GitHub.');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuestHelper);
    } else {
        initQuestHelper();
    }
})();
    </pre>
  </li>
</ol>

---

## ✅ <span style="color:#57F287">Finalizando</span>

Após isso, basta aceitar uma missão e, na UI, clicar em <b>Start</b>.

<img src="AcceptMission.png" alt="Aceitar Missão" width="500" />

---