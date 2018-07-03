import {Season} from './season';
import {Show} from './show';

export class Media {

  type: string;
  library: string;
  converted: boolean;
  user: string;
  title: string;
  fileLocation: string;
  year: number;
  rating: string;
  watched: boolean;
  summary: string;
  genres: string[];
  releaseDate: Date;
  directors: string[];
  actors: string[];
  writers: string[];
  // tvshows only
  show: Show;
  season: Season;
  episodeNumber: number;


}
