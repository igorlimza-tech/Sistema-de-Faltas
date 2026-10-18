/* ===== DADOS (o localStorage do navegador faz o papel de banco de dados) ===== */
const DISCS = [
  { id: 'bd',  nome: 'Banco de Dados',                  tag: 'BANCO DE DADOS', icone: 'BD',   cor: 'azul'  },
  { id: 'poo', nome: 'Programação Orientada a Objetos', tag: 'PROGRAMAÇÃO',    icone: '</>',  cor: 'roxo'  },
  { id: 'es',  nome: 'Engenharia de Software',          tag: 'ENGENHARIA',     icone: 'ES',   cor: 'verde' }
];
const CURSO = 'Análise e Desenvolvimento de Sistemas';
const LIMITE = 10; // faltas permitidas por disciplina

const lerDB = (k, p) => { try { return JSON.parse(localStorage.getItem(k)) ?? p; } catch { return p; } };
const salvarDB = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const br = d => d.split('-').reverse().join('/');
const hoje = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const iniciais = n => n.trim().split(/\s+/).map((p, i, a) => (i === 0 || i === a.length - 1) ? p[0] : '').join('').toUpperCase();
const stat = (icone, n, texto) => `<div class="stat"><span class="stat-icone">${icone}</span><div><strong>${n}</strong><span>${texto}</span></div></div>`;

if (!localStorage.getItem('usuarios')) {
  salvarDB('usuarios', [
    { tipo: 'professor', nome: 'Professor Carlos', ra: 'prof1', senha: '123' },
    { tipo: 'aluno', nome: 'Ana Souza',   ra: '1001', senha: '123' },
    { tipo: 'aluno', nome: 'Bruno Lima',  ra: '1002', senha: '123' },
    { tipo: 'aluno', nome: 'Carla Dias',  ra: '1003', senha: '123' },
    { tipo: 'aluno', nome: 'Diego Rocha', ra: '1004', senha: '123' },
    { tipo: 'aluno', nome: 'Elisa Prado', ra: '1005', senha: '123' }
  ]);
}

function aviso(msg, ok = true) {
  const t = document.createElement('div');
  t.className = 'aviso ' + (ok ? 'aviso-ok' : 'aviso-erro');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('aviso-ver'), 10);
  setTimeout(() => t.remove(), 3000);
}

/* ===== INÍCIO: descobre a página pelo data-pagina do <body> ===== */
function iniciar() {
  const pag = document.body.dataset.pagina;
  const user = lerDB('usuarios', []).find(u => u.ra === sessionStorage.getItem('sessao'));
  const exige = { professor: 'professor', chamada: 'professor', aluno: 'aluno' }[pag];

  if (exige && (!user || user.tipo !== exige)) { location.href = 'index.html'; return; }
  if (pag === 'login' && user) { location.href = user.tipo === 'professor' ? 'professor.html' : 'aluno.html'; return; }

  if (user && exige) montarCabecalho(user);

  document.querySelectorAll('.ver-senha').forEach(b => b.onclick = () => {
    const i = document.getElementById(b.dataset.alvo);
    const mostrar = i.type === 'password';
    i.type = mostrar ? 'text' : 'password';
    b.textContent = mostrar ? 'Ocultar' : 'Mostrar';
  });

  ({ login, cadastro, professor, chamada, aluno }[pag] || (() => {}))(user);
}

function montarCabecalho(u) {
  const prof = u.tipo === 'professor';
  document.getElementById('cabecalho').innerHTML = `<header class="cabecalho">
    <a class="logo-sistema" href="${prof ? 'professor.html' : 'aluno.html'}">
      <div class="logo-icone">✓</div>
      <div><h2>Sistema de Faltas</h2><span>Portal Acadêmico</span></div>
    </a>
    <div class="usuario">
      <div class="avatar">${esc(iniciais(u.nome))}</div>
      <div class="usuario-info"><span>${prof ? 'PROFESSOR' : 'ALUNO'}</span><strong>${esc(u.nome)}</strong></div>
      <button class="botao-sair" id="sair">Sair</button>
    </div>
  </header>`;
  document.getElementById('sair').onclick = () => { sessionStorage.removeItem('sessao'); location.href = 'index.html'; };
}

/* ===== LOGIN ===== */
function login() {
  const form = document.querySelector('form');
  form.onsubmit = e => {
    e.preventDefault();
    const ra = document.getElementById('ra').value.trim(), senha = document.getElementById('senha').value;
    const u = lerDB('usuarios', []).find(x => x.ra === ra && x.senha === senha);
    if (!u) {
      const c = document.querySelector('.cartao');
      c.classList.remove('tremer'); void c.offsetWidth; c.classList.add('tremer');
      return aviso('RA ou senha incorretos.', false);
    }
    sessionStorage.setItem('sessao', u.ra);
    location.href = u.tipo === 'professor' ? 'professor.html' : 'aluno.html';
  };
}

