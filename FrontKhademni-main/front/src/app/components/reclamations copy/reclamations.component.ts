import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Router } from '@angular/router';
import { countBy, groupBy, maxBy } from 'lodash';
import * as XLSX from 'xlsx'; // Import xlsx library
import { formatDate } from '@angular/common';
import * as moment from 'moment'; // Import moment.js
import { Reclamation } from 'src/app/Models/reclamation/reclamation';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';




@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit, AfterViewInit {
  reclamations: Reclamation[] = [];
  dataSource!: MatTableDataSource<Reclamation>;
  reclamationsPerType: { name: string, value: number }[] = [];
  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('reclamationsTable') reclamationsTable!: ElementRef;

  totalReclamations = 0;
  pageSize = 10;
  totalReclamationsToday = 0;
  totalReclamationsThisWeek = 0;
  totalReclamationsThisMonth = 0;
  mostCommonReclamationType: string = '';

  // Define the list of displayed columns for the table
  displayedColumns: string[] = ['id', 'description', 'etat', 'userId', 'createdAt','type', 'actions'];

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the data source with an empty array of Reclamation objects
    this.dataSource = new MatTableDataSource<Reclamation>([]); 
    this.loadReclamations();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations) => {
        this.reclamations = reclamations;
        this.totalReclamations = reclamations.length;

        const today = moment().format('YYYY-MM-DD');
        const startOfWeek = moment().startOf('isoWeek');
        const endOfWeek = moment().endOf('isoWeek');
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        

        const validReclamations = reclamations.filter(
          (rec) => rec.type !== null && rec.type !== undefined
        );
        // If you're treating `type` as an enum, ensure you're comparing with enum values
        const typeCounts = countBy(validReclamations, (rec) => rec.type?.toString()); // Convert enum to string
        const mostCommonType = maxBy(Object.keys(typeCounts), (type) => typeCounts[type]);

        this.mostCommonReclamationType = mostCommonType ? mostCommonType : 'N/A';

        this.totalReclamationsToday = reclamations.filter(
          (rec) => moment(rec.createdAt).format('YYYY-MM-DD') === today
        ).length;

        this.totalReclamationsThisWeek = reclamations.filter(
          (rec) => moment(rec.createdAt).isBetween(startOfWeek, endOfWeek, undefined, '[]')
        ).length;

        this.totalReclamationsThisMonth = reclamations.filter(
          (rec) => moment(rec.createdAt).isBetween(startOfMonth, endOfMonth, undefined, '[]')
        ).length;

        this.dataSource = new MatTableDataSource(reclamations);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        

        this.reclamationsPerType = this.generateReclamationsPerType(reclamations);
      },
      (error) => {
        console.error('Error loading reclamations:', error);
      }
    );
  }

  generateReclamationsPerType(reclamations: Reclamation[]): { name: string, value: number }[] {
    const groupedReclamations = groupBy(reclamations, 'type');
    return Object.keys(groupedReclamations).map((typeName) => ({
      name: typeName,
      value: groupedReclamations[typeName].length,
    }));
  }

  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamation(id).subscribe(
      () => {
        this.loadReclamations();
      },
      (error) => {
        console.error('Error deleting reclamation:', error);
      }
    );
  }

  modifierReclamation(id: number): void {
    this.router.navigate(['/modifier-reclamation', id]);
  }

  ajouterReclamation(): void {
    this.router.navigate(['/ajouter-reclamation']);
  }

  pageEvent(event: any): void {
    this.pageSize = event.pageSize;
  }

  getUserId(reclamation: Reclamation): number | null {
    return reclamation.user ? reclamation.user.id ?? null : null;
  }

  applyFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.reclamations.filter(
      (rec) => rec.user && rec.user.id?.toString().toLowerCase().includes(searchTerm) // Check if user ID contains the search term
    );
  
    this.dataSource = new MatTableDataSource(filteredData);
  
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applySort(event: Event): void {
    if (this.reclamations.length === 0) {
      return; // If there are no reclamations, there's nothing to sort
    }
  
    const sortOrder = (event.target as HTMLSelectElement).value;
    const sortedReclamations = this.reclamations.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt); // Convert to Date object
      const dateB = new Date(b.createdAt);
  
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime(); // Sort by time in ascending or descending order
    });
  
    this.dataSource = new MatTableDataSource(sortedReclamations);
  
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Reconnect paginator
    }
  }

  generatePDF(): void {
    const pdf = new jsPDF();
    const xOffset = 10;
    let yOffset = 20;

    pdf.setFontSize(16);
    pdf.text('Liste des Réclamations', xOffset, yOffset); // Title
  
    yOffset += 20; // Space for next content
  
    pdf.setFontSize(12);
    pdf.text("ID  Description  Etat  Type  User ID  Créée le", xOffset, yOffset); // Header
  
    yOffset += 10; // Start data entries
  
    this.reclamations.forEach((reclamation) => {
        const dataLine = `${reclamation.idRec}  ${reclamation.description}  ${reclamation.etat}  ${reclamation.type || ''}  ${reclamation.user?.id || ''}  ${moment(reclamation.createdAt).format('YYYY-MM-DD HH:mm:ss')}`;
        
        pdf.text(dataLine, xOffset, yOffset); // Add data line
        
        yOffset += 10; // Increment for the next line
    });
  
    pdf.save("reclamations.pdf"); // Save the PDF and trigger download
}
  
  exportToExcel(): void {
    // Combine table data and visual statistics
    const tableData = this.dataSource.filteredData.map(item => ({
      'ID': item.idRec,
      'Description': item.description,
      'État': item.etat,
      'Type': item.type, // Include the reclamation type
      'User ID': this.getUserId(item),
      'Créée le': moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'), // Format with moment.js
    }));
  
    const visualStatistics = this.reclamationsPerType.map(item => ({
      'User Name': item.name,
      'Reclamations Count': item.value
    }));
  
    // Create Excel workbook and sheets
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const tableWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);
    const visualWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(visualStatistics);
  
    // Add sheets to workbook
    XLSX.utils.book_append_sheet(wb, tableWs, 'Reclamations');
    XLSX.utils.book_append_sheet(wb, visualWs, 'Visual Statistics');
  
    // Save workbook as Excel file
    XLSX.writeFile(wb, 'reclamations.xlsx');
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  

  
}
