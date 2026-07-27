import { useEffect, useRef, useState } from 'react';

const COLUNAS = ['ID', 'Data', 'Vacina', 'Dose', 'Qtd.', 'Idade', 'Grupo', 'Município', 'UF', 'Via', 'Ações'];
const COLUNA_ACOES = 10;

export default function TabelaVacinacao({
                                            registros,
                                            aoEditar,
                                            aoExcluir,
                                            paginaAtual,
                                            totalPaginas,
                                            totalElementos,
                                            aoMudarPagina
                                        }) {
    const inicio = totalElementos ? paginaAtual * 30 + 1 : 0;
    const fim = Math.min(inicio + registros.length - 1, totalElementos);
    const [foco, setFoco] = useState({ linha: 0, coluna: 0, sub: 0 });
    const refs = useRef({});

    useEffect(() => {
        setFoco({ linha: 0, coluna: 0, sub: 0 });
    }, [registros]);

    const chave = (linha, coluna, sub) => coluna === COLUNA_ACOES ? `${linha}-acao-${sub}` : `${linha}-${coluna}`;
    const registrarRef = (linha, coluna, sub = 0) => el => { refs.current[chave(linha, coluna, sub)] = el; };
    const focar = (linha, coluna, sub = 0) => refs.current[chave(linha, coluna, sub)]?.focus();

    const mover = (e, linha, coluna, sub = 0) => {
        const ultimaLinha = registros.length - 1;
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                if (coluna === COLUNA_ACOES) { if (sub === 0) focar(linha, coluna, 1); }
                else if (coluna < COLUNA_ACOES - 1) focar(linha, coluna + 1);
                else focar(linha, COLUNA_ACOES, 0);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (coluna === COLUNA_ACOES) { if (sub === 1) focar(linha, coluna, 0); else focar(linha, COLUNA_ACOES - 1); }
                else if (coluna > 0) focar(linha, coluna - 1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (linha < ultimaLinha) focar(linha + 1, coluna, sub);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (linha > 0) focar(linha - 1, coluna, sub);
                break;
            case 'Home':
                e.preventDefault();
                if (e.ctrlKey) focar(0, 0); else focar(linha, 0);
                break;
            case 'End':
                e.preventDefault();
                if (e.ctrlKey) focar(ultimaLinha, COLUNA_ACOES, 1); else focar(linha, COLUNA_ACOES, 1);
                break;
            default:
                break;
        }
    };

    return (
        <div className="tabela-container">
            <table role="grid">
                <caption className="somente-leitor">Histórico de registros de vacinação. Use as setas do teclado para navegar entre as células.</caption>
                <thead>
                <tr>
                    {COLUNAS.map(x => (
                        <th scope="col" role="columnheader" key={x}>{x}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {!registros.length && (
                    <tr>
                        <td colSpan="11" className="sem-dados">Nenhum registro encontrado.</td>
                    </tr>
                )}
                {registros.map((r, linha) => {
                    const celulas = [
                        { fala: `Registro ${r.id}`, conteudo: r.id },
                        { fala: `Data da vacinação: ${r.dataVacinacao || '-'}`, conteudo: r.dataVacinacao || '-' },
                        { fala: `Vacina: ${r.doseVacina?.vacina?.descricaoVacina || '-'}`, conteudo: r.doseVacina?.vacina?.descricaoVacina || '-' },
                        { fala: `Dose: ${r.doseVacina?.descricaoDose || '-'}`, conteudo: r.doseVacina?.descricaoDose || '-' },
                        { fala: `Quantidade aplicada: ${r.quantidadeAplicada || 1}`, conteudo: r.quantidadeAplicada || 1 },
                        { fala: `Idade: ${r.paciente?.idade ?? '-'}`, conteudo: r.paciente?.idade ?? '-' },
                        { fala: `Grupo de vacinação: ${r.categoriaGrupoDeVacinacao || '-'}`, conteudo: r.categoriaGrupoDeVacinacao || '-' },
                        { fala: `Município: ${r.estabelecimento?.municipio || '-'}`, conteudo: r.estabelecimento?.municipio || '-' },
                        { fala: `UF: ${r.estabelecimento?.uf || '-'}`, conteudo: r.estabelecimento?.uf || '-' },
                        { fala: `Via de administração: ${r.viaAdministracao || '-'}`, conteudo: r.viaAdministracao || '-' }
                    ];

                    return (
                        <tr key={r.id}>
                            {celulas.map((c, coluna) => {
                                const Tag = coluna === 0 ? 'th' : 'td';
                                const ativa = foco.linha === linha && foco.coluna === coluna;
                                return (
                                    <Tag
                                        key={coluna}
                                        {...(coluna === 0 ? { scope: 'row' } : {})}
                                        role={coluna === 0 ? 'rowheader' : 'gridcell'}
                                        tabIndex={ativa ? 0 : -1}
                                        ref={registrarRef(linha, coluna)}
                                        data-speak={c.fala}
                                        onFocus={() => setFoco({ linha, coluna, sub: 0 })}
                                        onKeyDown={e => mover(e, linha, coluna)}
                                    >
                                        {c.conteudo}
                                    </Tag>
                                );
                            })}
                            <td role="gridcell">
                                <div className="acoes">
                                    <button
                                        className="botao pequeno"
                                        ref={registrarRef(linha, COLUNA_ACOES, 0)}
                                        tabIndex={foco.linha === linha && foco.coluna === COLUNA_ACOES && foco.sub === 0 ? 0 : -1}
                                        onFocus={() => setFoco({ linha, coluna: COLUNA_ACOES, sub: 0 })}
                                        onKeyDown={e => mover(e, linha, COLUNA_ACOES, 0)}
                                        onClick={() => aoEditar(r)}
                                        aria-label={`Editar registro ${r.id}`}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="botao perigo pequeno"
                                        ref={registrarRef(linha, COLUNA_ACOES, 1)}
                                        tabIndex={foco.linha === linha && foco.coluna === COLUNA_ACOES && foco.sub === 1 ? 0 : -1}
                                        onFocus={() => setFoco({ linha, coluna: COLUNA_ACOES, sub: 1 })}
                                        onKeyDown={e => mover(e, linha, COLUNA_ACOES, 1)}
                                        onClick={() => aoExcluir(r.id)}
                                        aria-label={`Excluir registro ${r.id}`}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {totalPaginas > 1 && (
                <nav className="paginacao" aria-label="Paginação">
                    <button onClick={() => aoMudarPagina(0)} disabled={!paginaAtual} aria-label="Primeira página">«</button>
                    <button onClick={() => aoMudarPagina(paginaAtual - 1)} disabled={!paginaAtual} aria-label="Página anterior">‹</button>
                    <span aria-live="polite">
                        {inicio} a {fim} de {totalElementos}. Página {paginaAtual + 1} de {totalPaginas}.
                    </span>
                    <button onClick={() => aoMudarPagina(paginaAtual + 1)} disabled={paginaAtual + 1 >= totalPaginas} aria-label="Próxima página">›</button>
                    <button onClick={() => aoMudarPagina(totalPaginas - 1)} disabled={paginaAtual + 1 >= totalPaginas} aria-label="Última página">»</button>
                </nav>
            )}
        </div>
    );
}
