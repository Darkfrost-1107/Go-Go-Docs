package gogodocs.backend.users;

import gogodocs.backend.documents.Documents;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class Users {
    @Id
    private UUID id;
    private String username;
    private String password;
    private String imageURL;
    private String email;
    private List<Documents> documentsList;
}
