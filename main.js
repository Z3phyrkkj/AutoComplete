/**
 * Quest Helper - Entry Point
 * 
 * IMPORTANTE: Usa cdn.jsdelivr.net (na whitelist da CSP do Discord)
 * em vez de GitHub Raw que viola a CSP
 * 
 * Estrutura de carregamento:
 * main.js → loader.js → [config.js, utils.js, ui.js, quest-processor.js]
 */

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