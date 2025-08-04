package br.fai.lds.project.controller;

import br.fai.lds.project.domain.UserModel;
import br.fai.lds.project.domain.dto.UpdatePasswordDto;
import br.fai.lds.project.domain.dto.UpdateUserDto;
import br.fai.lds.project.port.service.user.UserService;
import br.fai.lds.project.port.user.UserDao;
import lombok.Data;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Data
@RestController
@RequestMapping("/api/user") /// trecho usado no url do postman (http://localhost:8080/api/user/)
public class UserRestController { ///                                                  ********

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<UserModel>> getEntities(){
        List<UserModel> entities = userService.findAll();
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getEntityById(@PathVariable final int id){
        UserModel entity = userService.findById(id);

//        if(entity == null){
//            return ResponseEntity.notFound().build();
//        }
//
//        return ResponseEntity.ok(entity);

        return entity == null ?
                ResponseEntity.notFound().build() : ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>delete(@PathVariable final int id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<UserModel> create(@RequestBody final UserModel data){
        final int id = userService.create(data);

        final URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping
    public ResponseEntity<UserModel> update(@PathVariable final int id, @RequestBody final UpdateUserDto data){
        UserModel entity = data.toUserModel();
        userService.update(id, entity);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update-password")
    public ResponseEntity<Void> updatePassword(@RequestBody final UpdatePasswordDto data){

        final boolean response = userService.updatePassword(
                data.getId(),
                data.getOldPassword(),
                data.getNewPassword());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserModel> getEntityByEmail(@PathVariable final String email){
        final UserModel entity = userService.findByEmail(email);
            if(entity == null){
                return ResponseEntity.notFound().build();
            }
        return ResponseEntity.ok().body(entity);
    }
}
