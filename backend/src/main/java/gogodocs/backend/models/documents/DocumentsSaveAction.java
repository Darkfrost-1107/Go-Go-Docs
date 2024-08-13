package gogodocs.backend.models.documents;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class DocumentsSaveAction {
    private boolean newCopy;
}

/*
{
    ownCopy: true
}
 */