package br.fai.lds.project.implementation.service.user;

import br.fai.lds.project.domain.Product;
import br.fai.lds.project.port.product.ProductDao;
import br.fai.lds.project.port.service.product.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductDao productDao;

    public ProductServiceImpl(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Override
    public int create(Product entity) {
        int invalidResponse = -1;

        if(entity == null){
            return invalidResponse;
        }

        if(entity.getName().isEmpty()){
            return invalidResponse;
        }

        final int id = productDao.add(entity);
        return id;
    }

    @Override
    public void delete(int id) {
        if(id < 0){
            return;
        }

        productDao.remove(id);
    }

    @Override
    public Product findById(int id) {
        if(id < 0){
            return null;
        }

        Product entity = productDao.readById(id);
        return entity;
    }

    @Override
    public List<Product> findAll() {
        return productDao.readAll();
    }

    @Override
    public void update(int id, Product data) {
        if(data.getId() != id){
            return;
        }

        Product product = productDao.readById(id);
        if(product == null){
            return;
        }

        productDao.updateInformation(id, data);
    }

    @Override
    public Product readByName(String name) {

        if(name.isEmpty()){
            return null;
        }

        return productDao.readByName(name);
    }

    @Override
    public void updatePrice(int id, double price) {

        if(productDao.readById(id) == null){
            return;
        }

        productDao.updatePrice(id, price);
    }
}
