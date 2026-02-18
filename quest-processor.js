/**
 * Quest Helper - Quest Processor
 * Lógica de completar as quests
 */
window.QuestHelperProcessor = {
    async processQuests(state, stores, callback) {
        if (state.isRunning) return;

        const quests = [...state.quests];
        if (quests.length === 0) {
            callback('message', 'Nenhuma quest para processar', 'error');
            return;
        }

        state.isRunning = true;
        callback('buttonState', { disabled: true, text: '↻ Processando...' });

        const processNext = async () => {
            const quest = quests.shift();
            if (!quest) {
                state.isRunning = false;
                callback('buttonState', { disabled: false, text: '▶ Iniciar Quests' });
                callback('message', 'Todas as quests concluídas!', 'success');
                callback('refresh');
                return;
            }

            try {
                const pid = Math.floor(Math.random() * 30000) + 1000;
                const applicationId = quest.config.application.id;
                const questName = quest.config.messages.questName;
                const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2;
                const taskName = window.QuestHelperConfig.supportedTasks.find(x => taskConfig.tasks[x] != null);
                const secondsNeeded = taskConfig.tasks[taskName].target;
                let secondsDone = quest.userStatus?.progress?.[taskName]?.value ?? 0;

                callback('message', `Processando: ${questName}...`, 'info');

                if (taskName === "WATCH_VIDEO" || taskName === "WATCH_VIDEO_ON_MOBILE") {
                    await this._processVideo(quest, taskName, secondsNeeded, callback, stores.api);
                } else if (taskName === "PLAY_ON_DESKTOP") {
                    await this._playOnDesktop(quest, taskName, secondsNeeded, pid, applicationId, callback, stores, processNext);
                    return;
                } else if (taskName === "STREAM_ON_DESKTOP") {
                    await this._streamOnDesktop(quest, taskName, secondsNeeded, pid, applicationId, callback, stores, processNext);
                    return;
                } else if (taskName === "PLAY_ACTIVITY") {
                    await this._playActivity(quest, taskName, secondsNeeded, callback, stores);
                }
            } catch (e) {
                console.error('[Quest Helper] Erro ao processar quest:', e);
                callback('message', `Erro: ${e.message}`, 'error');
            }
            processNext();
        };

        processNext();
    },

    async _processVideo(quest, taskName, secondsNeeded, callback, api) {
        const maxFuture = 10, speed = 7, interval = 1;
        const enrolledAt = new Date(quest.userStatus.enrolledAt).getTime();
        let completed = false;

        while (true) {
            const maxAllowed = Math.floor((Date.now() - enrolledAt) / 1000) + maxFuture;
            const timestamp = Math.min(secondsNeeded, Math.floor((Date.now() - enrolledAt) / 1000) + speed);

            if (maxAllowed - (secondsNeeded - timestamp) >= speed) {
                const res = await api.post({
                    url: `/quests/${quest.id}/video-progress`,
                    body: { timestamp: Math.min(secondsNeeded, timestamp + Math.random()) }
                });
                completed = res.body.completed_at != null;
                const secondsDone = Math.min(secondsNeeded, timestamp);
                callback('message', `${quest.config.messages.questName}: ${window.QuestHelperUtils.formatTime(secondsDone)}/${window.QuestHelperUtils.formatTime(secondsNeeded)}`, 'info');
                callback('refresh');
            }

            if (timestamp >= secondsNeeded) break;
            await window.QuestHelperUtils.sleep(interval * 1000);
        }

        if (!completed) {
            await api.post({ url: `/quests/${quest.id}/video-progress`, body: { timestamp: secondsNeeded } });
        }

        callback('message', `${quest.config.messages.questName} concluída!`, 'success');
    },

    async _playOnDesktop(quest, taskName, secondsNeeded, pid, applicationId, callback, stores, processNext) {
        const isApp = typeof DiscordNative !== 'undefined';
        if (!isApp) {
            callback('message', 'Use o app desktop!', 'error');
            processNext();
            return;
        }

        try {
            const res = await stores.api.get({ url: `/applications/public?application_ids=${applicationId}` });
            const appData = res.body[0];
            const exeName = appData.executables.find(x => x.os === "win32").name.replace(">", "");

            const fakeGame = {
                cmdLine: `C:\\Program Files\\${appData.name}\\${exeName}`,
                exeName,
                exePath: `c:/program files/${appData.name.toLowerCase()}/${exeName}`,
                hidden: false,
                isLauncher: false,
                id: applicationId,
                name: appData.name,
                pid: pid,
                pidPath: [pid],
                processName: appData.name,
                start: Date.now(),
            };

            const realGames = stores.RunningGameStore.getRunningGames();
            const realGetRunningGames = stores.RunningGameStore.getRunningGames;
            const realGetGameForPID = stores.RunningGameStore.getGameForPID;

            stores.RunningGameStore.getRunningGames = () => [fakeGame];
            stores.RunningGameStore.getGameForPID = (pid) => fakeGame;

            stores.FluxDispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", removed: realGames, added: [fakeGame], games: [fakeGame] });

            const handler = (data) => {
                const progress = quest.config.configVersion === 1
                    ? data.userStatus.streamProgressSeconds
                    : Math.floor(data.userStatus.progress.PLAY_ON_DESKTOP.value);

                callback('message', `${quest.config.messages.questName}: ${window.QuestHelperUtils.formatTime(progress)}/${window.QuestHelperUtils.formatTime(secondsNeeded)}`, 'info');
                callback('refresh');

                if (progress >= secondsNeeded) {
                    stores.RunningGameStore.getRunningGames = realGetRunningGames;
                    stores.RunningGameStore.getGameForPID = realGetGameForPID;
                    stores.FluxDispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", removed: [fakeGame], added: [], games: [] });
                    stores.FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
                    callback('message', `${quest.config.messages.questName} concluída!`, 'success');
                    processNext();
                }
            };

            stores.FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
        } catch (e) {
            callback('message', `Erro: ${e.message}`, 'error');
            processNext();
        }
    },

    async _streamOnDesktop(quest, taskName, secondsNeeded, pid, applicationId, callback, stores, processNext) {
        const isApp = typeof DiscordNative !== 'undefined';
        if (!isApp) {
            callback('message', 'Use o app desktop!', 'error');
            processNext();
            return;
        }

        try {
            const realFunc = stores.ApplicationStreamingStore.getStreamerActiveStreamMetadata;
            stores.ApplicationStreamingStore.getStreamerActiveStreamMetadata = () => ({ id: applicationId, pid, sourceName: null });

            const handler = (data) => {
                const progress = quest.config.configVersion === 1
                    ? data.userStatus.streamProgressSeconds
                    : Math.floor(data.userStatus.progress.STREAM_ON_DESKTOP.value);

                callback('message', `${quest.config.messages.questName}: ${window.QuestHelperUtils.formatTime(progress)}/${window.QuestHelperUtils.formatTime(secondsNeeded)}`, 'info');
                callback('refresh');

                if (progress >= secondsNeeded) {
                    stores.ApplicationStreamingStore.getStreamerActiveStreamMetadata = realFunc;
                    stores.FluxDispatcher.unsubscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
                    callback('message', `${quest.config.messages.questName} concluída!`, 'success');
                    processNext();
                }
            };

            stores.FluxDispatcher.subscribe("QUESTS_SEND_HEARTBEAT_SUCCESS", handler);
        } catch (e) {
            callback('message', `Erro: ${e.message}`, 'error');
            processNext();
        }
    },

    async _playActivity(quest, taskName, secondsNeeded, callback, stores) {
        try {
            const channelId = stores.ChannelStore.getSortedPrivateChannels()[0]?.id ??
                Object.values(stores.GuildChannelStore.getAllGuilds()).find(x => x?.VOCAL?.length > 0)?.VOCAL[0]?.channel?.id;

            if (!channelId) {
                callback('message', 'Nenhum canal de voz disponível', 'error');
                return;
            }

            const streamKey = `call:${channelId}:1`;
            while (true) {
                const res = await stores.api.post({ url: `/quests/${quest.id}/heartbeat`, body: { stream_key: streamKey, terminal: false } });
                const progress = res.body.progress.PLAY_ACTIVITY.value;

                callback('message', `${quest.config.messages.questName}: ${window.QuestHelperUtils.formatTime(progress)}/${window.QuestHelperUtils.formatTime(secondsNeeded)}`, 'info');
                callback('refresh');

                if (progress >= secondsNeeded) {
                    await stores.api.post({ url: `/quests/${quest.id}/heartbeat`, body: { stream_key: streamKey, terminal: true } });
                    break;
                }

                await window.QuestHelperUtils.sleep(window.QuestHelperConfig.heartbeatInterval);
            }

            callback('message', `${quest.config.messages.questName} concluída!`, 'success');
        } catch (e) {
            callback('message', `Erro: ${e.message}`, 'error');
        }
    }
};
