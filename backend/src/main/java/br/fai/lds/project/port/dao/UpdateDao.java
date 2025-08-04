package br.fai.lds.project.port.dao;

public interface UpdateDao<T> {

    void updateInformation(final int id, final T entity);
}
