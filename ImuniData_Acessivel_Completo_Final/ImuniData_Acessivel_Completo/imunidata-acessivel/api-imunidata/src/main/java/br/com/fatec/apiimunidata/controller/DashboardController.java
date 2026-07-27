package br.com.fatec.apiimunidata.controller;

import br.com.fatec.apiimunidata.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/vacinacao/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;
    public DashboardController(DashboardService dashboardService){
        this.dashboardService=dashboardService;
    }
    @GetMapping("/contagem")
    public ResponseEntity<Integer> contaRegistros(){
        return ResponseEntity.ok(this.dashboardService.contaRegistros());
    }
    @GetMapping("/contagem/uf")
    public ResponseEntity<Map<String, Integer>> contaPorUf() {
        return ResponseEntity.ok(dashboardService.contaPorUf());
    }

}
