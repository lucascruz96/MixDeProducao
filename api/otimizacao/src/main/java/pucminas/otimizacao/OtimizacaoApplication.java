package pucminas.otimizacao;

import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OtimizacaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(OtimizacaoApplication.class, args);
		carregarDll("glpk_4_63.dll");
		carregarDll("glpk_4_63_java.dll");
	}
	
	private static void carregarDll(String caminhoDll) {
		try {
			File dll = new File(caminhoDll);
			System.load(dll.getAbsolutePath());
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
