package gogodocs.backend.models.documents;

import gogodocs.backend.models.users.Users;
import gogodocs.backend.models.users.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class DocumentsController {
    private final DocumentsService documentsService;
    private final UsersService usersService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/{documentId}/edit")
    // todo: test whether UUIDs sent from frontend work
    public void editDocument(@PathVariable("documentId") UUID documentId, DocumentsEditAction action) {
        Documents doc = documentsService.getCachedByUUID(documentId, true);
        doc.edit(action);
        messagingTemplate.convertAndSend(String.format("/%s/update", documentId), action);
    }

    @MessageMapping("/{documentId}/{userId}/save")
    public void saveDocument(@PathVariable("documentId") UUID documentId, @PathVariable("userId") UUID userId) {
        Documents doc = documentsService.getCachedByUUID(documentId, false);
        documentsService.saveDocument(doc);

        Users user = usersService.getById(userId);
        usersService.addDocument(user, doc);
        usersService.saveUser(user);
    }
}
