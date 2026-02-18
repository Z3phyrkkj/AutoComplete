# Quest Helper - Modular Architecture

Versão modularizada do Quest Helper com separação de responsabilidades e fácil manutenção.

## 📁 Estrutura de Arquivos

```
AutoComplete/
├── main.js                    # Entry point (chama o loader)
├── loader.js                  # Carrega todos os módulos
├── config.js                  # Configurações globais
├── utils.js                   # Funções auxiliares e carregamento de stores
├── ui.js                      # Interface e estilos
├── quest-processor.js         # Lógica de processar quests
└── README.md                  # Este arquivo
```

## 🔄 Fluxo de Carregamento

1. **main.js** → Script de entrada que carrega os módulos do GitHub
2. **loader.js** → Carrega config, utils, ui, quest-processor e inicia a aplicação
3. **config.js** → Define versão, tasks suportadas, URLs, etc
4. **utils.js** → Funções auxiliares e carregamento de stores do Discord
5. **ui.js** → Renderização da interface, estilos CSS, componentes
6. **quest-processor.js** → Lógica de completar quests

## 🚀 Como Usar

### Desenvolvimento Local
```javascript
// Em main.js, descomente:
const GITHUB_RAW = 'http://localhost:8000';

// Servir os arquivos localmente
python -m http.server 8000
```

### Production (GitHub)
1. Crie um repositório no GitHub: `seu-usuario/AutoComplete`
2. Faça upload de todos os arquivos
3. Use em main.js:
```javascript
const GITHUB_RAW = 'https://raw.githubusercontent.com/seu-usuario/AutoComplete/main';
```

## 📦 Módulos

### config.js
Armazena todas as configurações:
- `version` - Versão do app
- `supportedTasks` - Tasks que o script completa
- `taskLabels` - Labels em português
- `refreshInterval` - Intervalo de refresh das quests
- `heartbeatInterval` - Intervalo de heartbeat

### utils.js
Exporta `QuestHelperUtils`:
- `formatTime()` - Formata segundos em "Xm Ys"
- `showMessage()` - Mostra status
- `sleep()` - Delay assíncrono
- `getModule()` - Acessa webpack do Discord
- `loadStores()` - Carrega stores necessários

### ui.js
Exporta `QuestHelperUI`:
- `injectStyles()` - Injeta CSS
- `createNavIcon()` - Cria ícone na barra de navegação
- `createPanel()` - Cria painel principal
- `updateQuestList()` - Atualiza lista de quests
- `taskIcons` - Ícones SVG
- `LU` - Lucide icons

### quest-processor.js
Exporta `QuestHelperProcessor`:
- `processQuests()` - Função principal que processa quests
- `_processVideo()` - Processa WATCH_VIDEO
- `_playOnDesktop()` - Processa PLAY_ON_DESKTOP
- `_streamOnDesktop()` - Processa STREAM_ON_DESKTOP
- `_playActivity()` - Processa PLAY_ACTIVITY

### loader.js
- Carrega todos os módulos
- Valida stores do Discord
- Inicializa estado
- Cria UI
- Configura event listeners
- Inicia loop de refresh

## 🔧 Desenvolvendo Novos Módulos

Todos os módulos são exportados em `window.QuestHelper*`:

```javascript
// Acessar config
window.QuestHelperConfig.version

// Acessar utils
window.QuestHelperUtils.formatTime(60)

// Acessar UI
window.QuestHelperUI.createPanel(...)

// Acessar processor
window.QuestHelperProcessor.processQuests(...)
```

## 📝 Modificações Recomendadas

1. **Adicionar nova task**: Edite `config.js` e `quest-processor.js`
2. **Mudar estilos**: Edite `ui.js` (CSS em `injectStyles()`)
3. **Adicionar funções utilitárias**: Edite `utils.js`
4. **Melhorar UI**: Edite `ui.js` (marcação HTML em `createPanel()`)

## 🐛 Troubleshooting

### Módulos não carregam
- Verifique URL do GitHub RAW
- Verifique console para erros específicos
- Confirme que todos os arquivos estão no repositório

### Estilos não aplicam
- Verifique se `ui.js` foi carregado
- Limpe cache do navegador
- Verifique console para erros CSS

### Stores não encontrados
- Discord pode ter atualizado estrutura
- Atualize os getModule filters em `utils.js`

## 📚 Exemplos de Uso

### Chamar função do processor
```javascript
window.QuestHelperProcessor.processQuests(state, stores, callback);
```

### Usar utils
```javascript
const formatted = window.QuestHelperUtils.formatTime(300); // "5m 0s"
const stores = window.QuestHelperUtils.loadStores();
```

### Acessar config
```javascript
const version = window.QuestHelperConfig.version;
const tasks = window.QuestHelperConfig.supportedTasks;
```

## 🎨 Customização

Todos os valores podem ser customizados em seus respectivos arquivos:
- Cores: `ui.js` (variáveis CSS)
- Tasks: `config.js`
- Timeouts: `config.js`
- URLs: `main.js`

---

**Versão:** 0.1.2  
**Última atualização:** 2026-02-18
"# AutoComplete" 
