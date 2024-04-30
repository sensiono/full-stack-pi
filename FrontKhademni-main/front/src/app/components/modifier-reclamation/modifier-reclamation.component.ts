import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/Models/reclamation/reclamation';
import { MatDialog } from '@angular/material/dialog'; // For pop-up dialog
import { UserService } from 'src/app/services/user.service'; // Fetch current user
import { NgForm } from '@angular/forms'; // Form validation
import { PopupComponent } from '../ajout-reclamation/popupconfirmation/popup/popup.component';

@Component({
  selector: 'app-modifier-reclamation',
  templateUrl: './modifier-reclamation.component.html',
  styleUrls: ['./modifier-reclamation.component.css']
})
export class ModifierReclamationComponent implements OnInit {
  reclamation: Reclamation | null = null;
  reclamationId: number | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog, // Dependency injection for pop-up dialog
    private userService: UserService // To get the current user
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reclamationId = +params['id'];
      this.loadReclamation();
    });

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('Current User:', user);
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  loadReclamation(): void {
    if (this.reclamationId) { 
      this.reclamationService.getReclamationById(this.reclamationId).subscribe(
        (reclamation: Reclamation) => {
          this.reclamation = reclamation;
        },
        (error) => {
          console.error("Error loading reclamation:", error);
        }
      );
    }
  }

  modifierReclamation(reclamationForm: NgForm): void {
    if (reclamationForm.valid && this.reclamation) {
      this.reclamationService.updateReclamation(this.reclamation).subscribe({
        next: () => {
          console.log('Reclamation updated successfully!');
          this.dialog.open(PopupComponent, {
            width: '400px', // Open a pop-up confirmation dialog
          });
          this.router.navigate(['/reclamations']); // Redirect after successful update
        },
        error: (error) => {
          console.error('Error updating reclamation:', error);
        },
      });
    }
  }

  handleEtatChange(event: Event): void {
    if (this.reclamation) {
      const checkbox = event.target as HTMLInputElement;
      this.reclamation.etat = checkbox.checked ? 'solved' : 'unsolved';
    }
  }

  goBack(): void {
    this.router.navigate(['/reclamations']); // Navigate back to the reclamations page
  }
}
