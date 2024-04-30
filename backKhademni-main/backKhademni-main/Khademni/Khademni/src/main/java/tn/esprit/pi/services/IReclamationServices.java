package tn.esprit.pi.services;

import tn.esprit.pi.entities.Reclamation;

import java.util.List;

public interface IReclamationServices {

    Reclamation addReclamation(Reclamation reclamation);

    Reclamation updateReclamation(Reclamation reclamation);

    void deleteReclamation(Long idRec);

    Reclamation getById(Long idRec);
    List<Reclamation> getAll();
/*
    Reclamation addReclamationAndAssignToUser(Reclamation reclamation, Long idUser);

    List<Reclamation> getReclamationsByUser(Long idRec);*/
}
