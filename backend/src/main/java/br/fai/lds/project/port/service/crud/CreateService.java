package br.fai.lds.project.port.service.crud;

public interface CreateService<T> {

    int create(final T entity);

}
