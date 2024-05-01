import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/Models/reclamation/reclamation';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { PopupComponent } from '../ajout-reclamation/popupconfirmation/popup/popup.component';

@Component({
  selector: 'app-modifier-reclamation',
  templateUrl: './modifier-reclamation.component.html',
  styleUrls: ['./modifier-reclamation.component.css'],
})
export class ModifierReclamationComponent implements OnInit {
  reclamation: Reclamation | null = null;
  reclamationId: number | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reclamationId = +params['id'];
      this.loadReclamation();
    });
  }

  loadReclamation(): void {
    if (this.reclamationId) {
      this.reclamationService.getReclamationById(this.reclamationId).subscribe(
        (reclamation) => {
          this.reclamation = reclamation;
        },
        (error) => {
          console.error("Error loading reclamation:", error);
          if (error.status === 403) {
            // Redirect to login if not authorized
            this.router.navigate(['/login']);
          }
        }
      );
    }
  }

  modifierReclamation(reclamationForm: NgForm): void {
    if (reclamationForm.valid && this.reclamation) {
      this.reclamationService.updateReclamation(this.reclamation).subscribe({
        next: () => {
          console.log('Reclamation updated successfully!');
          this.dialog.open(PopupComponent, { width: '400px' });
          this.router.navigate(['/reclamations']);
        },
        error: (error) => {
          console.error('Error updating reclamation:', error);
          if (error.status === 403) {
            console.error("You do not have permission to update this reclamation");
            this.router.navigate(['/login']); // Redirect to login if unauthorized
          }
        }
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
    this.router.navigate(['/reclamations']);
  }
}
