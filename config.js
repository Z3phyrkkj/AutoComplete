/**
 * Quest Helper Configuration
 */
const QuestHelperConfig = {
    version: '0.1.3',
    supportedTasks: ["WATCH_VIDEO", "PLAY_ON_DESKTOP", "STREAM_ON_DESKTOP", "PLAY_ACTIVITY", "WATCH_VIDEO_ON_MOBILE"],
    taskLabels: {
        WATCH_VIDEO: 'Vídeo',
        PLAY_ON_DESKTOP: 'Desktop',
        STREAM_ON_DESKTOP: 'Stream',
        PLAY_ACTIVITY: 'Atividade',
        WATCH_VIDEO_ON_MOBILE: 'Mobile'
    },
    refreshInterval: 30000,
    heartbeatInterval: 20000,
    maxRetries: 3,
    logoUrl: 'https://i.imgur.com/nYORXlL.png'
};

export default QuestHelperConfig;
