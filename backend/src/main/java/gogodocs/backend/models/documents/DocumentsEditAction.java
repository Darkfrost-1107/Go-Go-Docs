package gogodocs.backend.models.documents;

import gogodocs.backend.util.Range;
import lombok.Data;

@Data
public class DocumentsEditAction {
    private Range range;
    private EditAction action;
    private String text;
}

/*
{
    range: {
        start: 0,
        end: 0
    },
    action: "INSERT", // INSERT, REPLACE, DELETE, CHANGE_TITLE
    text: "string"
}
 */
