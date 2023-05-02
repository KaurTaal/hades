package ut.ee.hades.app.web.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ut.ee.hades.app.dao.entity.UserEntity;
import ut.ee.hades.app.dao.repository.UserRepository;
import ut.ee.hades.app.enums.RoleEnum;
import ut.ee.hades.app.enums.StatusEnum;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertWarningException;
import ut.ee.hades.app.web.model.dto.UserDTO;
import ut.ee.hades.app.web.services.UserService;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserEntity> userEntityList = userRepository.findAll();
        return UserDTO.mapList(userEntityList);
    }

    @Override
    public UserDTO activateUser(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_FOUND.getName()));

        if (StatusEnum.ACTIVATED.equals(userEntity.getStatus())) {
            throw new UiAlertWarningException(UiAlertEnum.HADES_USER_ALREADY_ACTIVATED.getName());
        }

        userEntity.setStatus(StatusEnum.ACTIVATED);
        userRepository.save(userEntity);
        return UserDTO.map(userEntity);
    }

    @Override
    public UserDTO deactivateUser(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_FOUND.getName()));

        if (StatusEnum.REGISTERED.equals(userEntity.getStatus())) {
            throw new UiAlertWarningException(UiAlertEnum.HADES_USER_ALREADY_DEACTIVATED.getName());
        }

        userEntity.setStatus(StatusEnum.REGISTERED);
        userRepository.save(userEntity);
        return UserDTO.map(userEntity);
    }

    @Override
    public UserDTO changeToAdmin(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_FOUND.getName()));

        if (RoleEnum.ADMIN.equals(userEntity.getRole())) {
            throw new UiAlertWarningException(UiAlertEnum.HADES_USER_ALREADY_ADMIN.getName());
        }

        userEntity.setRole(RoleEnum.ADMIN);
        userRepository.save(userEntity);
        return UserDTO.map(userEntity);
    }

    @Override
    public UserDTO changeToUser(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_FOUND.getName()));

        if (RoleEnum.USER.equals(userEntity.getRole())) {
            throw new UiAlertWarningException(UiAlertEnum.HADES_USER_ALREADY_REGULAR_USER.getName());
        }

        userEntity.setRole(RoleEnum.USER);
        userRepository.save(userEntity);
        return UserDTO.map(userEntity);
    }

    @Override
    public void deleteUserById(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_FOUND.getName()));
        userRepository.deleteById(userEntity.getUserId());
    }
}
