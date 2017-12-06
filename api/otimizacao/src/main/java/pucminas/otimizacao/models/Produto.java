package pucminas.otimizacao.models;

import java.util.ArrayList;
import java.util.List;

public class Produto {
	private String nome;
	private double lucro;
	private String tipoRestricao;
	private int valorRestricao;
	private List<Ingrediente> ingredientes;
	
	public Produto() {
		nome = "";
		lucro = 0.0;
		tipoRestricao = "";
		valorRestricao = 0;
		ingredientes = new ArrayList<Ingrediente>();
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public double getLucro() {
		return lucro;
	}

	public void setLucro(double lucro) {
		this.lucro = lucro;
	}
	
	public String getTipoRestricao() {
		return tipoRestricao;
	}

	public void setTipoRestricao(String tipoRestricao) {
		this.tipoRestricao = tipoRestricao;
	}

	public int getValorRestricao() {
		return valorRestricao;
	}

	public void setValorRestricao(int valorRestricao) {
		this.valorRestricao = valorRestricao;
	}

	public List<Ingrediente> getIngredientes() {
		return ingredientes;
	}

	public void setIngredientes(List<Ingrediente> ingredientes) {
		this.ingredientes = ingredientes;
	}
}