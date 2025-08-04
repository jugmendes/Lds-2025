package br.fai.lds.project.domain.dto;

import br.fai.lds.project.domain.Product;

public class UpdateProductDto {

    private int id;
    private String name;
    private double price;

    public Product toProduct(){
        final Product entity = new Product();

        entity.setId(id);
        entity.setName(name);
        entity.setPrice(price);

        return entity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
