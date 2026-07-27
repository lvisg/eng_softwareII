import { useEffect, useState } from 'react';
import './FormularioVacinacao.css';

const inicial = {
    dataVacinacao: '',
    viaAdministracao: 'Intramuscular',
    categoriaGrupoDeVacinacao: 'Adulto',
    quantidadeAplicada: 1,
    doseVacina: {
        codigoDose: '',
        descricaoDose: '',
        loteVacina: '',
        vacina: {
            codigoVacina: '',
            siglaVacina: '',
            descricaoVacina: '',
            codigoFabricante: '',
            fabricante: ''
        }
    },
    paciente: {
        codigoPaciente: '',
        sexo: '',
        raca: '',
        municipioPaciente: '',
        paisPaciente: 'BRASIL',
        ufPaciente: '',
        nacionalidade: 'BRASILEIRA',
        status: '',
        etniaIndigena: '',
        condicaoMaternal: '',
        idade: ''
    },
    estabelecimento: {
        codigoCnes: '',
        razaoSocial: '',
        nomeFantasia: '',
        municipio: '',
        uf: ''
    }
};

export default function FormularioVacinacao({ aoSalvar, registroEditando, aoCancelar }) {
    const [form, setForm] = useState(inicial);

    useEffect(() => {
        setForm(
            registroEditando
                ? {
                    ...inicial,
                    ...registroEditando,
                    doseVacina: {
                        ...inicial.doseVacina,
                        ...registroEditando.doseVacina,
                        vacina: {
                            ...inicial.doseVacina.vacina,
                            ...registroEditando.doseVacina?.vacina
                        }
                    },
                    paciente: { ...inicial.paciente, ...registroEditando.paciente },
                    estabelecimento: { ...inicial.estabelecimento, ...registroEditando.estabelecimento }
                }
                : inicial
        );
    }, [registroEditando]);

    const top = (k, v) => setForm(a => ({ ...a, [k]: v }));
    const dose = (k, v) => setForm(a => ({ ...a, doseVacina: { ...a.doseVacina, [k]: v } }));
    const vac = (k, v) => setForm(a => ({ ...a, doseVacina: { ...a.doseVacina, vacina: { ...a.doseVacina.vacina, [k]: v } } }));
    const pac = (k, v) => setForm(a => ({ ...a, paciente: { ...a.paciente, [k]: v } }));
    const est = (k, v) => setForm(a => ({ ...a, estabelecimento: { ...a.estabelecimento, [k]: v } }));

    const enviar = e => {
        e.preventDefault();
        aoSalvar({
            ...form,
            id: undefined,
            quantidadeAplicada: Number(form.quantidadeAplicada || 1),
            paciente: {
                ...form.paciente,
                idade: form.paciente.idade === '' ? null : Number(form.paciente.idade)
            }
        });
        if (!registroEditando) setForm(inicial);
    };

    return (
        <form
            className="formulario"
            onSubmit={enviar}
            aria-label={registroEditando ? `Edição do registro ${registroEditando.id}` : 'Cadastro de vacinação'}
        >
            <fieldset className="secao-form">
                <legend>Dados Principais</legend>
                <div className="grade">
                    <Input id="data" label="Data da vacinação" type="date" value={form.dataVacinacao || ''} onChange={e => top('dataVacinacao', e.target.value)} required />
                    <Input id="via" label="Via de administração" value={form.viaAdministracao || ''} onChange={e => top('viaAdministracao', e.target.value)} />
                    <Input id="grupo" label="Grupo de vacinação" value={form.categoriaGrupoDeVacinacao || ''} onChange={e => top('categoriaGrupoDeVacinacao', e.target.value)} />
                    <Input id="qtd" label="Quantidade aplicada" type="number" min="1" value={form.quantidadeAplicada || 1} onChange={e => top('quantidadeAplicada', e.target.value)} />
                </div>
            </fieldset>

            <fieldset className="secao-form">
                <legend>Vacina e Dose</legend>
                <div className="grade">
                    <Input id="vacina" label="Descrição da vacina" value={form.doseVacina.vacina.descricaoVacina || ''} onChange={e => vac('descricaoVacina', e.target.value)} required />
                    <Input id="sigla" label="Sigla" value={form.doseVacina.vacina.siglaVacina || ''} onChange={e => vac('siglaVacina', e.target.value)} />
                    <Input id="fabricante" label="Fabricante" value={form.doseVacina.vacina.fabricante || ''} onChange={e => vac('fabricante', e.target.value)} />
                    <Input id="codvac" label="Código da vacina" value={form.doseVacina.vacina.codigoVacina || ''} onChange={e => vac('codigoVacina', e.target.value)} />
                    <Input id="dose" label="Dose" value={form.doseVacina.descricaoDose || ''} onChange={e => dose('descricaoDose', e.target.value)} />
                    <Input id="lote" label="Lote" value={form.doseVacina.loteVacina || ''} onChange={e => dose('loteVacina', e.target.value)} />
                </div>
            </fieldset>

            <fieldset className="secao-form">
                <legend>Paciente</legend>
                <div className="grade">
                    <Input id="pac" label="Código do paciente" value={form.paciente.codigoPaciente || ''} onChange={e => pac('codigoPaciente', e.target.value)} required />
                    <Input id="idade" label="Idade" type="number" min="0" max="130" value={form.paciente.idade ?? ''} onChange={e => pac('idade', e.target.value)} />
                    <Input id="sexo" label="Sexo" value={form.paciente.sexo || ''} onChange={e => pac('sexo', e.target.value)} />
                    <Input id="raca" label="Raça/cor" value={form.paciente.raca || ''} onChange={e => pac('raca', e.target.value)} />
                    <Input id="munpac" label="Município do paciente" value={form.paciente.municipioPaciente || ''} onChange={e => pac('municipioPaciente', e.target.value)} />
                    <Input id="ufpac" label="UF do paciente" maxLength="2" value={form.paciente.ufPaciente || ''} onChange={e => pac('ufPaciente', e.target.value.toUpperCase())} />
                </div>
            </fieldset>

            <fieldset className="secao-form">
                <legend>Estabelecimento</legend>
                <div className="grade">
                    <Input id="cnes" label="CNES" value={form.estabelecimento.codigoCnes || ''} onChange={e => est('codigoCnes', e.target.value)} />
                    <Input id="razao" label="Razão social" value={form.estabelecimento.razaoSocial || ''} onChange={e => est('razaoSocial', e.target.value)} />
                    <Input id="fantasia" label="Nome fantasia" value={form.estabelecimento.nomeFantasia || ''} onChange={e => est('nomeFantasia', e.target.value)} />
                    <Input id="munest" label="Município do estabelecimento" value={form.estabelecimento.municipio || ''} onChange={e => est('municipio', e.target.value)} required />
                    <Input id="ufest" label="UF do estabelecimento" maxLength="2" value={form.estabelecimento.uf || ''} onChange={e => est('uf', e.target.value.toUpperCase())} required />
                </div>
            </fieldset>

            <div className="acoes-form">
                <button className="botao" type="submit">
                    {registroEditando ? 'Salvar alterações' : 'Cadastrar vacinação'}
                </button>
                {registroEditando && (
                    <button className="botao secundario" type="button" onClick={aoCancelar}>
                        Cancelar edição
                    </button>
                )}
            </div>
        </form>
    );
}

function Input({ id, label, required, ...props }) {
    return (
        <div className="campo">
            <label htmlFor={id}>
                {label}
                {required && <span className="obrigatorio"> *</span>}
            </label>
            <input id={id} required={required} aria-required={required || undefined} {...props} />
        </div>
    );
}