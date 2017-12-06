package pucminas.otimizacao.models;

public class Ingrediente {
	private String nome;
	private double gasto;
	private String tipoRestricao;
	private double disponibilidade;
	
	public Ingrediente() {
		nome = "";
		gasto = 0.0;
		disponibilidade = 0.0;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public double getGasto() {
		return gasto;
	}
	
	public void setGasto(double gasto) {
		this.gasto = gasto;
	}
	
	public String getTipoRestricao() {
		return tipoRestricao;
	}
	
	public void setTipoRestricao(String tipoRestricao) {
		this.tipoRestricao = tipoRestricao;
	}
	
	public double getDisponibilidade() {
		return disponibilidade;
	}
	
	public void setDisponibilidade(double disponibilidade) {
		this.disponibilidade = disponibilidade;
	}
	
	public String getNome() {
		return nome;
	}
}
