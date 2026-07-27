package br.com.fatec.apiimunidata.service;

import br.com.fatec.apiimunidata.repository.RegistroVacinacaoRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {
    private final RegistroVacinacaoRepository registroVacinacaoRepository;

    public DashboardService(RegistroVacinacaoRepository registroVacinacaoRepository) {
        this.registroVacinacaoRepository = registroVacinacaoRepository;
    }

    public Integer contaRegistros() {
        return registroVacinacaoRepository.contaRegistros();
    }

    public Map<String, Integer> contaPorUf() {
        List<Object[]> resultados = registroVacinacaoRepository.contaPorUf();
        Map<String, Integer> resumo = new LinkedHashMap<>();
        for (Object[] linha : resultados) {
            String uf = (String) linha[0];
            Integer total = ((Number) linha[1]).intValue();
            resumo.put(uf != null ? uf : "N/I", total);
        }
        return resumo;
    }
}
