package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.UserEntity;
import ut.ee.hades.app.enums.RoleEnum;
import ut.ee.hades.app.enums.StatusEnum;

import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long userId;
    private String email;
    private RoleEnum role;
    private StatusEnum status;
    private Boolean isActivated;


    public static List<UserDTO> mapList(List<UserEntity> userEntities) {
        List<UserDTO> userDTOList = new LinkedList<>();
        userEntities.forEach(user -> userDTOList.add(UserDTO.map(user)));
        return userDTOList;
    }

    public static UserDTO map(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(userEntity.getUserId());
        userDTO.setStatus(userEntity.getStatus());
        userDTO.setRole(userEntity.getRole());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setIsActivated(StatusEnum.ACTIVATED.equals(userEntity.getStatus()));
        return userDTO;
    }

}
