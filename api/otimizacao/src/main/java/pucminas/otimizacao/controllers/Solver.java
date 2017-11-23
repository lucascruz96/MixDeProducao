package pucminas.otimizacao.controllers;

import java.text.DecimalFormat;

import org.gnu.glpk.GLPK;
import org.gnu.glpk.GLPKConstants;
import org.gnu.glpk.SWIGTYPE_p_double;
import org.gnu.glpk.SWIGTYPE_p_int;
import org.gnu.glpk.glp_prob;
import org.gnu.glpk.glp_smcp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pucminas.otimizacao.models.Problema;

@CrossOrigin
@RestController
public class Solver {

	@RequestMapping(value = "/solver", method = RequestMethod.GET)
	public String resolver() {
		try {
			return "Versão do GLPK: " + GLPK.glp_version();
		} catch (Exception ex) {
			return "POR CARGAS D'ÁGUA ESSE TREM TA FUNCIONANDO!!!";
		}
	}

	@RequestMapping(value = "/solver", method = RequestMethod.POST)
	public ResponseEntity<?> resolver(@RequestBody Problema problema) {
		glp_prob lp;
		glp_smcp parm;
		SWIGTYPE_p_int indices;
		SWIGTYPE_p_double valores;
		int resultado;
		String retorno;

		lp = GLPK.glp_create_prob();
		GLPK.glp_set_prob_name(lp, problema.getNome());

		GLPK.glp_add_cols(lp, problema.getProdutos().size());

		// Variaveis
		for (int j = 0; j < problema.getProdutos().size(); j++) {
			GLPK.glp_set_col_name(lp, (j + 1), problema.getProdutos().get(j).getNome());
			GLPK.glp_set_col_kind(lp, (j + 1), GLPKConstants.GLP_IV);
			GLPK.glp_set_col_bnds(lp, (j + 1), GLPKConstants.GLP_LO, 0, 0);
		}

		GLPK.glp_add_rows(lp, problema.getProdutos().get(0).getIngredientes().size());

		// Restrições
		for (int i = 0; i < problema.getProdutos().get(0).getIngredientes().size(); i++) {
			GLPK.glp_set_row_name(lp, (i + 1), problema.getProdutos().get(0).getIngredientes().get(i).getNome());
			
			GLPK.glp_set_row_bnds(lp, (i + 1), GLPKConstants.GLP_DB, 0,
					problema.getProdutos().get(0).getIngredientes().get(i).getDisponibilidade());

			indices = GLPK.new_intArray(problema.getProdutos().size() + 1);
			valores = GLPK.new_doubleArray(problema.getProdutos().size() + 1);

			for (int j = 0; j < problema.getProdutos().size(); j++) {
				GLPK.intArray_setitem(indices, (j + 1), (j + 1));
				
				GLPK.doubleArray_setitem(valores, (j + 1),
						problema.getProdutos().get(j).getIngredientes().get(i).getGasto());
			}

			GLPK.glp_set_mat_row(lp, (i + 1), 2, indices, valores);
		}

		// Definir objetivos
		GLPK.glp_set_obj_name(lp, "lucro");
		GLPK.glp_set_obj_dir(lp, GLPKConstants.GLP_MAX);

		for (int j = 0; j < problema.getProdutos().size(); j++) {
			GLPK.glp_set_obj_coef(lp, (j + 1), problema.getProdutos().get(j).getLucro());
		}

		// Solução
		parm = new glp_smcp();
		GLPK.glp_init_smcp(parm);
		resultado = GLPK.glp_simplex(lp, parm);

		if (resultado == 0) {
			retorno = montarSolucao(lp);
		} else {
			retorno = "Não há solução ótima para o problema";
		}

		return new ResponseEntity<String>(retorno, HttpStatus.OK);
	}

	private String montarSolucao(glp_prob lp) {
		int i;
		int n;
		String nome, resultado;
		double valor;
		DecimalFormat df = new DecimalFormat("0.##");

		nome = GLPK.glp_get_obj_name(lp);
		valor = GLPK.glp_get_obj_val(lp);

		resultado = "No resultado ótimo para este problema obtemos um ";
		resultado += nome + " de R$ " + df.format(valor) + ".";
		resultado += "<br>Para se chegar a este resultado é necessário a produção de: ";

		n = GLPK.glp_get_num_cols(lp);
		for (i = 1; i <= n; i++) {
			nome = GLPK.glp_get_col_name(lp, i);
			valor = GLPK.glp_get_col_prim(lp, i);

			resultado += "<br>" + df.format(valor) + " " + nome;
		}

		return resultado;
	}
}
