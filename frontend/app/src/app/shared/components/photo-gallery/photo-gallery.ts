import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../../../core/api/photos.service';
import { PhotoDto } from '../../../core/models/types';
import { CategoryNav } from '../category/category-nav';

// Transform a Typescript class into an Angular component.
@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.html',
  styleUrls: ['./photo-gallery.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, ReactiveFormsModule, CategoryNav]
})
export class PhotoGallery implements OnInit {
  photos: PhotoDto[] = [];
  selectedPhoto: PhotoDto | null = null;
  loading: boolean = true;
  error: string | null = null;
  commentForm: FormGroup;
  selectedCategoryId: string | null = null;
  showDeleted: boolean = false;

  constructor(private photoService: PhotoService, private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, this.punctuationValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.loadPhotos();
  }

  onCategorySelected(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    this.selectedPhoto = null;
    this.loadPhotos();
  }

  toggleShowDeleted(): void {
    this.showDeleted = !this.showDeleted;
    this.loadPhotos();
  }

  loadPhotos(): void {
    console.log('Chargement des photos pour la catégorie:', this.selectedCategoryId);
    this.loading = true;
    this.photoService.getPhotos(this.selectedCategoryId ?? undefined, this.showDeleted).subscribe({
      next: (data) => {
        console.log('Photos reçues:', data);
        this.photos = data;
        this.loading = false;
        if (data.length > 0) {
          this.selectedPhoto = data[0];
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.error = 'Erreur lors du chargement des photos';
        this.loading = false;
      }
    });
  }

  selectPhoto(photo: PhotoDto): void {
    this.selectedPhoto = photo;
    this.commentForm.reset();
  }

  punctuationValidator(control: any) {
    if (!control.value) {
      return null;
    }
    const validEndings = /[.!?]$/;
    return validEndings.test(control.value) ? null : { missingPunctuation: true };
  }

  addComment(): void {
    if (this.commentForm.invalid || !this.selectedPhoto) {
      return;
    }

    // Vérifier si la photo est supprimée
    if (this.selectedPhoto.isDeleted) {
      this.error = 'Impossible d\'ajouter un commentaire à une photo supprimée';
      return;
    }

    const content = this.commentForm.get('content')?.value;
    this.photoService.addComment(this.selectedPhoto._id, content).subscribe({
      next: (updatedPhoto) => {
        console.log('Commentaire ajouté:', updatedPhoto);
        this.selectedPhoto = updatedPhoto;
        this.commentForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du commentaire:', err);
        this.error = 'Erreur lors de l\'ajout du commentaire';
      }
    });
  }

  trackById(index: number, photo: PhotoDto): string {
    return photo._id;
  }
}
