package br.fai.lds.project.port.service.product;

import br.fai.lds.project.domain.Product;
import br.fai.lds.project.port.service.crud.CrudService;

public interface ProductService extends CrudService<Product>, ReadByNameService, UpdatePriceService {
}
