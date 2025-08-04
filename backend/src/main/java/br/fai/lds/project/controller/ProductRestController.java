package br.fai.lds.project.controller;

import br.fai.lds.project.domain.Product;
import br.fai.lds.project.domain.dto.UpdateProductDto;
import br.fai.lds.project.port.service.product.ProductService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Data
@RestController
@RequestMapping("/api/product")
public class    ProductRestController {

    private final ProductService productService;

    public ProductRestController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getEntities(){
        List<Product> entities = productService.findAll();

        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getEntityById(@PathVariable final int id){
        Product entitiy = productService.findById(id);

        return entitiy == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(entitiy);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id){
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product entitiy){
        final int id = productService.create(entitiy);

        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping
    public ResponseEntity<Product> update(@PathVariable int id, @RequestBody final UpdateProductDto data){
        Product entity = data.toProduct();
        productService.update(entity.getId(), entity);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Product> getEntityByName(@PathVariable String name){
        Product entity = productService.readByName(name);

        return ResponseEntity.ok().body(entity);
    }
}
