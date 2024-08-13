package gogodocs.backend.models.documents;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface DocumentsRepository extends MongoRepository<DocumentsDTO, UUID> {
}
