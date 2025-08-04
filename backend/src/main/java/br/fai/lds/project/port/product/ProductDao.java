package br.fai.lds.project.port.product;

import br.fai.lds.project.domain.Product;
import br.fai.lds.project.port.dao.CrudDao;

public interface ProductDao extends CrudDao<Product>, ReadByNameDao, UpdatePriceDao {
}
