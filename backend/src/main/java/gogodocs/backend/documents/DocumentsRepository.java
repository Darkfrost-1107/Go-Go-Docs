package gogodocs.backend.documents;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentsRepository extends MongoRepository<Documents, String> {
}
