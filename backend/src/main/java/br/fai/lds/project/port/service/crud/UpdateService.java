package br.fai.lds.project.port.service.crud;

public interface UpdateService<T> {

    void update(final int id, final T data);

}
