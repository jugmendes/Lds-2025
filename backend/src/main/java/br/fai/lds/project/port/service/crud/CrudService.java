package br.fai.lds.project.port.service.crud;

public interface CrudService<T> extends CreateService<T>, DeleteService, ReadService<T>, UpdateService<T>{



}
