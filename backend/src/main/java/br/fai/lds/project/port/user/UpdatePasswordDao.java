package br.fai.lds.project.port.user;

public interface UpdatePasswordDao {

    boolean updatePassword(final int id, final String newPassword);
}
