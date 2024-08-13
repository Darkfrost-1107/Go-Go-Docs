package gogodocs.backend.models.documents;

import gogodocs.backend.models.users.Users;
import gogodocs.backend.models.users.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class DocumentsController {
    private final DocumentsService documentsService;
    private final UsersService usersService;
    private final SimpMessagingTemplate messagingTemplate;

    @PutMapping("/create")
    public ResponseEntity<DocumentsCreateActionPayload> createDocument() {
        Documents doc = documentsService.createCachedDocument();
        DocumentsCreateActionPayload payload = new DocumentsCreateActionPayload(doc.getId().toString());
        return new ResponseEntity<>(payload, HttpStatus.CREATED);
    }

    @MessageMapping("/{documentId}.edit")
    // todo: test whether UUIDs sent from frontend work
    public void editDocument(@PathVariable("documentId") UUID documentId, DocumentsEditAction action, @AuthenticationPrincipal Users user) {
        Documents doc = documentsService.getCachedByUUID(documentId);
        doc.edit(action);

        DocumentsEditActionPayload payload = new DocumentsEditActionPayload(action.getRange(), action.getAction(), action.getText(), user.getUsername());
        messagingTemplate.convertAndSend(String.format("/%s/update", documentId), payload);
    }

    @MessageMapping("/{documentId}.save")
    // todo: i feel like something is missing here, cant quite point what
    public void saveDocument(@PathVariable("documentId") UUID documentId, DocumentsSaveAction action, @AuthenticationPrincipal Users user) {
        Documents doc = documentsService.getCachedByUUID(documentId);
        documentsService.saveDocument(doc);

        if (action.isNewCopy()) {
            Documents newDoc = documentsService.createCopy(doc);
            usersService.addDocument(user, newDoc);
        }

        DocumentsSaveActionPayload payload = new DocumentsSaveActionPayload(user.getUsername());
        messagingTemplate.convertAndSend(String.format("/%s/save", documentId), payload);
    }
}
