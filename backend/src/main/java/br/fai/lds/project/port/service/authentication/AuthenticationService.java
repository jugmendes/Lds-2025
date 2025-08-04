package br.fai.lds.project.port.service.authentication;

import br.fai.lds.project.domain.UserModel;

public interface AuthenticationService {

    UserModel authenticate(final String email, final String password);
}
