/**
 * Quest Helper UI Module
 */
import QuestHelperConfig from './config.js';

const LOGO_URL = QuestHelperConfig.logoUrl;
const LOGO_NAV = `<img src="${LOGO_URL}" alt="Quest Helper" style="width:20px;height:20px;display:block;object-fit:contain;border-radius:3px;">`;
const LOGO_HDR = `<img src="${LOGO_URL}" alt="Quest Helper" style="width:22px;height:22px;display:block;object-fit:contain;border-radius:4px;">`;

const LU = {
    play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    refreshCw: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
    minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    x: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    video: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
    monitor: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    cast: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 12a9 9 0 0 1 8 8"/><path d="M2 16a5 5 0 0 1 4 4"/><line x1="2" y1="20" x2="2.01" y2="20"/></svg>`,
    activity: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    smartphone: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
    layers: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    zap: `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
};

const taskIcons = {
    WATCH_VIDEO: LU.video,
    PLAY_ON_DESKTOP: LU.monitor,
    STREAM_ON_DESKTOP: LU.cast,
    PLAY_ACTIVITY: LU.activity,
    WATCH_VIDEO_ON_MOBILE: LU.smartphone
};

function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

        :root {
            --qh-font: 'Nunito', 'gg sans', 'Noto Sans', sans-serif;
            --qh-base: rgba(8, 9, 14, 0.72);
            --qh-surface: rgba(255, 255, 255, 0.038);
            --qh-surface-hov: rgba(255, 255, 255, 0.065);
            --qh-border: rgba(255, 255, 255, 0.072);
            --qh-border-strong: rgba(255, 255, 255, 0.13);
            --qh-shine: rgba(255, 255, 255, 0.055);
            --qh-rim: rgba(160, 175, 255, 0.12);
            --qh-shadow-out: 6px 6px 16px rgba(0,0,0,0.55), -3px -3px 10px rgba(255,255,255,0.025);
            --qh-shadow-in: inset 3px 3px 8px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(255,255,255,0.03);
            --qh-accent: #7c88ff;
            --qh-accent-dim: rgba(124, 136, 255, 0.22);
            --qh-accent-glow: rgba(124, 136, 255, 0.35);
            --qh-accent-fg: #a8b1ff;
            --qh-ok: #4ade80;
            --qh-ok-dim: rgba(74, 222, 128, 0.18);
            --qh-err: #f87171;
            --qh-err-dim: rgba(248, 113, 113, 0.18);
            --qh-text: rgba(240, 242, 255, 0.92);
            --qh-muted: rgba(180, 185, 220, 0.55);
            --qh-r-panel: 22px;
            --qh-r-card: 16px;
            --qh-r-sm: 10px;
            --qh-blur: blur(28px) saturate(160%);
            --qh-ease: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .qh-nav-icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 32px; height: 32px; padding: 0; margin: 0 1px;
            border-radius: 8px; cursor: pointer; background: transparent;
            transition: background 0.18s var(--qh-ease), box-shadow 0.18s var(--qh-ease), transform 0.15s var(--qh-ease);
            position: relative; flex-shrink: 0; vertical-align: middle;
        }
        .qh-nav-icon img { width: 20px; height: 20px; display: block; object-fit: contain; border-radius: 3px; opacity: 0.75; transition: opacity 0.18s, transform 0.18s var(--qh-ease); }
        .qh-nav-icon:hover img { opacity: 1; transform: scale(1.06); }
        .qh-nav-icon.active img { opacity: 1; }
        .qh-nav-icon:hover { background: rgba(255,255,255,0.08); box-shadow: 0 4px 14px rgba(0,0,0,0.35); }
        .qh-nav-icon.active { background: var(--qh-accent-dim); box-shadow: 0 0 0 1px var(--qh-rim), 0 6px 18px var(--qh-accent-glow); }
        .qh-nav-badge {
            position: absolute; top: 5px; right: 5px;
            background: linear-gradient(135deg, #f87171, #ef4444); color: #fff;
            font-family: var(--qh-font); font-size: 9px; font-weight: 800;
            min-width: 16px; height: 16px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            padding: 0 3px; border: 2px solid #1a1b22;
            box-shadow: 0 3px 8px rgba(239,68,68,0.4);
            animation: qhBadgePop 0.35s var(--qh-ease);
        }
        @keyframes qhBadgePop {
            0% { transform: scale(0) rotate(-20deg); }
            65% { transform: scale(1.15) rotate(4deg); }
            100% { transform: scale(1) rotate(0); }
        }

        .qh-panel {
            position: fixed; top: 66px; right: 18px; width: 354px;
            font-family: var(--qh-font); font-size: 13px; color: var(--qh-text); z-index: 9999;
            border-radius: var(--qh-r-panel); overflow: hidden;
            background: var(--qh-base); backdrop-filter: var(--qh-blur); -webkit-backdrop-filter: var(--qh-blur);
            border: 1px solid var(--qh-border);
            box-shadow: 0 0 0 0.5px var(--qh-rim), 0 32px 64px -16px rgba(0,0,0,0.8), 0 8px 24px -8px rgba(0,0,0,0.6), inset 0 1px 0 var(--qh-shine);
            transition: opacity 0.22s var(--qh-ease), transform 0.28s var(--qh-ease);
            animation: qhPanelIn 0.32s var(--qh-ease);
        }
        .qh-panel.qh-dragging { opacity: 0.92; transition: none; box-shadow: 0 48px 80px -16px rgba(0,0,0,0.9), 0 0 0 0.5px var(--qh-rim); }
        .qh-panel.qh-minimized { display: none; }
        @keyframes qhPanelIn {
            from { opacity: 0; transform: translateY(-14px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .qh-panel::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 70%, transparent 95%);
            border-radius: var(--qh-r-panel) var(--qh-r-panel) 0 0; pointer-events: none;
        }

        .qh-header {
            display: flex; align-items: center; gap: 11px; padding: 16px 18px 15px;
            cursor: move; user-select: none; border-bottom: 1px solid var(--qh-border);
            background: linear-gradient(180deg, rgba(255,255,255,0.028) 0%, transparent 100%);
        }
        .qh-logo {
            width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,0.06);
            display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.15);
            flex-shrink: 0; transition: transform 0.25s var(--qh-ease), box-shadow 0.25s var(--qh-ease); overflow: hidden;
        }
        .qh-logo img { width: 22px; height: 22px; object-fit: contain; border-radius: 4px; display: block; }
        .qh-header:hover .qh-logo {
            transform: rotate(8deg) scale(1.04);
            box-shadow: 0 10px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .qh-title-block { flex: 1; min-width: 0; }
        .qh-title { font-size: 15px; font-weight: 800; letter-spacing: 0.2px; color: var(--qh-text); line-height: 1.2; }
        .qh-version { font-size: 10px; font-weight: 600; color: var(--qh-muted); letter-spacing: 0.5px; margin-top: 2px; text-transform: uppercase; }
        .qh-hdr-actions { display: flex; gap: 5px; }
        .qh-hdr-btn {
            background: var(--qh-surface); border: 1px solid var(--qh-border); color: var(--qh-muted);
            width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.18s var(--qh-ease); box-shadow: var(--qh-shadow-out);
        }
        .qh-hdr-btn:hover {
            background: var(--qh-surface-hov); color: var(--qh-text); border-color: var(--qh-border-strong);
            transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,0.45), -1px -1px 4px rgba(255,255,255,0.025);
        }

        .qh-content { padding: 16px 16px 0; }
        .qh-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
        .qh-stat {
            background: var(--qh-surface); border: 1px solid var(--qh-border); border-radius: var(--qh-r-sm);
            padding: 12px 8px; text-align: center; box-shadow: var(--qh-shadow-in);
            transition: background 0.18s, border-color 0.18s, transform 0.18s var(--qh-ease);
        }
        .qh-stat:hover { background: var(--qh-surface-hov); border-color: var(--qh-border-strong); transform: translateY(-2px); }
        .qh-stat-val { font-size: 24px; font-weight: 800; color: var(--qh-text); line-height: 1.1; letter-spacing: -0.5px; }
        .qh-stat-lbl { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--qh-muted); margin-top: 3px; }

        .qh-list {
            max-height: 330px; overflow-y: auto; margin-bottom: 14px; padding-right: 2px;
            scrollbar-width: thin; scrollbar-color: rgba(124,136,255,0.2) transparent;
        }
        .qh-list::-webkit-scrollbar { width: 4px; }
        .qh-list::-webkit-scrollbar-track { background: transparent; }
        .qh-list::-webkit-scrollbar-thumb { background: rgba(124,136,255,0.25); border-radius: 4px; }
        .qh-list::-webkit-scrollbar-thumb:hover { background: rgba(124,136,255,0.45); }

        .qh-card {
            background: var(--qh-surface); border: 1px solid var(--qh-border); border-radius: var(--qh-r-card);
            padding: 14px; margin-bottom: 9px;
            box-shadow: 4px 4px 12px rgba(0,0,0,0.45), -2px -2px 8px rgba(255,255,255,0.022), inset 0 1px 0 rgba(255,255,255,0.05);
            transition: all 0.22s var(--qh-ease); animation: qhCardIn 0.3s var(--qh-ease) both;
        }
        .qh-card:nth-child(2) { animation-delay: 0.04s; }
        .qh-card:nth-child(3) { animation-delay: 0.08s; }
        .qh-card:nth-child(4) { animation-delay: 0.12s; }
        @keyframes qhCardIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .qh-card:hover {
            background: var(--qh-surface-hov); border-color: rgba(124, 136, 255, 0.28); transform: translateY(-2px);
            box-shadow: 6px 6px 18px rgba(0,0,0,0.55), -2px -2px 8px rgba(255,255,255,0.028), 0 0 0 1px rgba(124,136,255,0.15), inset 0 1px 0 rgba(255,255,255,0.07);
        }

        .qh-card-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .qh-game-icon {
            width: 34px; height: 34px; border-radius: 9px;
            background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
            border: 1px solid var(--qh-border-strong); display: flex; align-items: center; justify-content: center;
            font-size: 13px; font-weight: 800; color: var(--qh-muted); text-transform: uppercase;
            box-shadow: inset 2px 2px 5px rgba(0,0,0,0.4), inset -1px -1px 3px rgba(255,255,255,0.02); flex-shrink: 0;
        }
        .qh-game-name {
            flex: 1; font-size: 13.5px; font-weight: 700; color: var(--qh-text);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .qh-task-chip {
            display: inline-flex; align-items: center; gap: 5px; padding: 4px 9px;
            border-radius: 20px; font-size: 10px; font-weight: 800; letter-spacing: 0.4px; text-transform: uppercase;
            color: var(--qh-accent-fg); background: var(--qh-accent-dim); border: 1px solid rgba(124,136,255,0.3);
            box-shadow: 0 3px 8px rgba(124,136,255,0.15); white-space: nowrap; flex-shrink: 0;
        }
        .qh-task-chip svg { opacity: 0.85; }

        .qh-progress-row {
            display: flex; justify-content: space-between; font-size: 10.5px;
            font-weight: 600; color: var(--qh-muted); margin-bottom: 7px;
        }
        .qh-bar-track { height: 5px; border-radius: 6px; background: rgba(0,0,0,0.35); box-shadow: inset 1px 1px 3px rgba(0,0,0,0.5); overflow: hidden; }
        .qh-bar-fill {
            height: 100%; border-radius: 6px;
            background: linear-gradient(90deg, #6272f0, #a0acff);
            box-shadow: 0 0 10px rgba(124,136,255,0.5);
            transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .qh-footer { display: flex; gap: 9px; padding: 0 16px 16px; }
        .qh-btn {
            flex: 1; padding: 11px 12px; border: none; border-radius: var(--qh-r-sm);
            font-family: var(--qh-font); font-size: 13px; font-weight: 800; cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 7px; letter-spacing: 0.3px;
            transition: all 0.2s var(--qh-ease);
        }
        .qh-btn-primary {
            background: linear-gradient(145deg, #5a6aee, #7c88ff); color: rgba(255,255,255,0.95);
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 8px 22px rgba(100,116,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15);
        }
        .qh-btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 14px 32px rgba(100,116,255,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
            filter: brightness(1.08);
        }
        .qh-btn-primary:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 12px rgba(100,116,255,0.35);
        }
        .qh-btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
        .qh-btn-icon {
            flex: none; width: 44px; background: var(--qh-surface);
            color: var(--qh-muted); border: 1px solid var(--qh-border); box-shadow: var(--qh-shadow-out);
        }
        .qh-btn-icon:hover {
            background: var(--qh-surface-hov); color: var(--qh-text); border-color: var(--qh-border-strong);
            transform: translateY(-2px) rotate(45deg); box-shadow: 0 8px 20px rgba(0,0,0,0.45);
        }

        .qh-status {
            display: flex; align-items: center; gap: 8px; padding: 10px 18px;
            border-top: 1px solid var(--qh-border); background: rgba(0,0,0,0.18);
            font-size: 11.5px; font-weight: 600; color: var(--qh-muted);
        }
        .qh-status-dot {
            width: 7px; height: 7px; border-radius: 50%; background: var(--qh-accent);
            box-shadow: 0 0 8px var(--qh-accent-glow);
            animation: qhPulse 2.4s ease-in-out infinite; flex-shrink: 0;
        }
        .qh-status-dot.ok { background: var(--qh-ok); box-shadow: 0 0 8px rgba(74,222,128,0.4); }
        .qh-status-dot.err { background: var(--qh-err); box-shadow: 0 0 8px rgba(248,113,113,0.4); animation: none; }
        @keyframes qhPulse {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.25); }
        }

        .qh-empty {
            padding: 44px 20px; text-align: center; color: var(--qh-muted);
            display: flex; flex-direction: column; align-items: center; gap: 11px; animation: qhFadeIn 0.3s;
        }
        .qh-empty svg { opacity: 0.28; }
        .qh-empty-title { font-size: 13px; font-weight: 700; color: rgba(200,205,240,0.45); }
        .qh-empty-sub { font-size: 11px; font-weight: 600; color: var(--qh-muted); opacity: 0.7; }
        @keyframes qhFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

function findNavBar() {
    const selectors = [
        '[class*="guilds"] ~ div [class*="toolbar"]',
        '[class*="guilds"] + div [class*="children"] [class*="toolbar"]',
        '[class*="sidebar"] + div [class*="children"] [class*="toolbar"]',
        '[class*="chat"] > div > div [class*="toolbar"]',
        '[class*="base"] [class*="toolbar"]',
        '[class*="guilds"] + div [class*="toolbar"]',
        '[class*="chat"] [class*="toolbar"]'
    ];
    for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) return el;
    }
    return document.querySelector('[class*="toolbar"]') || document.querySelector('[class*="children"]');
}

function createNavIcon(onIconClick) {
    const navBar = findNavBar();
    if (!navBar) return null;

    const iconContainer = document.createElement('div');
    iconContainer.className = 'qh-nav-icon';
    iconContainer.id = 'qhNavIcon';
    iconContainer.innerHTML = LOGO_NAV;
    iconContainer.setAttribute('aria-label', 'Quest Helper');
    iconContainer.setAttribute('role', 'button');

    const badge = document.createElement('span');
    badge.className = 'qh-nav-badge';
    badge.style.display = 'none';
    iconContainer.appendChild(badge);

    iconContainer.addEventListener('click', onIconClick);

    function insertIcon() {
        const currentNavBar = findNavBar();
        if (!currentNavBar || currentNavBar.contains(iconContainer)) return;
        const profileIcon = currentNavBar.querySelector('[class*="avatar"], [class*="account"], [class*="help"], [class*="question"]');
        if (profileIcon) currentNavBar.insertBefore(iconContainer, profileIcon);
        else currentNavBar.appendChild(iconContainer);
    }

    insertIcon();
    const observer = new MutationObserver(() => insertIcon());
    observer.observe(document.body, { childList: true, subtree: true });

    return { element: iconContainer, badge, observer };
}

function createPanel(onStart, onRefresh, onMinimize, onClose, onDrag) {
    const panel = document.createElement('div');
    panel.className = 'qh-panel';
    panel.id = 'qhPanel';
    panel.innerHTML = `
        <div class="qh-header" id="qhDragHandle">
            <div class="qh-logo">${LOGO_HDR}</div>
            <div class="qh-title-block">
                <div class="qh-title">Quest Helper</div>
                <div class="qh-version">v${QuestHelperConfig.version}</div>
            </div>
            <div class="qh-hdr-actions">
                <button class="qh-hdr-btn" id="qhMinimizeBtn" title="Minimizar">${LU.minus}</button>
                <button class="qh-hdr-btn" id="qhCloseBtn" title="Fechar">${LU.x}</button>
            </div>
        </div>

        <div class="qh-content">
            <div class="qh-stats">
                <div class="qh-stat">
                    <div class="qh-stat-val" id="qhStatTotal">0</div>
                    <div class="qh-stat-lbl">Total</div>
                </div>
                <div class="qh-stat">
                    <div class="qh-stat-val" id="qhStatActive">0</div>
                    <div class="qh-stat-lbl">Ativas</div>
                </div>
                <div class="qh-stat">
                    <div class="qh-stat-val" id="qhStatProgress">0</div>
                    <div class="qh-stat-lbl">Progresso</div>
                </div>
            </div>

            <div class="qh-list" id="qhQuestList">
                <div class="qh-empty">${LU.layers}<div class="qh-empty-title">Carregando...</div></div>
            </div>
        </div>

        <div class="qh-footer">
            <button class="qh-btn qh-btn-primary" id="qhStartBtn" disabled>${LU.play} Iniciar Quests</button>
            <button class="qh-btn qh-btn-icon" id="qhRefreshBtn" title="Atualizar">${LU.refreshCw}</button>
        </div>

        <div class="qh-status">
            <span class="qh-status-dot" id="qhStatusDot"></span>
            <span id="qhStatusText">Inicializando...</span>
        </div>
    `;
    document.body.appendChild(panel);

    const elements = {
        panel,
        dragHandle: document.getElementById('qhDragHandle'),
        minimizeBtn: document.getElementById('qhMinimizeBtn'),
        closeBtn: document.getElementById('qhCloseBtn'),
        startBtn: document.getElementById('qhStartBtn'),
        refreshBtn: document.getElementById('qhRefreshBtn'),
        questList: document.getElementById('qhQuestList'),
        statusText: document.getElementById('qhStatusText'),
        statusDot: document.getElementById('qhStatusDot'),
        statTotal: document.getElementById('qhStatTotal'),
        statActive: document.getElementById('qhStatActive'),
        statProgress: document.getElementById('qhStatProgress')
    };

    elements.minimizeBtn.addEventListener('click', onMinimize);
    elements.closeBtn.addEventListener('click', onClose);
    elements.startBtn.addEventListener('click', onStart);
    elements.refreshBtn.addEventListener('click', onRefresh);

    onDrag(elements);

    return elements;
}

function updateQuestList(quests, taskIcons, utils) {
    const questList = document.getElementById('qhQuestList');
    if (!questList) return;

    if (quests.length === 0) {
        questList.innerHTML = `
            <div class="qh-empty">
                ${LU.layers}
                <div class="qh-empty-title">Nenhuma quest disponível</div>
                <div class="qh-empty-sub">Clique em ↻ para atualizar</div>
            </div>`;
        return;
    }

    questList.innerHTML = quests.map((quest) => {
        try {
            const taskConfig = quest.config.taskConfig || quest.config.taskConfigV2;
            const taskName = QuestHelperConfig.supportedTasks.find(x => taskConfig?.tasks?.[x] != null);
            if (!taskName) return '';
            const secondsNeeded = taskConfig.tasks[taskName].target;
            const secondsDone = quest.userStatus?.progress?.[taskName]?.value || 0;
            const progress = Math.min(100, Math.round((secondsDone / secondsNeeded) * 100));
            const letter = quest.config.application.name?.charAt(0).toUpperCase() || '?';
            const icon = taskIcons[taskName] || LU.zap;
            const label = QuestHelperConfig.taskLabels[taskName] || taskName;

            return `
            <div class="qh-card">
                <div class="qh-card-top">
                    <div class="qh-game-icon">${letter}</div>
                    <div class="qh-game-name" title="${quest.config.messages?.questName || ''}">
                        ${quest.config.messages?.questName || 'Quest'}
                    </div>
                    <span class="qh-task-chip">${icon} ${label}</span>
                </div>
                <div class="qh-progress-row">
                    <span>${quest.config.application.name || 'Desconhecido'}</span>
                    <span>${utils.formatTime(secondsDone)} / ${utils.formatTime(secondsNeeded)}</span>
                </div>
                <div class="qh-bar-track">
                    <div class="qh-bar-fill" style="width:${progress}%"></div>
                </div>
            </div>`;
        } catch (e) { return ''; }
    }).join('');
}

const QuestHelperUI = {
    injectStyles,
    createNavIcon,
    createPanel,
    updateQuestList,
    taskIcons,
    LU
};

export default QuestHelperUI;
