import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from '../../services/reclamation.service';
import { Reclamation } from 'src/app/Models/reclamation/reclamation';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reclamationId = +params['id'];
      this.loadReclamation();
    });
  }

  loadReclamation(): void {
    if (this.reclamationId) { // Check for null
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

  modifierReclamation(): void {
    if (this.reclamation) { // Check for null
      this.reclamationService.updateReclamation(this.reclamation).subscribe(
        () => {
          console.log('Reclamation updated successfully!');
          this.router.navigate(['/reclamations']); // Redirect after successful update
        },
        (error) => {
          console.error('Error updating reclamation:', error);
        }
      );
    } else {
      console.error("Cannot update undefined reclamation.");
    }
  }

  handleEtatChange(event: Event): void {
    if (this.reclamation) { // Check for null
      const checkbox = event.target as HTMLInputElement; // Cast to HTML input element
      this.reclamation.etat = checkbox.checked ? 'solved' : 'unsolved';
    }
  }
  goBack(): void {
    this.router.navigate(['/reclamations']);
  }
}
