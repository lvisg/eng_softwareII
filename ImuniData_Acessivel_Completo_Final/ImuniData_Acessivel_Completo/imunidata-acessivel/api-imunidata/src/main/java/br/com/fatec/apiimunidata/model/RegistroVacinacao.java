package br.com.fatec.apiimunidata.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class RegistroVacinacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate dataVacinacao;
    private String viaAdministracao;
    private String categoriaGrupoDeVacinacao;
    @Embedded
    private DoseVacina doseVacina;
    @Embedded
    private Paciente paciente;
    @Embedded
    private Estabelecimento estabelecimento;

    public RegistroVacinacao() {
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public LocalDate getDataVacinacao() {
        return dataVacinacao;
    }
    public void setDataVacinacao(LocalDate dataVacinacao) {
        this.dataVacinacao = dataVacinacao;
    }

    public String getViaAdministracao() {
        return viaAdministracao;
    }

    public void setViaAdministracao(String viaAdministracao) {
        this.viaAdministracao = viaAdministracao;
    }

    public String getCategoriaGrupoDeVacinacao() {
        return categoriaGrupoDeVacinacao;
    }

    public void setCategoriaGrupoDeVacinacao(String categoriaGrupoDeVacinacao) {
        this.categoriaGrupoDeVacinacao = categoriaGrupoDeVacinacao;
    }
    public DoseVacina getDoseVacina() {
        return doseVacina;
    }
    public void setDoseVacina(DoseVacina doseVacina) {
        this.doseVacina = doseVacina;
    }
    public Paciente getPaciente() {
        return paciente;
    }
    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }
    public Estabelecimento getEstabelecimento() {
        return estabelecimento;
    }
    public void setEstabelecimento(Estabelecimento estabelecimento) {
        this.estabelecimento = estabelecimento;
    }

}
