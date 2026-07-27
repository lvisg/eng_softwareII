import { useState, useRef, useEffect } from 'react';
import './BarraAcessibilidade.css';

export default function BarraAcessibilidade({
                                                leituraAtiva,
                                                navegadorSuportaVoz,
                                                alternarLeitura,
                                                alternarContraste,
                                                alterarTamanhoFonte
                                            }) {
    const [aberto, setAberto] = useState(false);
    const painelRef = useRef(null);
    const botaoRef = useRef(null);

    useEffect(() => {
        if (aberto) {
            painelRef.current?.focus();
        }

        function handleKeyDown(e) {
            if (e.key === 'Escape' && aberto) {
                setAberto(false);
                botaoRef.current?.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [aberto]);

    const fecharPainel = () => {
        setAberto(false);
        botaoRef.current?.focus();
    };

    return (
        <>
            <button
                ref={botaoRef}
                type="button"
                className="fab-acessibilidade"
                onClick={() => setAberto(prev => !prev)}
                aria-expanded={aberto}
                aria-controls="painel-acessibilidade"
                aria-label={aberto ? 'Fechar menu de acessibilidade' : 'Abrir menu de acessibilidade'}
            >
                <span aria-hidden="true">♿</span>
            </button>

            {aberto && (
                <div
                    className="backdrop-acessibilidade"
                    onClick={fecharPainel}
                    aria-hidden="true"
                />
            )}

            <aside
                id="painel-acessibilidade"
                ref={painelRef}
                tabIndex="-1"
                className={`barra-acessibilidade ${aberto ? 'aberta' : ''}`}
                aria-label="Ferramentas de acessibilidade"
                aria-hidden={!aberto}
            >
                <div className="cabecalho-painel">
                    <h2>Acessibilidade</h2>
                    <button
                        type="button"
                        className="btn-fechar"
                        onClick={fecharPainel}
                        aria-label="Fechar painel"
                    >
                        ✕
                    </button>
                </div>

                <section className="secao-acessibilidade">
                    <h3>Leitura de Tela</h3>
                    <button
                        type="button"
                        className="botao-acessibilidade"
                        onClick={alternarLeitura}
                        aria-pressed={leituraAtiva}
                        disabled={!navegadorSuportaVoz}
                    >
                        {leituraAtiva ? 'Desativar Leitura' : 'Ativar Leitura'}
                    </button>
                </section>

                <section className="secao-acessibilidade">
                    <h3>Visual e Fonte</h3>
                    <button
                        type="button"
                        className="botao-acessibilidade"
                        onClick={alternarContraste}
                    >
                        Alto Contraste
                    </button>

                    <div className="grupo-botoes-fonte">
                        <button
                            type="button"
                            className="botao-acessibilidade curto"
                            onClick={() => alterarTamanhoFonte && alterarTamanhoFonte(-1)}
                            aria-label="Diminuir tamanho da fonte"
                        >
                            A-
                        </button>
                        <button
                            type="button"
                            className="botao-acessibilidade curto"
                            onClick={() => alterarTamanhoFonte && alterarTamanhoFonte(1)}
                            aria-label="Aumentar tamanho da fonte"
                        >
                            A+
                        </button>
                    </div>
                </section>

                <details className="atalhos-container">
                    <summary>Atalhos de Teclado</summary>
                    <ul>
                        <li><kbd>Alt</kbd> + <kbd>L</kbd>: Ligar/Desligar leitura</li>
                        <li><kbd>Alt</kbd> + <kbd>P</kbd>: Parar leitura</li>
                        <li><kbd>Esc</kbd>: Fechar este painel</li>
                    </ul>
                </details>
            </aside>
        </>
    );
}