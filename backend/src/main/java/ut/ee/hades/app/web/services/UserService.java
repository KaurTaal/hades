package ut.ee.hades.app.web.services;

import ut.ee.hades.app.web.model.dto.UserDTO;

import java.util.List;

public interface UserService {


    List<UserDTO> getAllUsers();

    UserDTO activateUser(Long userId);

    UserDTO deactivateUser(Long userId);

    UserDTO changeToAdmin(Long userId);

    UserDTO changeToUser(Long userId);

    void deleteUserById(Long userId);
}
