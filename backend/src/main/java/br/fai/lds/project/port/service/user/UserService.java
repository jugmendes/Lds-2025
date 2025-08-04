package br.fai.lds.project.port.service.user;

import br.fai.lds.project.domain.UserModel;
import br.fai.lds.project.port.service.crud.CrudService;

public interface UserService extends CrudService<UserModel>, UpdatePasswordService, ReadByEmailService{



}
