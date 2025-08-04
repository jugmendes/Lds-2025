package br.fai.lds.project.port.dao;

public interface CrudDao<T> extends CreateDao<T>, DeleteDao, ReadDao<T>, UpdateDao<T>{

}
