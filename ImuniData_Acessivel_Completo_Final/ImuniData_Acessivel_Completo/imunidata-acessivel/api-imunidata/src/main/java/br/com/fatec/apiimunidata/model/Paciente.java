package br.com.fatec.apiimunidata.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Paciente {
    private String codigoPaciente;
    private String sexo;
    private String raca;
    private String municipioPaciente;
    private String paisPaciente;
    private String ufPaciente;
    private String nacionalidade;
    private String status;
    private String etniaIndigena;
    private String condicaoMaternal;
    private int idade;

    public Paciente() {
    }
    public String getCodigoPaciente() {
        return codigoPaciente;
    }
    public void setCodigoPaciente(String codigoPaciente) {
        this.codigoPaciente = codigoPaciente;
    }
    public String getSexo() {
        return sexo;
    }
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
    public String getRaca() {
        return raca;
    }
    public void setRaca(String raca) {
        this.raca = raca;
    }
    public String getMunicipioPaciente() {
        return municipioPaciente;
    }
    public void setMunicipioPaciente(String municipioPaciente) {
        this.municipioPaciente = municipioPaciente;
    }
    public String getPaisPaciente() {
        return paisPaciente;
    }
    public void setPaisPaciente(String paisPaciente) {
        this.paisPaciente = paisPaciente;
    }
    public String getUfPaciente() {
        return ufPaciente;
    }
    public void setUfPaciente(String ufPaciente) {
        this.ufPaciente = ufPaciente;
    }
    public String getNacionalidade() {
        return nacionalidade;
    }
    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getEtniaIndigena() {
        return etniaIndigena;
    }
    public void setEtniaIndigena(String etniaIndigena) {
        this.etniaIndigena = etniaIndigena;
    }
    public String getCondicaoMaternal() {
        return condicaoMaternal;
    }
    public void setCondicaoMaternal(String condicaoMaternal) {
        this.condicaoMaternal = condicaoMaternal;
    }
    public int getIdade() {
        return idade;
    }
    public void setIdade(int idade) {
        this.idade = idade;
    }
    public void setMunicipio(String municipioPaciente) {
        this.municipioPaciente=municipioPaciente;
    }
}
