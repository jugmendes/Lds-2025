package br.fai.lds.project.port.product;

import br.fai.lds.project.domain.Product;

public interface ReadByNameDao {

    Product readByName(final String name);
}
