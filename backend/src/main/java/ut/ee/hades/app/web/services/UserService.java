package ut.ee.hades.app.web.services;

import ut.ee.hades.app.web.model.dto.UserDTO;

import java.util.List;

public interface UserService {

    /**
     * Retrieves all system users
     * @return - all users
     */
    List<UserDTO> getAllUsers();


    /**
     * Activates registered user
     * @param userId - target user id
     * @return - user with status set as activated
     */
    UserDTO activateUser(Long userId);


    /**
     * Deactivates system user
     * @param userId - target user id
     * @return - user with status set as registered
     */
    UserDTO deactivateUser(Long userId);


    /**
     * Changes user to system admin
     * @param userId - target user id
     * @return - user set as admin
     */
    UserDTO changeToAdmin(Long userId);


    /**
     * Changes user to regular system user
     * @param userId - target user id
     * @return - user set to regular user
     */
    UserDTO changeToUser(Long userId);


    /**
     * Deletes the user with given id
     * @param userId - user id
     */
    void deleteUserById(Long userId);
}
