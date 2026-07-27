package br.com.fatec.apiimunidata.service;

import br.com.fatec.apiimunidata.model.RegistroVacinacao;
import br.com.fatec.apiimunidata.repository.RegistroVacinacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class RegistroVacinacaoService {
    private final RegistroVacinacaoRepository registroVacinacaoRepository;
    public RegistroVacinacaoService(RegistroVacinacaoRepository registroVacinacaoRepository){
        this.registroVacinacaoRepository=registroVacinacaoRepository;
    }
    public Page<RegistroVacinacao> listar(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return registroVacinacaoRepository.findAll(pageable);
    }
    public Optional<RegistroVacinacao> carregarId(Integer id){
        return this.registroVacinacaoRepository.findById(id);
    }
    public void deletar(Integer id){
        this.registroVacinacaoRepository.deleteById(id);
    }
    public RegistroVacinacao salvar(RegistroVacinacao registroVacinacao){
        return this.registroVacinacaoRepository.save(registroVacinacao);
    }
    public Optional<RegistroVacinacao> alterar(RegistroVacinacao registroVacinacao, Integer id){
        return registroVacinacaoRepository.findById(id).map(obj->{
            obj.setDataVacinacao(registroVacinacao.getDataVacinacao());
            obj.setDoseVacina(registroVacinacao.getDoseVacina());
            obj.setPaciente(registroVacinacao.getPaciente());
            obj.setEstabelecimento(registroVacinacao.getEstabelecimento());
            obj.setCategoriaGrupoDeVacinacao(registroVacinacao.getCategoriaGrupoDeVacinacao());
            obj.setViaAdministracao(registroVacinacao.getViaAdministracao());
            return registroVacinacaoRepository.save(obj);
        });
    }

    public int[] faixaEtaria(String faixaEtaria){
        if(faixaEtaria.equals("Criança")){
            return new int[] {0, 12};
        } else if (faixaEtaria.equals("Adolescente")) {
            return new int[] {12,18};
        }else if (faixaEtaria.equals("Adulto")){
            return new int[] {18,65};
        }
        return new int[] {65,130};
    }
    public Page<RegistroVacinacao> buscar(String estado, String faixaEtaria, String vacina, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        boolean temEstado = StringUtils.hasText(estado);
        boolean temFaixa  = StringUtils.hasText(faixaEtaria);
        boolean temVacina  = StringUtils.hasText(vacina);
        if(temFaixa) {
            int idadeMin = this.faixaEtaria(faixaEtaria)[0];
            int idadeMax = this.faixaEtaria(faixaEtaria)[1];
            if (temEstado && temFaixa && temVacina)  return registroVacinacaoRepository.findRegistroVacinacaoByUfEIdadeEVacina(idadeMin, idadeMax, estado, vacina, pageable);
            if (temEstado && temFaixa)  return registroVacinacaoRepository.findRegistroVacinacaoByUfEFaixaEtaria(idadeMin, idadeMax, estado, pageable);
            if (temVacina && temFaixa)  return registroVacinacaoRepository.findRegistroVacinacaoByFaixaEtariaEVacina(idadeMin, idadeMax, vacina, pageable);
            if (temFaixa) return registroVacinacaoRepository.findRegistroVacinacaoByFaixaEtaria(idadeMin,idadeMax,pageable);
        }
        if (temEstado && temVacina)  return registroVacinacaoRepository.findRegistroVacinacaoByUfEVacina(estado, vacina, pageable);
        if (temVacina) return registroVacinacaoRepository.findRegistroVacinacaoByVacina(vacina, pageable);
        if (temEstado) return registroVacinacaoRepository.findRegistroVacinacaoByUf(estado, pageable);;
        return listar(page, size);
    }
}

