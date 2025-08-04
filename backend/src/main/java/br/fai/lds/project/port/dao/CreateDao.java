package br.fai.lds.project.port.dao;

public interface CreateDao<T> {

    int add(final T entity);
}
