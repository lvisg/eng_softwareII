function Filtros({
                     busca,
                     setBusca,
                     filtroVacina,
                     setFiltroVacina,
                     filtroEstado,
                     setFiltroEstado,
                     filtroFaixaEtaria,
                     setFiltroFaixaEtaria,
                     limparFiltros
                 }) {
    return (
        <div className="filtros">
            <div className="campo">
                <label>Código do paciente</label>
                <input type="text" placeholder="Ex: 1234" value={busca} onChange={(e) => setBusca(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Vacina</label>
                <input type="text" placeholder="Ex: HPV, BCG, Influenza" value={filtroVacina} onChange={(e) => setFiltroVacina(e.target.value)} />
            </div>
            <div className="campo">
                <label>Estado</label>
                <input type="text" placeholder="Ex: SP" maxLength="2" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value.toUpperCase())} />
            </div>
            <div className="campo">
                <label>Faixa etária</label>
                <select value={filtroFaixaEtaria} onChange={(e) => setFiltroFaixaEtaria(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="Criança">Criança</option>
                    <option value="Adolescente">Adolescente</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                </select>
            </div>
            <button className="botao secundario" onClick={limparFiltros}>Limpar</button>
        </div>
    )
}

export default Filtros