/* ===== CADASTRO ===== */
function cadastro() {
  const f = document.getElementById('form-cadastro');
  f.querySelectorAll('input[name=tipo]').forEach(r => r.onchange = () => {
    const prof = r.value === 'professor';
    document.getElementById('label-ra').textContent = prof ? 'Registro funcional' : 'RA';
    document.getElementById('ra').placeholder = prof ? 'Digite seu registro' : 'Digite seu RA';
  });
  f.onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const us = lerDB('usuarios', []);
    if (d.nome.trim().length < 3) return aviso('Digite seu nome completo.', false);
    if (d.senha.length < 4) return aviso('A senha precisa ter ao menos 4 caracteres.', false);
    if (d.senha !== d.confirmar) return aviso('As senhas não conferem.', false);
    if (us.some(u => u.ra === d.ra.trim())) return aviso('Este RA já está cadastrado.', false);
    us.push({ tipo: d.tipo, nome: d.nome.trim(), ra: d.ra.trim(), senha: d.senha });
    salvarDB('usuarios', us);
    aviso('Conta criada! Redirecionando...');
    setTimeout(() => location.href = 'index.html', 1200);
  };
}

/* ===== PAINEL DO PROFESSOR ===== */
function professor(u) {
  const alunos = lerDB('usuarios', []).filter(x => x.tipo === 'aluno').length;
  const ch = lerDB('chamadas', []);
  const cartoes = DISCS.map(d => {
    const datas = ch.filter(c => c.disc === d.id).map(c => c.data).sort();
    const ultima = datas.length ? br(datas[datas.length - 1]) : 'nenhuma ainda';
    return `<article class="card ${d.cor}">
      <div class="card-topo"><div class="icone">${esc(d.icone)}</div><span class="tag">${d.tag}</span></div>
      <h3>${esc(d.nome)}</h3>
      <p class="curso">${CURSO}</p>
      <div class="info">
        <div><span>Semestre</span><strong>3º</strong></div>
        <div><span>Turma</span><strong>Noturno</strong></div>
        <div><span>Alunos</span><strong>${alunos}</strong></div>
      </div>
      <p class="ultima">Última chamada: <strong>${ultima}</strong> · ${datas.length} aula(s) registrada(s)</p>
      <a class="botao-chamada" href="chamada.html?disc=${d.id}">Fazer chamada →</a>
    </article>`;
  }).join('');

  document.getElementById('conteudo').innerHTML = `
    <section class="banner">
      <small class="tag">PAINEL DO PROFESSOR</small>
      <h1>Olá, ${esc(u.nome)} 👋</h1>
      <p>Escolha uma disciplina para fazer a chamada dos seus alunos.</p>
      <div class="stats">${stat('📚', DISCS.length, 'Disciplinas')}${stat('🎓', alunos, 'Alunos cadastrados')}${stat('📝', ch.length, 'Chamadas registradas')}</div>
    </section>
    <div class="titulo-secao"><h2>Minhas disciplinas</h2></div>
    <div class="grade">${cartoes}</div>`;
}

