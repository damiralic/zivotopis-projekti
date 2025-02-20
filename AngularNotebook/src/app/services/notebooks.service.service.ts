import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notebook } from '../Models/notebook.model';
import { NotebookPage } from '../Models/notebookPage.model';

@Injectable({
  providedIn: 'root'
})
export class NotebooksServiceService {

  constructor(private http: HttpClient) { }
  
  baseApiUrl = 'https://localhost:7111/api/Notebook';

  getAllNotes(): Observable<Notebook[]>{
    return this.http.get<Notebook[]>(this.baseApiUrl);
  }

  deleteNote(id: number){
    return this.http.delete(this.baseApiUrl + '/' + id)
  }

  getNotesByPage(pageIndex: number,pageSize: number,sortColumn: string,sortOrder: string,filterValue: string): Observable<NotebookPage>{
    return this.http.get<NotebookPage>(this.baseApiUrl+'/GetNotebooksByPage', {params: new HttpParams().set('pageIndex', pageIndex)
      .set('pageSize', pageSize)
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder)
      .set('filterValue', filterValue)});
  }
}
