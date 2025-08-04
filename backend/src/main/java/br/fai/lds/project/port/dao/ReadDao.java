package br.fai.lds.project.port.dao;

import java.util.List;

public interface ReadDao<T> {

    T readById(final int id);

    List<T> readAll();
}
