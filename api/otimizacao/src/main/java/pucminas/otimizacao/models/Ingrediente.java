package pucminas.otimizacao.models;

public class Ingrediente {
	private String nome;
	private double gasto;
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
