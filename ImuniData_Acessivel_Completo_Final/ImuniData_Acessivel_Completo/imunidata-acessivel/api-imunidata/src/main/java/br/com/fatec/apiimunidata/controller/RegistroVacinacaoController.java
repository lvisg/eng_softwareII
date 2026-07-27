package br.com.fatec.apiimunidata.controller;

import br.com.fatec.apiimunidata.model.RegistroVacinacao;
import br.com.fatec.apiimunidata.service.RegistroVacinacaoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/vacinacao")
public class RegistroVacinacaoController {
    private final RegistroVacinacaoService registroVacinacaoService;
    public RegistroVacinacaoController(RegistroVacinacaoService registroVacinacaoService){
        this.registroVacinacaoService=registroVacinacaoService;
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id){
        if(registroVacinacaoService.carregarId(id).isPresent()){
            this.registroVacinacaoService.deletar(id);
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public ResponseEntity<Page<RegistroVacinacao>> listar(@RequestParam(defaultValue = "0")  int page, @RequestParam(defaultValue = "30") int size, @RequestParam(required = false) String estado, @RequestParam(required = false) String faixaEtaria, @RequestParam(required = false)String vacina) {
        return ResponseEntity.ok(registroVacinacaoService.buscar(estado, faixaEtaria, vacina, page, size));
    }
    @GetMapping("/{id}")
    public ResponseEntity<RegistroVacinacao> carregar(@PathVariable Integer id){
        Optional<RegistroVacinacao> obj = registroVacinacaoService.carregarId(id);
        return obj.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<RegistroVacinacao> salvar(@RequestBody RegistroVacinacao registroVacinacao){
        registroVacinacaoService.salvar(registroVacinacao);
        return ResponseEntity.status(201).body(registroVacinacao);
    }
    @PutMapping("/{id}")
    public ResponseEntity<RegistroVacinacao> alterar(@RequestBody RegistroVacinacao registroVacinacao, @PathVariable Integer id){
        return registroVacinacaoService.alterar(registroVacinacao,id)
                .map(ResponseEntity :: ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
