import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
   private readonly apiUrl = 'http://localhost:8080/game';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}
