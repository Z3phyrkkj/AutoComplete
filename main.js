/**
 * Quest Helper - Entry Point
    * Autor: Z3phyrkkj
 *
 * Estrutura de carregamento:
 * main.js → loader.js → [config.js, utils.js, ui.js, quest-processor.js]
 */

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
