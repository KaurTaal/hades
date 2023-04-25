package ut.ee.hades.app.web.controllers.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ut.ee.hades.app.security.security.AuthenticationRequest;
import ut.ee.hades.app.security.security.AuthenticationResponse;
import ut.ee.hades.app.security.security.RegisterRequest;
import ut.ee.hades.app.security.service.AuthenticationService;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest request) {
        return authenticationService.authenticate(request);
    }
}