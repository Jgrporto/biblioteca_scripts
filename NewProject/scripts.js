// =================================================
// DADOS DOS SCRIPTS
// =================================================
const scriptsData = [
    {
        id: 'script1',
        title: 'Troca de Titularidade',
        language: 'text',
        description: 'Script utilizado para realizar a troca de titularidade',
        code: `TROCA DE TITULARIDADE

XXXNOMEXXXXX

>ANTIGO<
LOGIN AUTENTICAÇÃO: xxxx
SENHA AUTENTICAÇÃO: xxxx

>NOVO<
LOGIN AUTENTICAÇÃO: xxxx
SENHA AUTENTICAÇÃO: xxxx

//LOGIN ALTERADO, ATENDIMENTO ENCERADO//`
    }
// ================================================= 
    ,
    {
        id: 'script2',
        title: 'Abertura de O.S',
        language: 'text',
        description: 'Script padrão para realizar a abertura de uma ordem de serviço.',
        code: `NOME DA PESSOA QUE ENTROU EM CONTATO: xx
RELATO DETALHADO DO CLIENTE: xxx

>> CHECK LIST PREENCHIDA

// CASO SEJA OS DE 24 HORAS/RETENÇÃO/REINCIDENCIA DESCREVER O MOTIVO, CASO O CONTRÁRIO APAGAR ESSA LINHA.

TELEFONE DE CONTATO E ENDEREÇO CONFIRMADO
CLIENTE CIENTE DO PRAZO DE [24/48] HORAS
CLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00
CLIENTE CIENTE DE RETORNO CASO NORMALIZE`
    }
// =================================================
    ,
    {
        id: 'script3',
        title: 'Abertura de Troca Equipamento',
        language: 'text',
        description: 'Script padrão para realizar a abertura de uma ordem de serviço de troca de equipamento',
        code: `NOME DA PESSOA QUE ENTROU EM CONTATO: xx
RELATO DETALHADO DO CLIENTE: xxx
 
IDENTIFICADO EQUIPAMENTO EM COMODATO COM POSSIVEIS PROBLEMAS: *DESCREVER O PROBLEMA DO EQUIPAMENTO*

TESTES REALIZADOS: xx

TELEFONE DE CONTATO E ENDEREÇO CONFIRMADO
CLIENTE CIENTE DO PRAZO DE 48H
CLIENTE CIENTE DA POSSIBILIDADE DE SER GERADA TAXA REFERENTE AO DANO DO EQUIPAMENTO MEDIANTE ANÁLISE TÉCNICA
CLIENTE CIENTE DE RETORNO CASO NORMALIZE`
    }
// =================================================
    ,
    {
        id: 'script4',
        title: 'O.S FTTH',
        language: 'text',
        description: 'Script padrão para gerar ordem de serviço de manutenção da rede FTTH',
        code: `
TESTES REALIZADOS
ONU OFFLINE NO SISTEMA
[LOS VERMELHA / PON PISCANDO / LUZES APAGADAS - FEITA TROCA DE TOMADA SEM SUCESSO]

OU

TESTES REALIZADOS
ONU ONLINE NO SISTEMA, VERIFICADA E REAPROVISIONADA
FEITO REBOOT E VERIFICADO OS CABOS
[ROTEADOR DE PLATAFORMA CONFIGURADO / ROTEADOR PARTICULAR, INFORMA QUE NOME DO WIFI CONTINUA O MESMO]

TELEFONE DE CONTATO E ENDEREÇO CONFIRMADO
CLIENTE CIENTE DO PRAZO DE [24/48] HORAS
CLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00
CLIENTE CIENTE DE RETORNO CASO NORMALIZE`
    }
// =================================================
    ,
    {
        id: 'script5',
        title: 'O.S FTTX',
        language: 'text',
        description: 'Script padrão para gerar ordem de serviço de manutenção da rede FTTX',
        code: `
TESTES REALIZADOS:

FONTE POE [APAGADA, TROCA DE TOMADA SEM SUCESSO / PISCANDO MESMO APÓS RETIRAR O CABO DA POE / PISCANDO APENAS QUANDO CONECTADA NA POE, PORÉM NÃO IDENTIFICADO FALHA]
[CABO VERIFICADO E  REBOOT REALIZADO]

OU

FONTE POE ACESA E CONTÍNUA
FEITO REBOOT E VERIFICADO OS CABOS
[ROTEADOR DE PLATAFORMA CONFIGURADO / ROTEADOR PARTICULAR, INFORMA QUE NOME DO WIFI CONTINUA O MESMO]


TELEFONE DE CONTATO E ENDEREÇO CONFIRMADO
CLIENTE CIENTE DO PRAZO DE [24/48] HORAS
CLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00
CLIENTE CIENTE DE RETORNO CASO NORMALIZE`
    },
    {
        id: 'script6',
        title: 'O.S RÁDIO',
        language: 'text',
        description: 'Script padrão para gerar ordem de serviço de manutenção da rede RÁDIO',
        code: `
SEM ACESSO
RELATO DETALHADO DO CLIENTE: xx

TESTES REALIZADOS:

FONTE POE APAGADA, TROCA DE TOMADA SEM SUCESSO

OU

FONTE POE ACESA E CONTÍNUA
FEITO REBOOT E VERIFICADO OS CABOS
[ROTEADOR DE PLATAFORMA CONFIGURADO / ROTEADOR PARTICULAR, INFORMA QUE NOME DO WIFI CONTINUA O MESMO]

RÁDIO:  [ ONLINE, DESCONECTADO DO PAINEL / NÃO FOI POSSÍVEL CONECTAR ]

TELEFONE DE CONTATO E ENDEREÇO CONFIRMADO
CLIENTE CIENTE DO PRAZO DE [24/48] HORAS
CLIENTE CIENTE DE POSSÍVEL TAXA DE VISITA IMPRODUTIVA NO VALOR DE R$ 50,00
CLIENTE CIENTE DE RETORNO CASO NORMALIZE`
    }
// =================================================
    ,
    {
        id: 'script7',
        title: 'O.S Troca de Equipamento',
        language: 'text',
        description: 'Script padrão para gerar ordem de serviço de manutenção da rede FTTX',
        code: `// IDENTIFICADO EQUIPAMENTO EM COMODATO DANIFICADO OU APRESENTANDO PROBLEMAS

TIPO DE EQUIPAMENTO:

( ) FONTE DE ENERGIA ( ) ONU ( ) ROTEADOR ( ) ONT  ( ) FONTE POE

// FAVOR AVALIAR DEFEITO NO EQUIPAMENTO, SE NÃO FOI CAUSADO PELO CLIENTE REALIZAR A TROCA.

/// SE IDENTIFICAR DANO PELO CLIENTE, COMUNICAR A SUPERVISÃO PARA QUE SEJA AUTORIZADO A TROCA.

TELEFONE DE CONTATO E ENDEREÇO CONFIRMADO
CLIENTE CIENTE DO PRAZO DE 48H
CLIENTE CIENTE DA POSSIBILIDADE DE SER GERADA TAXA REFERENTE AO DANO DO EQUIPAMENTO MEDIANTE ANÁLISE TÉCNICA
CLIENTE CIENTE DE RETORNO CASO NORMALIZE`
    }
];

