export default class Gig {
    begin: number;
    start: number;
    end: number;
    artist: string = "";
    stage: string = "";
    weekday: string = "";
  
    constructor(begin : number, end : number, artist:string, stage:string, weekday: string){
      this.begin = begin;
      this.end = end;
      this.artist = artist;
      this.stage = stage;
      this.weekday = weekday;
    }
  }