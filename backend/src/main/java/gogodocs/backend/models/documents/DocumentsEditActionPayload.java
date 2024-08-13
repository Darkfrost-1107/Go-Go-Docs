package gogodocs.backend.models.documents;

import gogodocs.backend.util.Range;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentsEditActionPayload {
    private Range range;
    private EditAction action;
    private String text;
    private String username;
}

/*
{
    range: {
        start: 0,
        end: 0
    },
    action: "INSERT", // INSERT, REPLACE, DELETE, CHANGE_TITLE
    text: "string",
    username: "string"
}
 */
