package br.fai.lds.project.port.service.product;

import br.fai.lds.project.domain.Product;

public interface ReadByNameService {

    Product readByName(String name);
}