// =================================================
// LÓGICA DA APLICAÇÃO
// =================================================

// --- Seletores de Elementos ---
const scriptListUl = document.getElementById('script-list-ul');
const searchInput = document.getElementById('search-input');
const displayArea = document.getElementById('script-display');

// Seletores para a nova navegação
const navScripts = document.getElementById('nav-scripts');
const navAnalise = document.getElementById('nav-analise');
const scriptLibraryPage = document.getElementById('script-library');
const analisePage = document.getElementById('analise-section');
const pageSections = document.querySelectorAll('.page-section');

// --- Função para mostrar uma página e esconder as outras ---
function showPage(pageId) {
    pageSections.forEach(section => {
        if (section.id === pageId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// --- Funções da Biblioteca de Scripts ---
function renderScriptList(scriptsToRender) {
    scriptListUl.innerHTML = '';
    scriptsToRender.forEach(script => {
        const li = document.createElement('li');
        li.className = 'script-item';
        li.textContent = script.title;
        li.onclick = () => showScript(script.id);
        scriptListUl.appendChild(li);
    });
}

// --- Função para mostrar o conteúdo do script selecionado (VERSÃO ATUALIZADA) ---
function showScript(scriptId) {
    const script = scriptsData.find(s => s.id === scriptId);
    
    // Limpa a área de exibição
    displayArea.innerHTML = '';

    if (script) {
        // Cria os elementos
        const titleEl = document.createElement('h3');
        titleEl.textContent = script.title;

        const descriptionEl = document.createElement('p');
        descriptionEl.textContent = script.description;
        
        // Cria o 'invólucro' para o código e o botão
        const wrapperEl = document.createElement('div');
        wrapperEl.className = 'code-block-wrapper';

        const preEl = document.createElement('pre');
        const codeEl = document.createElement('code');
        codeEl.textContent = script.code; // Usar textContent é seguro
        preEl.appendChild(codeEl);

        // Cria o botão de copiar
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copiar';
        copyBtn.className = 'btn copy-btn';

        // Adiciona o evento de clique para copiar
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(script.code).then(() => {
                copyBtn.textContent = 'Copiado!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar';
                }, 2000); // Volta ao texto original após 2 segundos
            }).catch(err => {
                console.error('Erro ao copiar o script: ', err);
                copyBtn.textContent = 'Erro';
            });
        });

        // Monta a estrutura final
        wrapperEl.appendChild(preEl);
        wrapperEl.appendChild(copyBtn);
        
        displayArea.appendChild(titleEl);
        displayArea.appendChild(descriptionEl);
        displayArea.appendChild(wrapperEl);

    } else {
        displayArea.innerHTML = '<p>Erro: Script não encontrado.</p>';
    }
}

function filterScripts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredScripts = scriptsData.filter(script => {
        return script.title.toLowerCase().includes(searchTerm) || script.description.toLowerCase().includes(searchTerm);
    });
    renderScriptList(filteredScripts);
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Lógica da Biblioteca
    searchInput.addEventListener('input', filterScripts);
    renderScriptList(scriptsData);

    // Lógica da Navegação
    navScripts.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('script-library');
    });

    navAnalise.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('analise-section');
    });
    
    // --- LÓGICA DO NOVO BOTÃO 'COPIAR TEXTO' ---
    const copiarBtn = document.getElementById('copiar-texto-btn');
    const textoParaCopiar = document.getElementById('texto-para-copiar');

    copiarBtn.addEventListener('click', () => {
        // Usa a API do Clipboard para copiar o texto
        navigator.clipboard.writeText(textoParaCopiar.innerText).then(() => {
            // Feedback visual para o usuário
            copiarBtn.innerText = 'Copiado!';
            setTimeout(() => {
                copiarBtn.innerText = 'Copiar Texto';
            }, 2000); // Volta ao texto original após 2 segundos
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            copiarBtn.innerText = 'Erro ao copiar';
        });
    });

    // Mostra a página inicial por padrão
    showPage('script-library');
});