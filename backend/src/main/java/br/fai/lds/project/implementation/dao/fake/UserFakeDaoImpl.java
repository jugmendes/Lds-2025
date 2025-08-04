package br.fai.lds.project.implementation.dao.fake;

import br.fai.lds.project.domain.UserModel;
import br.fai.lds.project.port.user.UserDao;
import org.apache.catalina.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

//@Repository
public class UserFakeDaoImpl implements UserDao {

    private static List<UserModel> entities = new ArrayList<>();
    private static int ID = 0;

    public UserFakeDaoImpl(){

        UserModel entity1 = new UserModel(
                getNextId(),
                "tiburssin@gmail.com",
                "123",
                "Tiburssin Tiburssius",
                UserModel.UserRole.ADMINISTRATOR);

        UserModel entity2 = new UserModel();
        entity2.setId(getNextId());
        entity2.setEmail("aroldo@gmail.com");
        entity2.setPassword("456");
        entity2.setFullname("Aroldo Aroldus");
        entity2.setRole(UserModel.UserRole.USER);

        UserModel entity3 = new UserModel(
                getNextId(),
                "toninho@gmail.com",
                "789",
                "Toninho Toninhus",
                UserModel.UserRole.USER);

        UserModel entity4 = new UserModel(
                getNextId(),
                "gumercino@gmail.com",
                "159",
                "Gumercinho Matador",
                UserModel.UserRole.USER);

        entities.add(entity1);
        entities.add(entity2);
        entities.add(entity3);
        entities.add(entity4);
    }

    private int getNextId(){
        ID += 1;
        return ID;
    }

    @Override
    public int add(UserModel entity) {
        final int id = entity.getId();
        entity.setId(id);
        entities.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        int itemIndex = -1;

        for(int i = 0; i < entities.size(); i++){
            final UserModel entity = entities.get(i);
            if(entity.getId() == id){
                itemIndex = i;
                break;
            }
        }

        if(itemIndex == -1){
            return;
        }
        UserModel removedEntity = entities.remove(itemIndex);
        System.out.println("A entidade " + removedEntity.getFullname() + " foi removido com sucesso.");
    }

    @Override
    public UserModel readById(int id) {
        for(UserModel entity : entities){
            if(entity.getId() == id){
                return entity;
            }
        }
        return null;
    }

    @Override
    public List<UserModel> readAll() {
        return entities;
    }

    @Override
    public void updateInformation(int id, UserModel entity) {
        for(UserModel data : entities){
            if(data.getId() == id){
                data.setFullname(entity.getFullname());
                break;
            }
        }
    }

    @Override
    public UserModel readByEmail(String email) {
        for(UserModel entity : entities){
            if(entity.getEmail().equalsIgnoreCase(email)){
                return entity;
            }
        }
        return null;
    }

    @Override
    public boolean updatePassword(int id, String newPassword) {
        boolean response = false;

        for (UserModel entity : entities) {
            if (entity.getId() == id) {
                entity.setPassword(newPassword);
                response = true;
                break;
            }
        }
        return response;
    }
}
