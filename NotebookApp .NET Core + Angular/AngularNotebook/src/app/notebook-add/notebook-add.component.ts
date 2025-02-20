import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
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

@Component({
  selector: 'app-notebook-add',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, CKEditorModule, MatInputModule],
  templateUrl: './notebook-add.component.html',
  styleUrl: './notebook-add.component.scss'
})
export class NotebookAddComponent {
  public Editor = ClassicEditor;
  public config = {
    toolbar: [
      'undo', 'redo',
      '|', 'heading',
      '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
      '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
      '-', // break point
      '|', 'alignment',
      'link', 'uploadImage', 'blockQuote', 'codeBlock',
      '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
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

  notebookForm = new FormGroup({
    Name: new FormControl<string>(''),
    Text: new FormControl<string>('')
  });

  addNotebook(){
    const tempNotebook = {
      Name: this.notebookForm.value.Name,
      Text: this.notebookForm.value.Text
    }

    this.http.post(this.baseApiUrl, tempNotebook).subscribe({
      next: data => {
      }
    })
  }
}
