/**
 * Quest Helper Utils
 */
const QuestHelperUtils = {
    formatTime(seconds) {
        if (!seconds || seconds < 0) return '0s';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    },

    showMessage(text, type = 'info', statusElements) {
        if (statusElements) {
            statusElements.text.textContent = text;
            statusElements.dot.className = 'qh-status-dot' + (type === 'success' ? ' ok' : type === 'error' ? ' err' : '');
        }
    },

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    getModule(filter) {
        try {
            let wpRequire = webpackChunkdiscord_app?.push([[Symbol()], {}, r => r]);
            webpackChunkdiscord_app?.pop();
            return Object.values(wpRequire?.c || {}).find(filter)?.exports;
        } catch (e) {
            console.debug('[Quest Helper] Erro ao acessar webpack:', e);
            return null;
        }
    },

    loadStores() {
        let ApplicationStreamingStore, RunningGameStore, QuestsStore, ChannelStore, GuildChannelStore, FluxDispatcher, api;

        ApplicationStreamingStore = this.getModule(x => x?.exports?.Z?.__proto__?.getStreamerActiveStreamMetadata)?.Z;

        if (!ApplicationStreamingStore) {
            ApplicationStreamingStore = this.getModule(x => x?.exports?.A?.__proto__?.getStreamerActiveStreamMetadata)?.A;
            RunningGameStore = this.getModule(x => x?.exports?.Ay?.getRunningGames)?.Ay;
            QuestsStore = this.getModule(x => x?.exports?.A?.__proto__?.getQuest)?.A;
            ChannelStore = this.getModule(x => x?.exports?.A?.__proto__?.getAllThreadsForParent)?.A;
            GuildChannelStore = this.getModule(x => x?.exports?.Ay?.getSFWDefaultChannel)?.Ay;
            FluxDispatcher = this.getModule(x => x?.exports?.h?.__proto__?.flushWaitQueue)?.h;
            api = this.getModule(x => x?.exports?.Bo?.get)?.Bo;
        } else {
            RunningGameStore = this.getModule(x => x?.exports?.ZP?.getRunningGames)?.ZP;
            QuestsStore = this.getModule(x => x?.exports?.Z?.__proto__?.getQuest)?.Z;
            ChannelStore = this.getModule(x => x?.exports?.Z?.__proto__?.getAllThreadsForParent)?.Z;
            GuildChannelStore = this.getModule(x => x?.exports?.ZP?.getSFWDefaultChannel)?.ZP;
            FluxDispatcher = this.getModule(x => x?.exports?.Z?.__proto__?.flushWaitQueue)?.Z;
            api = this.getModule(x => x?.exports?.tn?.get)?.tn;
        }

        return { ApplicationStreamingStore, RunningGameStore, QuestsStore, ChannelStore, GuildChannelStore, FluxDispatcher, api };
    }
};

export default QuestHelperUtils;
