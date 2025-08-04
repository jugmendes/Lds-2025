package br.fai.lds.project.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    private int id;
    private String email;
    private String password;
    private String fullname;
    private UserRole role;

    public enum UserRole{
        ADMINISTRATOR,
        USER
    }
}
