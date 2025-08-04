package br.fai.lds.project.port.user;

import br.fai.lds.project.domain.UserModel;
import br.fai.lds.project.port.dao.CrudDao;

public interface UserDao extends CrudDao<UserModel>, ReadByEmailDao, UpdatePasswordDao {

}
