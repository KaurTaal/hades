package ut.ee.hades.app.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ut.ee.hades.app.dao.entity.UserEntity;
import ut.ee.hades.app.dao.repository.UserRepository;
import ut.ee.hades.app.enums.RoleEnum;
import ut.ee.hades.app.enums.StatusEnum;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertWarningException;
import ut.ee.hades.app.security.security.AuthenticationRequest;
import ut.ee.hades.app.security.security.AuthenticationResponse;
import ut.ee.hades.app.security.security.RegisterRequest;
import ut.ee.hades.app.util.AuthUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        if (email.isEmpty() || password.isEmpty() || !AuthUtils.isValidEmail(email)) {
            throw new UiAlertWarningException(UiAlertEnum.BAD_CREDENTIALS_ERROR.getName());
        }

        Optional<UserEntity> byEmail = userRepository.findByEmail(email);
        if (byEmail.isPresent()) {
            throw new UiAlertWarningException(UiAlertEnum.HADES_USER_EXISTS_ERROR.getName());
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(email);
        userEntity.setPassword(passwordEncoder.encode(password));
        userEntity.setRole(RoleEnum.USER);
        userEntity.setStatus(StatusEnum.REGISTERED);

        userRepository.save(userEntity);

        String token = jwtService.generateToken(userEntity);
        return AuthenticationResponse.builder().accessToken(token).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UserEntity userEntity = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_FOUND.getName()));

        if (StatusEnum.REGISTERED.equals(userEntity.getStatus())) {
            throw new UiAlertWarningException(UiAlertEnum.HADES_USER_NOT_ACTIVATED.getName());
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        String token = jwtService.generateToken(userEntity);
        return AuthenticationResponse.builder().accessToken(token).build();
    }
}
