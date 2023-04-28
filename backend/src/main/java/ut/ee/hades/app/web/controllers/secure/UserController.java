package ut.ee.hades.app.web.controllers.secure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ut.ee.hades.app.web.model.dto.UserDTO;
import ut.ee.hades.app.web.services.UserService;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("@securityService.isAdmin()")
public class UserController {

    private final UserService userService;

    @GetMapping(path = "/getAllUsers")
    public @ResponseBody List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping(path = "/activateUser/{userId}")
    public UserDTO activateUser(@PathVariable Long userId) {
        return userService.activateUser(userId);
    }

    @PutMapping(path = "/deactivateUser/{userId}")
    public UserDTO deactivateUser(@PathVariable Long userId) {
        return userService.deactivateUser(userId);
    }

    @PutMapping(path = "/changeToAdmin/{userId}")
    public UserDTO changeToAdmin(@PathVariable Long userId) {
        return userService.changeToAdmin(userId);
    }

    @PutMapping(path = "/changeToUser/{userId}")
    public UserDTO changeToUser(@PathVariable Long userId) {
        return userService.changeToUser(userId);
    }

    @DeleteMapping(path = "/deleteById/{userId}")
    public void deleteById(@PathVariable Long userId) {
        userService.deleteUserById(userId);
    }
}
