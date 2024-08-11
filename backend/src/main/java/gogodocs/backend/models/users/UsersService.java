package gogodocs.backend.models.users;

import gogodocs.backend.exceptions.UserNotFound;
import gogodocs.backend.models.documents.Documents;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository repository;

    public void saveUser(Users user) {
        repository.save(user);
    }

    public Users getById(UUID uuid) {
        return repository.findById(uuid).orElseThrow(() -> new UserNotFound(uuid.toString()));
    }

    public void addDocument(Users user, Documents document) {
        user.getDocumentsList().add(document);
    }
}
