package gogodocs.backend.models.documents;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentsCreateActionPayload {
    private String id;
}

/*
{
    id: "string"
}
 */