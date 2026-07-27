package br.com.fatec.apiimunidata.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class DoseVacina {
    private String codigoDose;
    private String descricaoDose;
    private String loteVacina;

    @Embedded
    private Vacina vacina;
    public DoseVacina(){
    }
    public String getCodigoDose() {
        return codigoDose;
    }
    public void setCodigoDose(String codigoDose) {
        this.codigoDose = codigoDose;
    }
    public String getDescricaoDose() {
        return descricaoDose;
    }
    public void setDescricaoDose(String descricaoDose) {
        this.descricaoDose = descricaoDose;
    }
    public String getLoteVacina() {
        return loteVacina;
    }
    public void setLoteVacina(String loteVacina) {
        this.loteVacina = loteVacina;
    }
    public Vacina getVacina() {
        return vacina;
    }
    public void setVacina(Vacina vacina) {
        this.vacina = vacina;
    }
}
