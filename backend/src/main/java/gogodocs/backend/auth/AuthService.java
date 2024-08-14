package gogodocs.backend.auth;

import gogodocs.backend.jwt.JwtService;
import gogodocs.backend.models.users.Role;
import gogodocs.backend.models.users.Users;
import gogodocs.backend.models.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Transactional (rollbackFor = Exception.class)
@RequiredArgsConstructor
@Service
public class AuthService {
    private final UsersRepository usersRepository;;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login (LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                (loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails user = usersRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException
                        ("User with username " + loginRequest.getUsername() + " not found"));
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register (RegisterRequest registerRequest) {
        Users user = Users.builder()
                .id(UUID.randomUUID())
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .imageURL(registerRequest.getImageURL())
                .email(registerRequest.getEmail())
                .role(Role.USER)
                .build();

        usersRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public UserDTO me (UUID id) {
        Users user = usersRepository.findById(id)
                .orElseThrow(() ->  new RuntimeException("User not found"));
        return UserDTO.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .imageURL(user.getImageURL())
                .build();
    }
}
