import { Notebook } from "./notebook.model";

export interface NotebookPage {
    notebookCount: number;
    allNotebooks: Notebook[];
}