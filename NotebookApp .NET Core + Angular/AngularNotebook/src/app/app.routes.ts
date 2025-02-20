import { Routes } from '@angular/router';
import { NotebookHomeComponent } from './notebook-home/notebook-home.component';
import { NotebookEditComponent } from './notebook-edit/notebook-edit.component';
import { NotebookViewComponent } from './notebook-view/notebook-view.component';

export const routes: Routes = [
    {
        path: '',
        component: NotebookHomeComponent
    },
    {
        path: 'notebook',
        component: NotebookHomeComponent
    },
    {
        path: 'notebook/:id',
        component: NotebookViewComponent
    },
    {
        path: 'edit-notebook/:id',
        component: NotebookEditComponent
    }
];
