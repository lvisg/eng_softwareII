package br.com.fatec.apiimunidata.dto;

import com.opencsv.bean.CsvBindByName;

public class RegistroVacinacaoDTO {

    @CsvBindByName(column = "co_paciente")
    private String codigoPaciente;

    @CsvBindByName(column = "tp_sexo_paciente")
    private String sexoPaciente;

    @CsvBindByName(column = "no_raca_cor_paciente")
    private String racaPaciente;

    @CsvBindByName(column = "no_municipio_paciente")
    private String municipioPaciente;

    @CsvBindByName(column = "no_pais_paciente")
    private String paisPaciente;

    @CsvBindByName(column = "sg_uf_paciente")
    private String ufPaciente;

    @CsvBindByName(column = "ds_nacionalidade_paciente")
    private String nacionalidadePaciente;

    @CsvBindByName(column = "ds_condicao_maternal")
    private String condicaoMaternal;

    @CsvBindByName(column = "co_cnes_estabelecimento")
    private String codigoCnes;

    @CsvBindByName(column = "no_razao_social_estabelecimento")
    private String razaoSocial;

    @CsvBindByName(column = "no_fantasia_estalecimento") // typo da API
    private String nomeFantasia;

    @CsvBindByName(column = "no_municipio_estabelecimento")
    private String municipioEstabelecimento;

    @CsvBindByName(column = "sg_uf_estabelecimento")
    private String ufEstabelecimento;

    @CsvBindByName(column = "co_vacina")
    private String codigoVacina;

    @CsvBindByName(column = "sg_vacina")
    private String siglaVacina;

    @CsvBindByName(column = "ds_vacina")
    private String descricaoVacina;

    @CsvBindByName(column = "co_vacina_fabricante")
    private String codigoFabricante;

    @CsvBindByName(column = "ds_vacina_fabricante")
    private String fabricante;

    @CsvBindByName(column = "co_dose_vacina")
    private String codigoDose;

    @CsvBindByName(column = "ds_dose_vacina")
    private String descricaoDose;

    @CsvBindByName(column = "co_lote_vacina")
    private String loteVacina;

    @CsvBindByName(column = "dt_vacina")
    private String dataVacina;
    @CsvBindByName(column = "ds_via_administracao")
    private String viaAdministracao;
    @CsvBindByName(column = "ds_vacina_categoria_atendimento")
    private String categoriaGrupoVacinacao;

    @CsvBindByName(column = "nu_idade_paciente")
    private int idadePaciente;
    public int getIdadePaciente(){
        return idadePaciente;
    }
    public void setIdadePaciente(int idadePaciente){
        this.idadePaciente=idadePaciente;
    }
    public String getCodigoPaciente() {
        return codigoPaciente;
    }

    public void setCodigoPaciente(String codigoPaciente) {
        this.codigoPaciente = codigoPaciente;
    }

    public String getSexoPaciente() {
        return sexoPaciente;
    }

    public void setSexoPaciente(String sexoPaciente) {
        this.sexoPaciente = sexoPaciente;
    }

    public String getRacaPaciente() {
        return racaPaciente;
    }

    public void setRacaPaciente(String racaPaciente) {
        this.racaPaciente = racaPaciente;
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

    public String getNacionalidadePaciente() {
        return nacionalidadePaciente;
    }

    public void setNacionalidadePaciente(String nacionalidadePaciente) {
        this.nacionalidadePaciente = nacionalidadePaciente;
    }

    public String getCondicaoMaternal() {
        return condicaoMaternal;
    }

    public void setCondicaoMaternal(String condicaoMaternal) {
        this.condicaoMaternal = condicaoMaternal;
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

    public String getMunicipioEstabelecimento() {
        return municipioEstabelecimento;
    }

    public void setMunicipioEstabelecimento(String municipioEstabelecimento) {
        this.municipioEstabelecimento = municipioEstabelecimento;
    }

    public String getUfEstabelecimento() {
        return ufEstabelecimento;
    }

    public void setUfEstabelecimento(String ufEstabelecimento) {
        this.ufEstabelecimento = ufEstabelecimento;
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

    public String getDataVacina() {
        return dataVacina;
    }

    public void setDataVacina(String dataVacina) {
        this.dataVacina = dataVacina;
    }

    public String getViaAdministracao() {
        return viaAdministracao;
    }

    public void setViaAdministracao(String viaAdministracao) {
        this.viaAdministracao = viaAdministracao;
    }

    public String getCategoriaGrupoVacinacao() {
        return categoriaGrupoVacinacao;
    }

    public void setCategoriaGrupoVacinacao(String categoriaGrupoVacinacao) {
        this.categoriaGrupoVacinacao = categoriaGrupoVacinacao;
    }
}