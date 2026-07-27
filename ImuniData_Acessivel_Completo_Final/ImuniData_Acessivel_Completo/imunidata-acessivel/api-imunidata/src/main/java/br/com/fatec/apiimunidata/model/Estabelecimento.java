package br.com.fatec.apiimunidata.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Estabelecimento {
    private String codigoCnes;
    private String razaoSocial;
    private String nomeFantasia;
    private String municipio;
    private String uf;

    public Estabelecimento() {
    }
    public String getCodigoCnes() {
        return codigoCnes;
    }
    public void setCodigoCnes(String codigoCnes) {
        this.codigoCnes = codigoCnes;
    }
    public String getRazaoSocial() {
        return razaoSocial;
    }
    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }
    public String getNomeFantasia() {
        return nomeFantasia;
    }
    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }
    public String getMunicipio() {
        return municipio;
    }
    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }
    public String getUf() {
        return uf;
    }
    public void setUf(String uf) {
        this.uf = uf;
    }
}
