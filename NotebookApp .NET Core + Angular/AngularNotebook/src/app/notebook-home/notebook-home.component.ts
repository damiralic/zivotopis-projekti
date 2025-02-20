import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Notebook } from '../Models/notebook.model';
import { NotebookAddComponent } from '../notebook-add/notebook-add.component';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NotebookEditComponent } from '../notebook-edit/notebook-edit.component';
import { MaxWordsPipe } from '../Pipes/max-words.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Alignment,
  BlockQuote,
  Code,
  CodeBlock,
  TodoList,
  Image,
} from 'ckeditor5';
import {MatInputModule} from '@angular/material/input';

import 'ckeditor5/ckeditor5.css';
import { NotebookViewComponent } from '../notebook-view/notebook-view.component';
import { NotebooksServiceService } from '../services/notebooks.service.service';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-notebook-home',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatDialogModule, MatCardModule, MatIconModule, RouterLink, MaxWordsPipe, CKEditorModule, MatInputModule, MatPaginatorModule],
  templateUrl: './notebook-home.component.html',
  styleUrl: './notebook-home.component.scss',
})
export class NotebookHomeComponent implements OnInit{
  public Editor = ClassicEditor;
  public config = {
    plugins: [
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      Table,
      Undo,
      FontFamily,
      FontSize,
      FontColor,
      FontBackgroundColor,
      Alignment,
      Code,
      CodeBlock,
      Link,
      Image,
      BlockQuote,
      CodeBlock,
      TodoList,
      Indent
    ],
    readonly: true,
  }
  baseApiUrl = 'https://localhost:7111/api/Notebook';
  
  http = inject(HttpClient);
  dialog = inject(MatDialog);
  noteBookService = inject(NotebooksServiceService);
  
  filterSubject = new Subject<string>();
  
  notebookCount: number = 0;
  allNotebooks: Notebook[] = [];
  
  pageIndex: number = 0;
  pageSize: number = 50;
  sortColumn: string = 'name';
  sortOrder: string = 'asc';
  filterValue: string = '';
  
  ngOnInit(): void {
    this.loadDataByPage();

    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe({
      next: (value) => {
        this.filterValue = value;
        this.pageIndex = 0;
        this.loadDataByPage();
      }
    })
  }


  deleteNotebook(id: number){
    this.noteBookService.deleteNote(id).subscribe({
      next: data => {
    this.loadDataByPage();
      }
    })
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(NotebookAddComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == true){
    this.loadDataByPage();
      }
    })
  }

  openEditDialog(id:number){
    const dialogRef = this.dialog.open(NotebookEditComponent, { data: { id } });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == true){
      this.loadDataByPage();
      }
    })
  }

  loadDataByPage(){
    this.noteBookService.getNotesByPage(this.pageIndex, this.pageSize, this.sortColumn, this.sortOrder, this.filterValue).subscribe({
      next: (data) =>{
        this.allNotebooks = data.allNotebooks;
        this.notebookCount = data.notebookCount;
      }
    });
  }

  openViewDialog(id:number){
    const dialogRef = this.dialog.open(NotebookViewComponent, { data: { id }, width: '80vh', maxHeight: '80vh'});

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == true){
      }
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterSubject.next(filterValue);
  }

  onPageChange(event: any){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDataByPage();
  }
}
