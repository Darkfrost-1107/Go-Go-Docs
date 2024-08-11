package gogodocs.backend.users;

import gogodocs.backend.documents.Documents;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface UsersRepository extends MongoRepository<Users, String> {
}
