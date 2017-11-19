package pucminas.otimizacao.models;

import java.util.ArrayList;
import java.util.List;

public class Produto {
	private String nome;
	private Double lucro;
	private List<Ingrediente> ingredientes;
	
	public Produto() {
		ingredientes = new ArrayList<Ingrediente>();
		nome = "";
		lucro = 0.0;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Double getLucro() {
		return lucro;
	}

	public void setLucro(Double lucro) {
		this.lucro = lucro;
	}

	public List<Ingrediente> getIngredientes() {
		return ingredientes;
	}

	public void setIngredientes(List<Ingrediente> ingredientes) {
		this.ingredientes = ingredientes;
	}
}