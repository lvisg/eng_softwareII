package br.com.fatec.apiimunidata.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Vacina {
    private String codigoVacina;
    private String siglaVacina;
    private String descricaoVacina;
    private String codigoFabricante;
    private String fabricante;

    public Vacina() {
    }
    public String getCodigoVacina() {
        return codigoVacina;
    }
    public void setCodigoVacina(String codigoVacina) {
        this.codigoVacina = codigoVacina;
    }
    public String getSiglaVacina() {
        return siglaVacina;
    }
    public void setSiglaVacina(String siglaVacina) {
        this.siglaVacina = siglaVacina;
    }
    public String getDescricaoVacina() {
        return descricaoVacina;
    }
    public void setDescricaoVacina(String descricaoVacina) {
        this.descricaoVacina = descricaoVacina;
    }
    public String getCodigoFabricante() {
        return codigoFabricante;
    }
    public void setCodigoFabricante(String codigoFabricante) {
        this.codigoFabricante = codigoFabricante;
    }
    public String getFabricante() {
        return fabricante;
    }
    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }
}
