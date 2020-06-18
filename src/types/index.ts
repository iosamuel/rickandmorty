export interface IEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: [ICharacter];
  created: string;
}
export interface ILocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: [ICharacter];
  created: string;
}
export interface ICharacter {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: [IEpisode];
  created: string;
}
export interface RInfo {
  count: number;
  pages: number;
  next: number;
  prev: number | null;
}
export interface ICharacters {
  info: RInfo;
  characters: ICharacter[];
}
