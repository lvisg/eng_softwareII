package br.com.fatec.apiimunidata.repository;

import br.com.fatec.apiimunidata.model.RegistroVacinacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroVacinacaoRepository extends JpaRepository <RegistroVacinacao, Integer> {
    @Query(value="select count(*) from registro_vacinacao", nativeQuery = true)
    public Integer contaRegistros();
    @Query(value = "select uf, COUNT(*) from registro_vacinacao group by uf order by COUNT(*) DESC", nativeQuery = true)
    public List<Object[]> contaPorUf();
    @Query(value="select * from registro_vacinacao where uf=?", nativeQuery = true, countQuery = "select count(*) from registro_vacinacao where uf = ?1")
    public Page<RegistroVacinacao> findRegistroVacinacaoByUf(String uf, Pageable page);
    @Query(value="select * from registro_vacinacao where idade>=?1 and idade <?2", nativeQuery = true, countQuery = "select count(*) from registro_vacinacao where idade >= ?1 and idade < ?2")
    Page<RegistroVacinacao> findRegistroVacinacaoByFaixaEtaria(int min, int max, Pageable pageable);
    @Query(value= "select * from registro_vacinacao where idade >= ?1 and idade < ?2 and uf = ?3", countQuery = "select count(*) from registro_vacinacao where idade >= ?1 and idade < ?2 and uf = ?3", nativeQuery = true)
    Page<RegistroVacinacao> findRegistroVacinacaoByUfEFaixaEtaria(int min, int max, String estado, Pageable pageable);
    @Query(value = "select * from registro_vacinacao where idade >= ?1 and idade < ?2 and uf = ?3 and descricao_vacina like CONCAT('%', ?4, '%')",
            countQuery = "select count(*) from registro_vacinacao where idade >= ?1 and idade < ?2 and uf = ?3 and descricao_vacina like CONCAT('%', ?4, '%')",
            nativeQuery = true)
    Page<RegistroVacinacao> findRegistroVacinacaoByUfEIdadeEVacina(int min, int max, String estado, String vacina, Pageable pageable);
    @Query(value = "select * from registro_vacinacao where idade >= ?1 and idade < ?2 and descricao_vacina like CONCAT('%', ?3, '%')",
            countQuery = "select count(*) from registro_vacinacao where idade >= ?1 and idade < ?2 and descricao_vacina like CONCAT('%', ?3, '%')",
            nativeQuery = true)
    Page<RegistroVacinacao> findRegistroVacinacaoByFaixaEtariaEVacina(int idadeMin, int idadeMax, String vacina, Pageable pageable);
    @Query(value = "select * from registro_vacinacao where uf = ?1 and descricao_vacina like CONCAT('%', ?2, '%')",
            countQuery = "select count(*) from registro_vacinacao where uf = ?1 and descricao_vacina like CONCAT('%', ?2, '%')",
            nativeQuery = true)
    Page<RegistroVacinacao> findRegistroVacinacaoByUfEVacina(String estado, String vacina, Pageable pageable);
    @Query(value = "select * from registro_vacinacao where descricao_vacina like CONCAT('%', ?1, '%')",
            countQuery = "select count(*) from registro_vacinacao where descricao_vacina like CONCAT('%', ?1, '%')",
            nativeQuery = true)
    Page<RegistroVacinacao> findRegistroVacinacaoByVacina(String vacina, Pageable pageable);
}
