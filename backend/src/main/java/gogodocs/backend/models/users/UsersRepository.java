package gogodocs.backend.models.users;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<Users, String> {
    public Optional<Users> findByUsername(String username);
}
