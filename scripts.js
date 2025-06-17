document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // SELETORES DE ELEMENTOS DO DOM
    // =================================================
    const scriptListUl = document.getElementById('script-list-ul');
    const searchInput = document.getElementById('search-input');
    const displayArea = document.getElementById('script-display');
    const navScripts = document.getElementById('nav-scripts');
    const navAnalise = document.getElementById('nav-analise');
    const navFerramentas = document.getElementById('nav-ferramentas');
    const navAddScript = document.getElementById('nav-add-script');
    const pageSections = document.querySelectorAll('.page-section');
    const textoFixoBtn = document.getElementById('copiar-texto-btn');
    const textoParaCopiar = document.getElementById('texto-para-copiar');
    const addScriptModal = document.getElementById('add-script-modal');
    const addScriptForm = document.getElementById('add-script-form');
    const modalTitle = document.querySelector('#add-script-modal h2');
    const cancelBtn = document.getElementById('cancel-btn');
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const importFileInput = document.getElementById('import-file-input');

    // Seletores do Painel de Configurações
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const themeSelector = document.getElementById('theme-selector');
    const resetThemeBtn = document.getElementById('reset-theme-btn');
    const colorPickers = document.querySelectorAll('.color-pickers input[type="color"]');
    const exportThemeBtn = document.getElementById('export-theme-btn');
    const importThemeBtn = document.getElementById('import-theme-btn');
    const importThemeInput = document.getElementById('import-theme-input');


    // =================================================
    // DADOS DA APLICAÇÃO E ESTADO
    // =================================================
    let scriptsData = [];
    let currentScriptId = null;
    let isEditing = false;
    let scriptToEditId = null;

    const defaultScripts = [
        { id: 'script1', title: 'Troca de Titularidade', description: 'Script utilizado para realizar a troca de titularidade', code: `TROCA DE TITULARIDADE\n\nXXXNOMEXXXXX\n\n>ANTIGO<\nLOGIN AUTENTICAÇÃO: xxxx\nSENHA AUTENTICAÇÃO: xxxx\n\n>NOVO<\nLOGIN AUTENTICAÇÃO: xxxx\nSENHA AUTENTICAÇÃO: xxxx\n\n//LOGIN ALTERADO, ATENDIMENTO ENCERADO//`, isDeletable: false },
        { id: 'script2', title: 'Abertura de O.S', description: 'Script padrão para realizar a abertura de uma ordem de serviço.', code: `NOME DA PESSOA QUE ENTROU EM CONTATO: xx\nRELATO DETALHADO DO CLIENTE: xxx\n\n>> CHECK LIST PREENCHIDA\n\n// CASO SEJA OS DE 24 HORAS/RETENÇÃO/REINCIDENCIA DESCREVER O MOTIVO, CASO O CONTRÁRIO APAGAR ESSA LINHA.\n\nTELEFONE DE CONTATO E ENDEREÇO CONFIRMADO\nCLIENTE CIENTE DO PRAZO DE [24/48] HORAS\nCLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00\nCLIENTE CIENTE DE RETORNO CASO NORMALIZE`, isDeletable: false },
        { id: 'script3', title: 'Abertura de Troca Equipamento', description: 'Script padrão para realizar a abertura de uma ordem de serviço de troca de equipamento', code: `NOME DA PESSOA QUE ENTROU EM CONTATO: xx\nRELATO DETALHADO DO CLIENTE: xxx\n \nIDENTIFICADO EQUIPAMENTO EM COMODATO COM POSSIVEIS PROBLEMAS: *DESCREVER O PROBLEMA DO EQUIPAMENTO*\n\nTESTES REALIZADOS: xx\n\nTELEFONE DE CONTATO E ENDEREÇO CONFIRMADO\nCLIENTE CIENTE DO PRAZO DE 48H\nCLIENTE CIENTE DA POSSIBILIDADE DE SER GERADA TAXA REFERENTE AO DANO DO EQUIPAMENTO MEDIANTE ANÁLISE TÉCNICA\nCLIENTE CIENTE DE RETORNO CASO NORMALIZE`, isDeletable: false },
        { id: 'script4', title: 'O.S FTTH', description: 'Script padrão para gerar ordem de serviço de manutenção da rede FTTH', code: `TESTES REALIZADOS\nONU OFFLINE NO SISTEMA\n[LOS VERMELHA / PON PISCANDO / LUZES APAGADAS - FEITA TROCA DE TOMADA SEM SUCESSO]\n\nOU\n\nTESTES REALIZADOS\nONU ONLINE NO SISTEMA, VERIFICADA E REAPROVISIONADA\nFEITO REBOOT E VERIFICADO OS CABOS\n[ROTEADOR DE PLATAFORMA CONFIGURADO / ROTEADOR PARTICULAR, INFORMA QUE NOME DO WIFI CONTINUA O MESMO]\n\nTELEFONE DE CONTATO E ENDEREÇO CONFIRMADO\nCLIENTE CIENTE DO PRAZO DE [24/48] HORAS\nCLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00\nCLIENTE CIENTE DE RETORNO CASO NORMALIZE`, isDeletable: false },
        { id: 'script5', title: 'O.S FTTX', description: 'Script padrão para gerar ordem de serviço de manutenção da rede FTTX', code: `TESTES REALIZADOS:\n\nFONTE POE [APAGADA, TROCA DE TOMADA SEM SUCESSO / PISCANDO MESMO APÓS RETIRAR O CABO DA POE / PISCANDO APENAS QUANDO CONECTADA NA POE, PORÉM NÃO IDENTIFICADO FALHA]\n[CABO VERIFICADO E  REBOOT REALIZADO]\n\nOU\n\nFONTE POE ACESA E CONTÍNUA\nFEITO REBOOT E VERIFICADO OS CABOS\n[ROTEADOR DE PLATAFORMA CONFIGURADO / ROTEADOR PARTICULAR, INFORMA QUE NOME DO WIFI CONTINUA O MESMO]\n\n\nTELEFONE DE CONTATO E ENDEREÇO CONFIRMADO\nCLIENTE CIENTE DO PRAZO DE [24/48] HORAS\nCLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00\nCLIENTE CIENTE DE RETORNO CASO NORMALIZE`, isDeletable: false },
        { id: 'script6', title: 'O.S RÁDIO', description: 'Script padrão para gerar ordem de serviço de manutenção da rede RÁDIO', code: `SEM ACESSO\nRELATO DETALHADO DO CLIENTE: xx\n\nTESTES REALIZADOS:\n\nFONTE POE APAGADA, TROCA DE TOMADA SEM SUCESSO\n\nOU\n\nFONTE POE ACESA E CONTÍNUA\nFEITO REBOOT E VERIFICADO OS CABOS\n[ROTEADOR DE PLATAFORMA CONFIGURADO / ROTEADOR PARTICULAR, INFORMA QUE NOME DO WIFI CONTINUA O MESMO]\n\nRÁDIO:  [ ONLINE, DESCONECTADO DO PAINEL / NÃO FOI POSSÍVEL CONECTAR ]\n\nTELEFONE DE CONTATO E ENDEREÇO CONFIRMADO\nCLIENTE CIENTE DO PRAZO DE [24/48] HORAS\nCLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00\nCLIENTE CIENTE DE RETORNO CASO NORMALIZE`, isDeletable: false },
        { id: 'script7', title: 'O.S Troca de Equipamento', description: 'Script padrão para gerar ordem de serviço de troca de equipamento', code: `// IDENTIFICADO EQUIPAMENTO EM COMODATO DANIFICADO OU APRESENTANDO PROBLEMAS\n\nTIPO DE EQUIPAMENTO:\n\n( ) FONTE DE ENERGIA ( ) ONU ( ) ROTEADOR ( ) ONT  ( ) FONTE POE\n\n// FAVOR AVALIAR DEFEITO NO EQUIPAMENTO, SE NÃO FOI CAUSADO PELO CLIENTE REALIZAR A TROCA.\n\n/// SE IDENTIFICAR DANO PELO CLIENTE, COMUNICAR A SUPERVISÃO PARA QUE SEJA AUTORIZADO A TROCA.\n\nTELEFONE DE CONTATO E ENDEREÇO CONFIRMADO\nCLIENTE CIENTE DO PRAZO DE 48H\nCLIENTE CIENTE DA POSSIBILIDADE DE SER GERADA TAXA REFERENTE AO DANO DO EQUIPAMENTO MEDIANTE ANÁLISE TÉCNICA\nCLIENTE CIENTE DE RETORNO CASO NORMALIZE`, isDeletable: false }
    ];

    const toolsData = [
        { name: 'Grafana', url: 'http://monitor.emexinternet.com.br:3000/login', description: 'Ferramenta de monitoramento de redes e rotas.', category: 'monitoramento', icon: '' },
        { name: 'Zabbix', url: 'http://monitor.emexinternet.com.br/zabbix/index.php?request=zabbix.php%3Faction%3Ddashboard.view', description: 'Ferramenta de alertas de redes e rotas.', category: 'monitoramento', icon: 'DataImages/zabbix_icon.png' },
        { name: 'React', url: 'http://suporte.emexinternet.com.br', description: 'Ferramenta de identificação de falhas.', category: 'monitoramento', icon: '' },
        { name: 'Wiki Emex', url: 'http://10.200.200.2:3000/pt-br/scripts', description: 'Wiki para informações gerais de atendimentos e scripts.', category: 'consulta', icon: '' },
        { name: 'Flashman', url: 'https://flashman.emextelecom.com.br/login', description: 'Ferramenta de acesso e gerenciamento de roteadores em comodato.', category: 'atendimento', icon: 'DataImages/flashman_icon.png' },
        { name: 'Hubsoft', url: 'https://emex.hubsoft.com.br/cliente', description: 'Ferramenta de relato e acesso aos serviços do cliente.', category: 'atendimento', icon: 'DataImages/hubsoft_icon.png' },
        { name: 'MatrixGo', url: 'https://emex.matrixdobrasil.ai/Painel/login', description: 'Ferramenta de atendimento ao cliente via Whatsapp.', category: 'atendimento', icon: 'DataImages/icon_matrix.png' },
        { name: 'NewWave URA', url: 'https://emex.newave.one', description: 'Ferramenta de atendimento ao cliente via Ligação.', category: 'atendimento', icon: 'DataImages/newave_icon.png' }
    ];


    // =================================================
    // FUNÇÕES DA APLICAÇÃO
    // =================================================

    function loadScripts() {
        const savedScripts = localStorage.getItem('meusScripts');
        scriptsData = savedScripts ? JSON.parse(savedScripts) : defaultScripts;
        renderScriptList(scriptsData);
    }

    function saveScripts() {
        localStorage.setItem('meusScripts', JSON.stringify(scriptsData));
    }
    
    function showPage(pageId) {
        pageSections.forEach(section => { section.style.display = 'none'; });
        const activePage = document.getElementById(pageId);
        if (activePage) { activePage.style.display = 'block'; }
        
        const navLinks = [navScripts, navAnalise, navFerramentas];
        navLinks.forEach(link => { link.classList.remove('active-link'); });

        switch (pageId) {
            case 'script-library': navScripts.classList.add('active-link'); break;
            case 'analise-section': navAnalise.classList.add('active-link'); break;
            case 'ferramentas-section': navFerramentas.classList.add('active-link'); break;
        }
    }

    function renderScriptList(scriptsToRender) {
        scriptListUl.innerHTML = '';
        scriptsToRender.forEach(script => {
            const li = document.createElement('li');
            li.className = 'script-item';
            li.addEventListener('click', () => showScript(script.id));
            const titleSpan = document.createElement('span');
            titleSpan.className = 'script-item-title';
            titleSpan.textContent = script.title;
            li.appendChild(titleSpan);
            const buttonsWrapper = document.createElement('div');
            if (script.isDeletable) {
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEditModal(script.id);
                });
                buttonsWrapper.appendChild(editBtn);
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Tem certeza que deseja excluir o script "${script.title}"?`)) {
                        deleteScript(script.id);
                    }
                });
                buttonsWrapper.appendChild(deleteBtn);
            }
            li.appendChild(buttonsWrapper);
            scriptListUl.appendChild(li);
        });
    }

    function deleteScript(scriptId) {
        scriptsData = scriptsData.filter(s => s.id !== scriptId);
        saveScripts();
        renderScriptList(scriptsData);
        if(currentScriptId === scriptId) {
            displayArea.innerHTML = '<p>Selecione um script da lista para ver o conteúdo aqui.</p>';
            currentScriptId = null;
        }
    }

    function showScript(scriptId) {
        currentScriptId = scriptId;
        const script = scriptsData.find(s => s.id === scriptId);
        displayArea.innerHTML = '';
        if (script) {
            const titleEl = document.createElement('h3');
            titleEl.textContent = script.title;
            const descriptionEl = document.createElement('p');
            descriptionEl.textContent = script.description;
            const wrapperEl = document.createElement('div');
            wrapperEl.className = 'code-block-wrapper';
            const preEl = document.createElement('pre');
            const codeEl = document.createElement('code');
            codeEl.textContent = script.code;
            preEl.appendChild(codeEl);
            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copiar';
            copyBtn.className = 'btn copy-btn';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(script.code).then(() => {
                    copyBtn.textContent = 'Copiado!';
                    setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 2000);
                });
            });
            wrapperEl.appendChild(preEl);
            wrapperEl.appendChild(copyBtn);
            displayArea.appendChild(titleEl);
            displayArea.appendChild(descriptionEl);
            displayArea.appendChild(wrapperEl);
        }
    }

    function filterScripts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredScripts = scriptsData.filter(script => 
            script.title.toLowerCase().includes(searchTerm) || 
            script.description.toLowerCase().includes(searchTerm)
        );
        renderScriptList(filteredScripts);
    }

    function renderTools() {
        const monitoringGrid = document.querySelector('#monitoramento-tools .tools-grid');
        const consultingGrid = document.querySelector('#consulta-tools .tools-grid');
        const serviceGrid = document.querySelector('#atendimento-tools .tools-grid');
        monitoringGrid.innerHTML = '';
        consultingGrid.innerHTML = '';
        serviceGrid.innerHTML = '';
        toolsData.forEach(tool => {
            const toolCard = document.createElement('a');
            toolCard.className = 'tool-card';
            toolCard.href = tool.url;
            toolCard.target = '_blank';
            toolCard.rel = 'noopener noreferrer';
            const titleEl = document.createElement('h3');
            if (tool.icon) {
                const iconEl = document.createElement('img');
                iconEl.src = tool.icon;
                iconEl.className = 'tool-icon';
                iconEl.alt = '';
                titleEl.appendChild(iconEl);
            }
            titleEl.appendChild(document.createTextNode(' ' + tool.name));
            const descriptionEl = document.createElement('p');
            descriptionEl.textContent = tool.description;
            toolCard.appendChild(titleEl);
            toolCard.appendChild(descriptionEl);
            switch (tool.category) {
                case 'monitoramento': monitoringGrid.appendChild(toolCard); break;
                case 'consulta': consultingGrid.appendChild(toolCard); break;
                case 'atendimento': serviceGrid.appendChild(toolCard); break;
            }
        });
    }
    
    function openAddModal() {
        isEditing = false;
        scriptToEditId = null;
        modalTitle.textContent = 'Adicionar Novo Script';
        addScriptForm.reset();
        addScriptModal.style.display = 'flex';
    }

    function openEditModal(scriptId) {
        const script = scriptsData.find(s => s.id === scriptId);
        if (script) {
            isEditing = true;
            scriptToEditId = script.id;
            modalTitle.textContent = 'Editar Script';
            document.getElementById('script-title').value = script.title;
            document.getElementById('script-description').value = script.description;
            document.getElementById('script-code').value = script.code;
            addScriptModal.style.display = 'flex';
        }
    }
    
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeSelector) {
            themeSelector.value = savedTheme;
        }
    }
    
function applyCustomColors() {
    // Lista completa de todas as variáveis de cor que podem ser customizadas
    const customColorKeys = [
        '--cor-destaque', 
        '--cor-primaria-fundo', 
        '--cor-primaria-texto',
        '--cor-fundo-geral',
        '--cor-texto-escuro',
        '--cor-fundo-cartao', // << ADICIONADO
        '--cor-borda-sutil'   // << ADICIONADO
    ];

    // Primeiro, reseta todas as cores customizadas para que o tema base seja aplicado
    customColorKeys.forEach(key => {
        document.documentElement.style.removeProperty(key);
    });

    // Depois, aplica as cores salvas no localStorage, se existirem
    const savedColors = JSON.parse(localStorage.getItem('customColors'));
    if (savedColors) {
        Object.keys(savedColors).forEach(key => {
            document.documentElement.style.setProperty(key, savedColors[key]);
        });
    }
    
    // Finalmente, atualiza os valores dos seletores de cor para refletirem o estado atual
    const rootStyle = getComputedStyle(document.documentElement);
    colorPickers.forEach(picker => {
        const varName = picker.dataset.variable;
        // Pega o valor da cor que está de fato sendo exibida (seja do tema ou customizada)
        picker.value = rootStyle.getPropertyValue(varName).trim();
    });
}


    // =================================================
    // EVENT LISTENERS
    // =================================================
    navScripts.addEventListener('click', (e) => { e.preventDefault(); showPage('script-library'); });
    navAnalise.addEventListener('click', (e) => { e.preventDefault(); showPage('analise-section'); });
    navFerramentas.addEventListener('click', (e) => { e.preventDefault(); showPage('ferramentas-section'); });

    settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        settingsPanel.classList.toggle('open');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsPanel.classList.remove('open');
    });

    themeSelector.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        localStorage.removeItem('customColors');
        applyCustomColors();
    });

    resetThemeBtn.addEventListener('click', () => {
        if(confirm('Isso irá resetar o tema para o padrão claro e apagar suas customizações de cores. Deseja continuar?')) {
            localStorage.removeItem('theme');
            localStorage.removeItem('customColors');
            location.reload();
        }
    });

    colorPickers.forEach(picker => {
        picker.addEventListener('input', (e) => {
            const variableName = e.target.dataset.variable;
            const newColor = e.target.value;
            document.documentElement.style.setProperty(variableName, newColor);
            let savedColors = JSON.parse(localStorage.getItem('customColors')) || {};
            savedColors[variableName] = newColor;
            localStorage.setItem('customColors', JSON.stringify(savedColors));
        });
    });

    exportThemeBtn.addEventListener('click', () => {
        let currentColors = {};
        const rootStyle = getComputedStyle(document.documentElement);
        colorPickers.forEach(picker => {
            const varName = picker.dataset.variable;
            currentColors[varName] = rootStyle.getPropertyValue(varName).trim();
        });
        const dataToExport = JSON.stringify(currentColors, null, 2);
        const dataBlob = new Blob([dataToExport], { type: 'application/json' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = 'meu_tema.json';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    importThemeBtn.addEventListener('click', () => {
        importThemeInput.click();
    });

    importThemeInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedColors = JSON.parse(e.target.result);
                localStorage.setItem('customColors', JSON.stringify(importedColors));
                applyCustomColors();
                alert('Tema importado com sucesso!');
            } catch (error) {
                alert('Erro ao ler o arquivo de tema.');
            }
        };
        reader.readAsText(file);
        importThemeInput.value = '';
    });
    
    textoFixoBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(textoParaCopiar.innerText).then(() => {
            textoFixoBtn.innerText = 'Copiado!';
            setTimeout(() => { textoFixoBtn.innerText = 'Copiar Texto'; }, 2000);
        });
    });

    searchInput.addEventListener('input', filterScripts);

    navAddScript.addEventListener('click', (e) => {
        e.preventDefault();
        openAddModal();
    });



    cancelBtn.addEventListener('click', () => {
        addScriptModal.style.display = 'none';
    });

    addScriptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEditing) {
            const scriptIndex = scriptsData.findIndex(s => s.id === scriptToEditId);
            if (scriptIndex > -1) {
                scriptsData[scriptIndex].title = document.getElementById('script-title').value;
                scriptsData[scriptIndex].description = document.getElementById('script-description').value;
                scriptsData[scriptIndex].code = document.getElementById('script-code').value;
            }
        } else {
            const newScript = {
                id: 'script' + Date.now(),
                title: document.getElementById('script-title').value,
                description: document.getElementById('script-description').value,
                code: document.getElementById('script-code').value,
                isDeletable: true
            };
            scriptsData.push(newScript);
        }
        saveScripts();
        renderScriptList(scriptsData);
        if (isEditing && scriptToEditId === currentScriptId) {
            showScript(scriptToEditId);
        }
        addScriptModal.style.display = 'none';
    });

    exportBtn.addEventListener('click', () => {
        const dataToExport = JSON.stringify(scriptsData, null, 2);
        const dataBlob = new Blob([dataToExport], { type: 'application/json' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(dataBlob);
        downloadLink.download = `scripts_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    importBtn.addEventListener('click', () => {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) { return; }
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData) && importedData.every(item => item.title && item.code)) {
                    if (confirm('Isso irá substituir todos os seus scripts atuais. Deseja continuar?')) {
                        scriptsData = importedData;
                        saveScripts();
                        renderScriptList(scriptsData);
                        alert('Scripts importados com sucesso!');
                    }
                } else {
                    alert('Erro: O arquivo selecionado não parece ser um arquivo de scripts válido.');
                }
            } catch (error) {
                alert('Erro ao ler o arquivo. Verifique se é um arquivo .json válido.');
                console.error("Erro ao importar:", error);
            }
        };
        reader.readAsText(file);
        importFileInput.value = '';
    });


    // =================================================
    // INICIALIZAÇÃO DA PÁGINA
    // =================================================
    applySavedTheme();
    applyCustomColors();
    loadScripts();
    renderTools();
    showPage('script-library');
});