package tn.esprit.pi.controllers;

import tn.esprit.pi.entities.Reclamation;
import tn.esprit.pi.entities.TypeReclamation;
import tn.esprit.pi.services.EmailService;
import tn.esprit.pi.services.IReclamationServices;
import tn.esprit.pi.services.ReclamationTypeGuesser;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pi.services.EmailService;
import tn.esprit.pi.services.IReclamationServices;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/reclamation")
@AllArgsConstructor
@RestController
public class ReclamationRestController {



    @Autowired
    private IReclamationServices iReclamationServices;

    @Autowired
    private EmailService emailService;




    @PostMapping("/addRec")
    public Reclamation addReclamation( @RequestBody Reclamation reclamation) {

        // Guess the type based on the description
        TypeReclamation guessedType = ReclamationTypeGuesser.guessType(reclamation.getDescription());

        reclamation.setType(guessedType); // Set the guessed type

        // Set the createdAt field to the current date and time
        reclamation.setCreatedAt(LocalDateTime.now());
        Reclamation newReclamation = iReclamationServices.addReclamation(reclamation);

        // Send email notification
        emailService.sendEmail(
                "daadsoufi01@gmail.com",
                "New Reclamation Created",
                "A new reclamation with ID: " + newReclamation.getIdRec() + " has been created."
        );

        return newReclamation;
    }

    @PostMapping("/sendPDF")
    public ResponseEntity<?> sendPDF(@RequestParam("file") MultipartFile file) {
        try {
            emailService.sendEmailWithAttachment(
                    "recipient@example.com", // Change to your desired email
                    "Reclamation PDF",
                    "Please find the PDF attached.",
                    file
            );
            return ResponseEntity.ok("PDF sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending PDF");
        }
    }

    @PutMapping("/updateRec")
    public Reclamation updateReclamation(@RequestBody Reclamation reclamation) {
        Reclamation existingReclamation = iReclamationServices.getById(reclamation.getIdRec());
        String previousState = existingReclamation.getEtat();
        String newState = reclamation.getEtat();

        // If the reclamation is updated to "solved", send an email notification
        if (!previousState.equals("solved") && newState.equals("solved")) {
            emailService.sendEmail(
                    "daadsoufi01@gmail.com", // Change to the recipient email
                    "Reclamation Solved",
                    "A reclamation with ID: " + reclamation.getIdRec() + " has been solved. Thank you for your patience."
            );
        }

        // Update the existing reclamation with new data
        existingReclamation.setDescription(reclamation.getDescription());
        existingReclamation.setEtat(reclamation.getEtat());

        // Update the reclamation in the service
        return iReclamationServices.updateReclamation(existingReclamation);
    }


    @DeleteMapping("/deleteRec/{idRec}")
    public void deleteReclamation(@PathVariable Long idRec) {
        iReclamationServices.deleteReclamation(idRec);
    }

    @GetMapping("/getRec/{idRec}")
    public Reclamation getIReclamation(@PathVariable Long idRec) {
        return iReclamationServices.getById(idRec);
    }


    @GetMapping("/allRec")
    public List<Reclamation> getAllReclamations() {
        return iReclamationServices.getAll();
    }

/*
    @PostMapping("/addRecUser/{idUser}")
    public Reclamation assignToUser(@PathVariable Long idUser, @RequestBody Reclamation reclamation) {
        Reclamation createdReclamation = iReclamationServices.addReclamationAndAssignToUser(reclamation, idUser);
        return createdReclamation;
    }

    @GetMapping("/getreclamationparuser/{idUser}")
    public List<Reclamation> getReclamationsByUser(@PathVariable Long idUser) {

        System.out.println("User ID : "+idUser);
        return iReclamationServices.getReclamationsByUser(idUser);
    }*/
}