/* ===== TELA DO ALUNO ===== */
function aluno(u) {
  const ch = lerDB('chamadas', []);
  let totalFaltas = 0, totalAulas = 0, risco = 0;

  const cartoes = DISCS.map(d => {
    const aulas = ch.filter(c => c.disc === d.id);
    const fal = aulas.filter(c => c.presentes[u.ra] === false);
    const pct = Math.min(100, Math.round(fal.length / LIMITE * 100));
    const [txt, st] = fal.length >= LIMITE ? ['Limite atingido', 'critico']
                    : fal.length >= LIMITE * 0.7 ? ['Atenção', 'atencao'] : ['Regular', 'ok'];
    totalFaltas += fal.length; totalAulas += aulas.length; if (st !== 'ok') risco++;
    const freq = aulas.length ? Math.round((aulas.length - fal.length) / aulas.length * 100) + '%' : '—';
    return `<article class="card ${d.cor}">
      <div class="card-topo"><div class="icone">${esc(d.icone)}</div><span class="pilula ${st}">${txt}</span></div>
      <h3>${esc(d.nome)}</h3>
      <div class="info">
        <div><span>Aulas</span><strong>${aulas.length}</strong></div>
        <div><span>Faltas</span><strong>${fal.length}</strong></div>
        <div><span>Frequência</span><strong>${freq}</strong></div>
      </div>
      <div class="barra-rotulo"><span>${fal.length} de ${LIMITE} faltas permitidas</span><span>${pct}%</span></div>
      <div class="barra"><i class="${st}" data-w="${pct}"></i></div>
      <div class="datas">${fal.length ? fal.map(c => `<span>${br(c.data).slice(0, 5)}</span>`).join('') : '<em>Nenhuma falta registrada</em>'}</div>
    </article>`;
  }).join('');

  const geral = totalAulas ? Math.round((totalAulas - totalFaltas) / totalAulas * 100) + '%' : '—';
  document.getElementById('conteudo').innerHTML = `
    <section class="banner">
      <small class="tag">PAINEL DO ALUNO</small>
      <h1>Olá, ${esc(u.nome.split(' ')[0])} 👋</h1>
      <p>Acompanhe suas faltas em cada disciplina e fique de olho no limite.</p>
      <div class="stats">${stat('❌', totalFaltas, 'Faltas no total')}${stat('✅', geral, 'Frequência geral')}${stat('⚠️', risco, 'Disciplinas em atenção')}</div>
    </section>
    <div class="titulo-secao"><h2>Minhas disciplinas</h2></div>
    <div class="grade">${cartoes}</div>`;
  setTimeout(() => document.querySelectorAll('.barra i').forEach(i => i.style.width = i.dataset.w + '%'), 50);
}

/* ===== TELA DE CHAMADA ===== */
function chamada() {
  const $ = i => document.getElementById(i);
  const id = new URLSearchParams(location.search).get('disc');
  const d = DISCS.find(x => x.id === id);
  if (!d) { location.href = 'professor.html'; return; }

  $('conteudo').classList.add(d.cor);
  $('icone').textContent = d.icone;
  $('titulo').textContent = d.nome;
  $('subtitulo').textContent = CURSO + ' · 3º Semestre · Noturno';

  const alunos = lerDB('usuarios', []).filter(x => x.tipo === 'aluno');
  const data = $('data');
  data.value = hoje();
  let estado = {};

  function carregar() {
    const reg = lerDB('chamadas', []).find(c => c.disc === id && c.data === data.value);
    estado = {};
    alunos.forEach(a => estado[a.ra] = reg ? reg.presentes[a.ra] !== false : true);
    $('nota').textContent = reg ? 'Já existe uma chamada salva nesta data. Ao salvar, ela será atualizada.' : '';
    desenhar();
  }

  function desenhar() {
    const t = $('busca').value.trim().toLowerCase();
    const vis = alunos.filter(a => a.nome.toLowerCase().includes(t) || a.ra.includes(t));
    $('lista').innerHTML = vis.length ? vis.map(a => `<div class="linha">
        <div class="aluno-id"><div class="avatar">${esc(iniciais(a.nome))}</div><div><strong>${esc(a.nome)}</strong><span>RA ${esc(a.ra)}</span></div></div>
        <div class="par">
          <button data-ra="${esc(a.ra)}" data-v="1" class="${estado[a.ra] ? 'on-p' : ''}">Presente</button>
          <button data-ra="${esc(a.ra)}" data-v="0" class="${!estado[a.ra] ? 'on-f' : ''}">Falta</button>
        </div></div>`).join('')
      : `<p class="vazio">${alunos.length ? 'Nenhum aluno encontrado.' : 'Nenhum aluno cadastrado ainda.'}</p>`;
    const f = alunos.filter(a => !estado[a.ra]).length, p = alunos.length - f;
    $('contador').textContent = `${p} presentes · ${f} faltas · ${alunos.length} alunos`;
    $('prog').style.width = alunos.length ? (p / alunos.length * 100) + '%' : '0';
  }

  $('lista').onclick = e => {
    const b = e.target.closest('button[data-ra]');
    if (!b) return;
    estado[b.dataset.ra] = b.dataset.v === '1';
    desenhar();
  };
  $('todos').onclick = () => { alunos.forEach(a => estado[a.ra] = true); desenhar(); };
  $('nenhum').onclick = () => { alunos.forEach(a => estado[a.ra] = false); desenhar(); };
  $('busca').oninput = desenhar;
  data.onchange = carregar;
  $('salvar').onclick = () => {
    if (!data.value) return aviso('Escolha a data da aula.', false);
    const cs = lerDB('chamadas', []).filter(c => !(c.disc === id && c.data === data.value));
    cs.push({ disc: id, data: data.value, presentes: { ...estado } });
    salvarDB('chamadas', cs);
    $('nota').textContent = 'Já existe uma chamada salva nesta data. Ao salvar, ela será atualizada.';
    aviso('Chamada salva!');
  };
  carregar();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();