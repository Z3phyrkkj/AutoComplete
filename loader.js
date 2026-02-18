/**
 * Quest Helper Loader
 * Arquivo principal que carrega todos os módulos e inicia a aplicação
 */
import QuestHelperConfig from './config.js';
import QuestHelperUtils from './utils.js';
import QuestHelperUI from './ui.js';
import QuestHelperProcessor from './quest-processor.js';

if (window.questHelperInstance) {
    console.log('[Quest Helper] Já está em execução');
} else {
    window.questHelperInstance = true;

    console.log('[Quest Helper] Inicializando...');

    const stores = QuestHelperUtils.loadStores();

    if (!stores.QuestsStore || !stores.api) {
        console.error('[Quest Helper] Não foi possível encontrar os stores necessários.');
        alert('Quest Helper: Não foi possível inicializar. O Discord pode ter atualizado.');
        window.questHelperInstance = false;
    } else {
        console.log('[Quest Helper] Stores carregados com sucesso.');

        const state = {
            isDragging: false,
            isRunning: false,
            quests: [],
            offsetX: 0,
            offsetY: 0,
            refreshTimer: null,
            isApp: typeof DiscordNative !== 'undefined'
        };

        function getActiveQuests() {
            try {
                const questsMap = stores.QuestsStore.quests;
                if (!questsMap || typeof questsMap.values !== 'function') return [];
                return [...questsMap.values()].filter(quest => {
                    try {
                        return quest.userStatus?.enrolledAt &&
                            !quest.userStatus?.completedAt &&
                            new Date(quest.config.expiresAt).getTime() > Date.now() &&
                            QuestHelperConfig.supportedTasks.some(task => {
                                const tasks = quest.config.taskConfig?.tasks || quest.config.taskConfigV2?.tasks || {};
                                return tasks[task] != null;
                            });
                    } catch { return false; }
                });
            } catch (e) {
                console.error('[Quest Helper] Erro ao obter quests:', e);
                return [];
            }
        }

        function updateBadge(count) {
            const badge = document.querySelector('.qh-nav-badge');
            if (!badge) return;
            if (count > 0) {
                badge.textContent = count > 9 ? '9+' : count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }

        function updateStats(quests, elements) {
            const total = quests.length;
            const active = quests.filter(q => !q.userStatus?.completedAt).length;
            const inProgress = quests.filter(q => {
                try {
                    const taskConfig = q.config.taskConfig || q.config.taskConfigV2;
                    const taskName = QuestHelperConfig.supportedTasks.find(x => taskConfig?.tasks?.[x] != null);
                    return q.userStatus?.progress?.[taskName]?.value > 0;
                } catch { return false; }
            }).length;

            elements.statTotal.textContent = total;
            elements.statActive.textContent = active;
            elements.statProgress.textContent = inProgress;
            elements.startBtn.disabled = total === 0 || state.isRunning;
            updateBadge(total);
        }

        function refreshQuests(elements) {
            state.quests = getActiveQuests();
            updateStats(state.quests, elements);
            QuestHelperUI.updateQuestList(state.quests, QuestHelperUI.taskIcons, QuestHelperUtils);

            QuestHelperUtils.showMessage(
                state.quests.length ? `${state.quests.length} quest${state.quests.length > 1 ? 's' : ''} disponível` : 'Nenhuma quest ativa',
                state.quests.length ? 'info' : 'error',
                { text: elements.statusText, dot: elements.statusDot }
            );
        }

        function handleCallback(type, data, elements) {
            switch (type) {
                case 'message':
                    QuestHelperUtils.showMessage(data.text, data.type, { text: elements.statusText, dot: elements.statusDot });
                    break;
                case 'refresh':
                    refreshQuests(elements);
                    break;
                case 'buttonState':
                    elements.startBtn.disabled = data.disabled;
                    elements.startBtn.innerHTML = `${data.text}`;
                    break;
            }
        }

        QuestHelperUI.injectStyles();

        const navIcon = QuestHelperUI.createNavIcon(() => {
            document.getElementById('qhPanel')?.classList.remove('qh-minimized');
            document.getElementById('qhNavIcon')?.classList.remove('active');
            refreshQuests(elements);
        });

        if (!navIcon) {
            console.error('[Quest Helper] Barra de navegação não encontrada');
            window.questHelperInstance = false;
        } else {
            const elements = QuestHelperUI.createPanel(
                () => {
                    const callback = (type, data) => {
                        if (type === 'message') {
                            handleCallback('message', { text: data[0], type: data[1] }, elements);
                        } else if (type === 'refresh') {
                            refreshQuests(elements);
                        } else if (type === 'buttonState') {
                            handleCallback('buttonState', data, elements);
                        }
                    };
                    QuestHelperProcessor.processQuests(state, stores, callback);
                },
                () => {
                    refreshQuests(elements);
                    QuestHelperUtils.showMessage('Lista atualizada', 'success', { text: elements.statusText, dot: elements.statusDot });
                },
                () => {
                    elements.panel.classList.add('qh-minimized');
                    navIcon.element.classList.add('active');
                },
                () => {
                    if (state.refreshTimer) clearInterval(state.refreshTimer);
                    navIcon.observer.disconnect();
                    elements.panel.remove();
                    navIcon.element.remove();
                    window.questHelperInstance = false;
                },
                (els) => {
                    els.dragHandle.addEventListener('mousedown', (e) => {
                        if (e.target.closest('button')) return;
                        state.isDragging = true;
                        els.panel.classList.add('qh-dragging');
                        const rect = els.panel.getBoundingClientRect();
                        state.offsetX = e.clientX - rect.left;
                        state.offsetY = e.clientY - rect.top;
                        e.preventDefault();
                    });

                    document.addEventListener('mousemove', (e) => {
                        if (!state.isDragging) return;
                        const x = Math.max(0, Math.min(window.innerWidth - els.panel.offsetWidth, e.clientX - state.offsetX));
                        const y = Math.max(0, Math.min(window.innerHeight - els.panel.offsetHeight, e.clientY - state.offsetY));
                        els.panel.style.left = x + 'px';
                        els.panel.style.top = y + 'px';
                        els.panel.style.right = 'auto';
                    });

                    document.addEventListener('mouseup', () => {
                        if (state.isDragging) {
                            state.isDragging = false;
                            els.panel.classList.remove('qh-dragging');
                        }
                    });

                    document.addEventListener('click', (e) => {
                        if (!els.panel.contains(e.target) && !navIcon.element.contains(e.target) && !els.panel.classList.contains('qh-minimized')) {
                            els.panel.classList.add('qh-minimized');
                            navIcon.element.classList.add('active');
                        }
                    });
                }
            );

            refreshQuests(elements);
            state.refreshTimer = setInterval(() => refreshQuests(elements), QuestHelperConfig.refreshInterval);

            console.log('[Quest Helper] Pronto!');
        }
    }
}
