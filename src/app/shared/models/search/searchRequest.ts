import {Media} from '../media/media';

export class SearchRequest extends Media{

  resultPerPage: number;
  pageNumber: number;
  yearFrom: number;
  yearTo: number;
  showTitles: string[];

}
