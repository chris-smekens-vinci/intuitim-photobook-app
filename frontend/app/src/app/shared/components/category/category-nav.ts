import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/api/categories.service';
import { CategoryDto } from '../../../core/models/types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="category-nav">
      <button 
        class="nav-item all-btn"
        [class.active]="selectedCategoryId === null"
        (click)="selectAll()"
      >
        Tous
      </button>
      <button 
        *ngFor="let category of categories" 
        class="nav-item"
        [class.active]="selectedCategoryId === category._id"
        (click)="selectCategory(category._id)"
      >
        {{ category.name }}
      </button>
    </nav>
  `,
  styleUrls: ['./category-nav.css']
})
export class CategoryNav implements OnInit {
  categories: CategoryDto[] = [];
  selectedCategoryId: string | null = null;

  @Output() categorySelected = new EventEmitter<string | null>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories:', err);
      }
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }

  selectAll(): void {
    this.selectedCategoryId = null;
    this.categorySelected.emit(null);
  }
}