package gogodocs.backend.models.documents;

import gogodocs.backend.util.Range;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Documents {
    private UUID id;
    private String title;
    private StringBuilder content;

    public Documents(DocumentsDTO documentsDTO) {
        this.id = documentsDTO.getId();
        this.title = documentsDTO.getTitle();
        this.content = new StringBuilder(documentsDTO.getContent());
    }

    public void edit(DocumentsEditAction action) {
        Range range = action.getRange();
        String newText = action.getText();
        int start = range.getStart();
        int end = range.getEnd();

        switch (action.getAction()) {
            case INSERT:
                content.insert(start, newText);
                break;
            case REPLACE:
                content.replace(start, end + 1, newText);
                break;
            case DELETE:
                content.delete(start, end + 1);
                break;
            case CHANGE_TITLE:
                setTitle(newText);
            default:
                throw new IllegalArgumentException("Invalid action");
        }
    }

    public DocumentsDTO toDTO() {
        return new DocumentsDTO(id, title, content.toString());
    }

    public String getURL() {
        // todo: implement
    }
}
