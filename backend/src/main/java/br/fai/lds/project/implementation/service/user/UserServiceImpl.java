package br.fai.lds.project.implementation.service.user;

import br.fai.lds.project.domain.UserModel;
import br.fai.lds.project.port.service.user.UserService;
import br.fai.lds.project.port.user.UserDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public int create(UserModel entity) {
        int invalidResponse = -1;
        if(entity == null){
            return invalidResponse;
        }

        if(entity.getFullname().isEmpty()
        || entity.getPassword().isEmpty()
        || entity.getEmail().isEmpty()
        || isPasswordInvalid(entity.getPassword())){
            return invalidResponse;
        }

        final int id = userDao.add(entity);
        return id;
    }

    private boolean isPasswordInvalid(final String password) {
        if(password.isEmpty()){
            return true;
        }

        if(password.length() < 3){
            return true;
        }

        return false;
    }

    @Override
    public void delete(int id) {
        if(id < 0){
            return;
        }

        userDao.remove(id);
    }

    @Override
    public UserModel findById(int id) {
        if(id < 0){
            return null;
        }
        UserModel entity = userDao.readById(id);
        return entity;
    }

    @Override
    public List<UserModel> findAll() {
        final List<UserModel> entities = userDao.readAll();
        return entities;
    }

    @Override
    public void update(int id, UserModel entity) {

        if(id != entity.getId()){
            return;
        }

        UserModel userModel = findById(id);
        if (userModel == null){
            return;
        }

        userDao.updateInformation(id, entity);
    }

    public UserModel findByEmail(String email){
        if(email.isEmpty()){
            return null;
        }
        UserModel user = userDao.readByEmail(email);
        return user;
    }

    @Override
    public boolean updatePassword(int id, String oldPassword, String newPassword) {

        UserModel user = findById(id);
        if(user == null){
            return false;
        }

        if(!user.getPassword().equals(oldPassword)){
            return false;
        }

        if(isPasswordInvalid(newPassword)){
            return false;
        }

        boolean response = userDao.updatePassword(id, newPassword);
        return response;
    }
}
