package gogodocs.backend.documents;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentsService {
    private final DocumentsRepository repository;

    public void saveDocument(Documents document) {
        repository.save(document);
    }

}
