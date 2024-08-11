package gogodocs.backend.models.users;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface UsersRepository extends MongoRepository<Users, UUID> {
    public Optional<Users> findByUsername(String username);
}
