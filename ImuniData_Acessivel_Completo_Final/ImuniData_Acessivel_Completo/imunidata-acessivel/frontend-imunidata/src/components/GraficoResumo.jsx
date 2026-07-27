import { useEffect, useState } from 'react';
import { resumoPorEstado } from '../api/vacinacaoApi';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from 'recharts';
import './GraficoResumo.css';

export default function GraficoResumo() {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);
        resumoPorEstado()
            .then(r => {
                const formatados = Object.entries(r)
                    .map(([uf, total]) => ({ uf, total: Number(total) }))
                    .sort((a, b) => b.total - a.total);
                setDados(formatados);
            })
            .catch(() => setDados([]))
            .finally(() => setCarregando(false));
    }, []);

    if (carregando) {
        return (
            <section className="painel grafico-container" aria-labelledby="titulo-grafico">
                <h2 id="titulo-grafico">Distribuição de Doses por Estado</h2>
                <div className="grafico-carregando" role="status">Carregando dados...</div>
            </section>
        );
    }

    if (!dados.length) return null;

    const totalGeral = dados.reduce((acc, item) => acc + item.total, 0);
    const maiorVolume = dados[0]?.total || 1;

    return (
        <section className="painel grafico-container" aria-labelledby="titulo-grafico">
            <header className="cabecalho-grafico">
                <div>
                    <h2 id="titulo-grafico">Distribuição de Doses por Estado</h2>
                    <p className="subtitulo-grafico">Total acumulado de aplicações no sistema</p>
                </div>
                <div className="total-badge">
                    <span className="total-rotulo">Total de Aplicações</span>
                    <strong className="total-valor">{totalGeral.toLocaleString('pt-BR')}</strong>
                </div>
            </header>

            <div className="area-grafico" aria-hidden="true">
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={dados} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="uf"
                            tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            tickLine={false}
                        />
                        <YAxis
                            width={45}
                            allowDecimals={false}
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={v => v.toLocaleString('pt-BR')}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                        <Bar
                            dataKey="total"
                            fill="#0284c7"
                            radius={[3, 3, 0, 0]}
                            maxBarSize={36}
                        >
                            {dados.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === 0 ? '#0369a1' : '#0284c7'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="resumo-tabela-container">
                <table className="tabela-resumo" aria-label="Resumo em texto das vacinações por estado">
                    <thead>
                    <tr>
                        <th scope="col">UF</th>
                        <th scope="col">Doses Aplicadas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados.map(d => {
                        return (
                            <tr key={d.uf}>
                                <td className="col-uf">{d.uf}</td>
                                <td className="col-total">{d.total.toLocaleString('pt-BR')}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <span className="tooltip-uf">{label}</span>
                <span className="tooltip-valor">{payload[0].value.toLocaleString('pt-BR')} doses</span>
            </div>
        );
    }
    return null;
}