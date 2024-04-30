import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OffreService } from '../services/offre.service';
import { UserService } from '../services/user.service';
import { User } from '../Models/user/user';
import { Offre } from '../Models/user/offre';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  newOffre: Offre = {}; 

  constructor(
    private offreService: OffreService,
    private userService: UserService, 
   
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        
        if (user) {
          this.newOffre.user = { ...this.newOffre.user, id: user.id };
          this.newOffre.user.role = user.role;
          this.newOffre.user.firstname = user.firstname;
          this.newOffre.user.lastname = user.lastname;
        }
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

 
  createOffre(): void {
    this.offreService.createOffre(this.newOffre).subscribe({
      next: (response) => {
        console.log('Current User:', this.newOffre.user?.id);
        console.log('offre added', response);
        this.newOffre = {}; // Réinitialiser l'objet newOffre après la création de l'offre
      },
      error: (error) => {
        console.error('Error adding blog:', error);
      }
    });
  }
}
