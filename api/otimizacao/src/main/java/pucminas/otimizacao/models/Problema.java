package pucminas.otimizacao.models;

import java.util.ArrayList;
import java.util.List;

public class Problema {
	private String nome;
	private String objetivo;
	private List<Produto> produtos;

	public Problema() {
		produtos = new ArrayList<Produto>();
		nome = "";
		objetivo = "";
	}
	
	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}
	
	public void addProduto(Produto produto) {
		produtos.add(produto);
	}	
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getObjetivo() {
		return objetivo;
	}
	
	public void setObjetivo(String objetivo) {
		this.objetivo = objetivo;
	}
}