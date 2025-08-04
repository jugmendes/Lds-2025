package br.fai.lds.project.domain.dto;

import br.fai.lds.project.domain.UserModel;


// record
public class UpdateUserDto {

    private int id;
    private String fullname;

    public UserModel toUserModel(){
        final UserModel entity = new UserModel();
        entity.setId(id);
        entity.setFullname((fullname));
        return entity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
}
