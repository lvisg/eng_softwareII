import { useEffect, useMemo, useState } from 'react';
import {
    atualizarRegistro,
    cadastrarRegistro,
    contarRegistros,
    excluirRegistro,
    listarRegistros
} from './api/vacinacaoApi';

import Filtros from './components/Filtros';
import FormularioVacinacao from './components/FormularioVacinacao';
import GraficoResumo from './components/GraficoResumo';
import TabelaVacinacao from './components/TabelaVacinacao';
import BarraAcessibilidade from './components/BarraAcessibilidade';
import useAcessibilidade from './hooks/useAcessibilidade';

export default function App() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [totalBanco, setTotalBanco] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalElementos, setTotalElementos] = useState(0);
    const [busca, setBusca] = useState('');
    const [filtroVacina, setFiltroVacina] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroFaixaEtaria, setFiltroFaixaEtaria] = useState('');
    const [registroEditando, setRegistroEditando] = useState(null);

    const a11y = useAcessibilidade();

    const carregarDados = async (page = 0) => {
        try {
            setCarregando(true);
            setErro('');
            const d = await listarRegistros(
                {
                    busca,
                    vacina: filtroVacina,
                    estado: filtroEstado,
                    faixaEtaria: filtroFaixaEtaria
                },
                page
            );
            setRegistros(d.content || []);
            setTotalPaginas(d.totalPages || 0);
            setTotalElementos(d.totalElements || 0);
            setPaginaAtual(d.number || 0);
        } catch (e) {
            setErro('Erro ao carregar dados. Confira se a API está aberta na porta 8080.');
            setRegistros([]);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        contarRegistros().then(setTotalBanco).catch(() => {});
    }, []);

    useEffect(() => {
        const t = setTimeout(() => carregarDados(0), 350);
        return () => clearTimeout(t);
    }, [busca, filtroVacina, filtroEstado, filtroFaixaEtaria]);

    const totais = useMemo(() => ({
        quantidade: registros.reduce((s, r) => s + (r.quantidadeAplicada || 1), 0),
        estados: new Set(registros.map(r => r.estabelecimento?.uf).filter(Boolean)).size,
        vacinas: new Set(registros.map(r => r.doseVacina?.vacina?.descricaoVacina).filter(Boolean)).size
    }), [registros]);

    const salvar = async r => {
        try {
            setErro('');
            if (registroEditando) {
                await atualizarRegistro(registroEditando.id, r);
                setRegistroEditando(null);
                setMensagem('Registro atualizado com sucesso.');
            } else {
                await cadastrarRegistro(r);
                setMensagem('Registro cadastrado com sucesso.');
            }
            await carregarDados(paginaAtual);
            setTotalBanco(await contarRegistros());
        } catch (e) {
            setErro('Erro ao salvar o registro.');
        }
    };

    const excluir = async id => {
        if (!window.confirm(`Deseja excluir o registro ${id}?`)) return;
        try {
            await excluirRegistro(id);
            setMensagem('Registro excluído com sucesso.');
            await carregarDados(paginaAtual);
            setTotalBanco(await contarRegistros());
        } catch (e) {
            setErro('Erro ao excluir o registro.');
        }
    };

    const limpar = () => {
        setBusca('');
        setFiltroVacina('');
        setFiltroEstado('');
        setFiltroFaixaEtaria('');
    };

    return (
        <>
            <a className="pular-conteudo" href="#conteudo-principal">
                Pular para o conteúdo principal
            </a>

            <div className="app">
                <header className="topo">
                    <div>
                        <h1>ImuniData</h1>
                    </div>
                    <button
                        type="button"
                        className="botao secundario"
                        onClick={() => carregarDados(paginaAtual)}
                    >
                        Atualizar dados
                    </button>
                </header>

                <BarraAcessibilidade {...a11y} />

                <div className="somente-leitor" role="status" aria-live="polite">
                    {a11y.mensagemLeitura}
                </div>

                {erro && (
                    <div className="alerta erro" role="alert">
                        {erro}
                    </div>
                )}

                {mensagem && (
                    <div className="alerta sucesso" role="status">
                        {mensagem}
                    </div>
                )}

                <main id="conteudo-principal" tabIndex="-1">
                    <section className="cards">
                        <Card nome="Total no banco" valor={totalBanco} />
                        <Card nome="Exibidos na página" valor={registros.length} />
                        <Card nome="Aplicações" valor={totais.quantidade} />
                        <Card nome="Estados" valor={totais.estados} />
                        <Card nome="Tipos de vacina" valor={totais.vacinas} />
                    </section>

                    <section id="formulario-vacinacao" className="painel" tabIndex="-1">
                        <h2>{registroEditando ? 'Editar registro' : 'Cadastrar nova vacinação'}</h2>
                        <FormularioVacinacao
                            aoSalvar={salvar}
                            registroEditando={registroEditando}
                            aoCancelar={() => setRegistroEditando(null)}
                        />
                    </section>

                    <GraficoResumo />

                    <section id="filtros-vacinacao" className="painel" tabIndex="-1">
                        <h2>Filtros em tempo real</h2>
                        <Filtros
                            busca={busca}
                            setBusca={setBusca}
                            filtroVacina={filtroVacina}
                            setFiltroVacina={setFiltroVacina}
                            filtroEstado={filtroEstado}
                            setFiltroEstado={setFiltroEstado}
                            filtroFaixaEtaria={filtroFaixaEtaria}
                            setFiltroFaixaEtaria={setFiltroFaixaEtaria}
                            limparFiltros={limpar}
                        />
                    </section>

                    <section id="historico-vacinacao" className="painel" tabIndex="-1">
                        <h2>Registros de vacinação</h2>
                        {carregando ? (
                            <p role="status">Carregando registros...</p>
                        ) : (
                            <TabelaVacinacao
                                registros={registros}
                                aoEditar={r => {
                                    setRegistroEditando(r);
                                    document.getElementById('formulario-vacinacao')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                aoExcluir={excluir}
                                paginaAtual={paginaAtual}
                                totalPaginas={totalPaginas}
                                totalElementos={totalElementos}
                                aoMudarPagina={carregarDados}
                            />
                        )}
                    </section>
                </main>
            </div>
        </>
    );
}

function Card({ nome, valor }) {
    return (
        <div className="card" data-speak={`${nome}: ${Number(valor).toLocaleString('pt-BR')}`}>
            <span>{nome}</span>
            <strong>{Number(valor).toLocaleString('pt-BR')}</strong>
        </div>
    );
}