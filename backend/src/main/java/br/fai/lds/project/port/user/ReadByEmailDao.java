package br.fai.lds.project.port.user;

import br.fai.lds.project.domain.UserModel;

public interface ReadByEmailDao {

    UserModel readByEmail(final String email);
}
