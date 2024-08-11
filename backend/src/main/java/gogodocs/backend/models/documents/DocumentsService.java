package gogodocs.backend.models.documents;

import gogodocs.backend.exceptions.DocumentNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentsService {
    private final DocumentsRepository repository;
    private final Map<UUID, Documents> documents; // cache en 2024

    public DocumentsService(DocumentsRepository repository) {
        this.repository = repository;
        this.documents = new HashMap<>();
    }

    public Documents getCachedByUUID(UUID uuid, boolean createNew) {
        if (documents.containsKey(uuid)) {
            return documents.get(uuid);
        } else {
            DocumentsDTO dto = repository.findById(uuid)
                    .or(() -> {
                        if (createNew) {
                            DocumentsDTO newDTO = new DocumentsDTO();
                            return Optional.of(newDTO);
                        }
                        return Optional.empty();
                    })
                    .orElseThrow(() -> new DocumentNotFound(uuid.toString()));
            return new Documents(dto);
        }
    }

    public void saveDocument(Documents document) {
        repository.save(document.toDTO());
    }
}
