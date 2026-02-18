/**
 * Quest Helper - Entry Point
 * 
 * Este arquivo carrega o loader principal do GitHub que por sua vez
 * carrega todos os módulos necessários.
 * 
 * Estrutura de carregamento:
 * main.js → loader.js → [config.js, utils.js, ui.js, quest-processor.js]
 */

(function() {
    "use strict";

    const GITHUB_RAW = 'https://raw.githubusercontent.com/seu-usuario/AutoComplete/main';

    async function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async function initQuestHelper() {
        try {
            console.log('[Quest Helper] Carregando módulos...');

            await loadScript(`${GITHUB_RAW}/config.js`);
            console.log('[Quest Helper] Config carregado');

            await loadScript(`${GITHUB_RAW}/utils.js`);
            console.log('[Quest Helper] Utils carregado');

            await loadScript(`${GITHUB_RAW}/ui.js`);
            console.log('[Quest Helper] UI carregado');

            await loadScript(`${GITHUB_RAW}/quest-processor.js`);
            console.log('[Quest Helper] Quest Processor carregado');

            await loadScript(`${GITHUB_RAW}/loader.js`);
            console.log('[Quest Helper] Loader principal executado');

        } catch (error) {
            console.error('[Quest Helper] Erro ao carregar módulos:', error);
            alert('Quest Helper: Erro ao carregar os módulos. Verifique a conexão e tente novamente.');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuestHelper);
    } else {
        initQuestHelper();
    }
})();