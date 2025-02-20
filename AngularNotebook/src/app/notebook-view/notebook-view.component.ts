import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Notebook } from '../Models/notebook.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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

import 'ckeditor5/ckeditor5.css';

@Component({
  selector: 'app-notebook-view',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CKEditorModule],
  templateUrl: './notebook-view.component.html',
  styleUrl: './notebook-view.component.scss'
})
export class NotebookViewComponent implements OnInit{
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

  data = inject(MAT_DIALOG_DATA);

  notebookDetails: Notebook = {
    id: 0,
    name: '',
    text: ''
  }

  ngOnInit(){
    this.getNotebookById(this.data.id).subscribe({
      next: (value) =>{
        this.notebookDetails = value;
      }
    })
  }

  getNotebookById(id: number): Observable<Notebook>{
    return this.http.get<Notebook>(this.baseApiUrl + '/' + id);
  }
}
