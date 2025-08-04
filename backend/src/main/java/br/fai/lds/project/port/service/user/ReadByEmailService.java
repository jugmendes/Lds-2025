package br.fai.lds.project.port.service.user;

import br.fai.lds.project.domain.UserModel;

public interface ReadByEmailService {

    UserModel findByEmail(final String email);

}
