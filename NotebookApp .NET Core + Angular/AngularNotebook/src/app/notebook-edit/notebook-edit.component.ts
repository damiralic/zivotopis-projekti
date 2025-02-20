import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Notebook } from '../Models/notebook.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notebook-edit',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule, CKEditorModule, MatInputModule, MatButtonModule],
  templateUrl: './notebook-edit.component.html',
  styleUrl: './notebook-edit.component.scss'
})
export class NotebookEditComponent implements OnInit{
  public Editor = ClassicEditor;
  public config = {
    toolbar: [
      'undo', 'redo', '|',
      'heading', '|', 'bold', 'italic', '|',
      'link', 'insertTable', 'mediaEmbed', '|',
      'bulletedList', 'numberedList', 'indent', 'outdent'
    ],
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
    ]
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

  updateNotebookClick(){
    this.updateNotebook(this.data.id, this.notebookDetails).subscribe({
      next: (value) =>{
      }
    })
  }

  updateNotebook(id: number, notebook: Notebook){
    return this.http.put(this.baseApiUrl + '/' + id, notebook);
  }

}
