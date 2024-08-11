package gogodocs.backend.models.users;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository repository;

    public void saveUser(Users user) {
        repository.save(user);
    }
}
