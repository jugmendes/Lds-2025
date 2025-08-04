package br.fai.lds.project.implementation.dao.fake;

import br.fai.lds.project.domain.Product;
import br.fai.lds.project.domain.UserModel;
import br.fai.lds.project.port.product.ProductDao;

import java.util.ArrayList;
import java.util.List;

public class ProductFakeDaoImpl implements ProductDao {
    private static List<Product> entities = new ArrayList<>();
    private static int ID = 0;

    public ProductFakeDaoImpl(){

        Product product1 = new Product(
                getNextId(),
                "Teclado Redragon",
                350.00
        );

        Product product2 = new Product(
                getNextId(),
                "Mouse HyperX",
                250.0
        );

        Product product3 = new Product(
                getNextId(),
                "Headset XingLing",
                150.0
        );

        entities.add(product1);
        entities.add(product2);
        entities.add(product3);
    }

    private int getNextId() {
        ID += 1;
        return ID;
    }

    @Override
    public int add(Product entity) {
        final int id = entity.getId();
        entity.setId(id);
        entities.add(entity);

        return id;
    }

    @Override
    public void remove(int id) {
        int productIndex = -1;

        for (int i = 0; i < entities.size(); i++) {
            final Product entity = entities.get(i);
            if(entity.getId() == id) {
                productIndex = i;
                break;
            }
        }

        if(productIndex == -1){
            return;
        }

        Product productRemoved = entities.remove(productIndex);
        System.out.println("Produto removido : " + productRemoved);
    }

    @Override
    public Product readById(int id) {
        for(Product entity : entities){
            if(entity.getId() == id){
                return entity;
            }
        }
        return null;
    }

    @Override
    public List<Product> readAll() {
        return entities;
    }

    @Override
    public void updateInformation(int id, Product entity) {
        for(Product data : entities){
            if(data.getId() == id){
                data.setName(entity.getName());
                break;
            }
        }
    }

    @Override
    public Product readByName(String name) {
        for(Product entity : entities){
            if(entity.getName().equals(name)){
                return entity;
            }
        }
        return null;
    }

    @Override
    public void updatePrice(int id, double price) {
        for(Product entity : entities){
            if(entity.getId() == id){
                entity.setPrice(price);
                return;
            }
        }
    }
}
