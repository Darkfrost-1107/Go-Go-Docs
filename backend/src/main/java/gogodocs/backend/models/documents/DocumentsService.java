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

    public Documents createCachedDocument() {
        Documents doc = new Documents();
        documents.put(doc.getId(), doc);
        return doc;
    }

    public Documents getCachedByUUID(UUID uuid) {
        if (documents.containsKey(uuid)) {
            return documents.get(uuid);
        } else {
            DocumentsDTO dto = repository.findById(uuid).orElseThrow(() -> new DocumentNotFound(uuid.toString()));
            Documents doc = new Documents(dto);
            documents.put(uuid, doc);
            return doc;
        }
    }

    public Documents createCopy(Documents document) {
        Documents copy = new Documents(document);
        documents.put(copy.getId(), copy);
        return copy;
    }

    public void saveDocument(Documents document) {
        repository.save(document.toDTO());
    }
}
