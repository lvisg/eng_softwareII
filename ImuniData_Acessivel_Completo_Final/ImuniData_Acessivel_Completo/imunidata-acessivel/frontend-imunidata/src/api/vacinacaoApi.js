import axios from 'axios'
const api = axios.create({
    baseURL: ''
})
export async function listarRegistros(filtros = {}, page = 0) {
    const resposta = await api.get('/vacinacao', {
        params: {
            page,
            size: 30,
            codigoRegistro: filtros.busca || undefined,
            vacina: filtros.vacina || undefined,
            estado: filtros.estado || undefined,
            regiao: filtros.regiao || undefined,
            faixaEtaria: filtros.faixaEtaria || undefined
        }
    })
    return resposta.data
}
export async function buscarPorId(id) {
    const resposta = await api.get(`/vacinacao/${id}`)
    return resposta.data
}
export async function cadastrarRegistro(registro) {
    const resposta = await api.post('/vacinacao', registro)
    return resposta.data
}
export async function atualizarRegistro(id, registro) {
    const resposta = await api.put(`/vacinacao/${id}`, registro)
    return resposta.data
}
export async function excluirRegistro(id) {
    await api.delete(`/vacinacao/${id}`)
}
export async function resumoPorEstado() {
    const resposta = await api.get('/vacinacao/dashboard/contagem/uf')
    return resposta.data
}
export async function contarRegistros() {
    const resposta = await api.get('/vacinacao/dashboard/contagem')
    return resposta.data
}