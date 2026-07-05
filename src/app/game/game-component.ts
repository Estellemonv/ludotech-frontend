import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GameService } from '../shared/service/game-service';
import { Game } from '../shared/model/Game';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatTableModule,  MatInputModule,
    FormsModule, MatIcon],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class GameComponent implements OnInit{
  displayedColumns: string[] = ['gameName', 'numberOfPlayers', 'timeOfGame', 'editor', 'status', 'actions'];
  dataSource = new MatTableDataSource<Game>([]);

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();

    this.dataSource.filterPredicate = (game: Game, filter: string) => {
    const search = filter.toLowerCase();

      return (
        game.gameName.toLowerCase().includes(search) ||
        game.editor.toLowerCase().includes(search) ||
        game.status.toLowerCase().includes(search)
      );
    };
  }

   private loadGames(): void {
    this.gameService.getGames().subscribe({
      next: (games) => {
        this.dataSource.data = games;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editGame(game: Game): void {
  console.log("Modification :", game);
}


deleteGame(game: Game): void {
  console.log("Suppression :", game);

  this.dataSource.data = this.dataSource.data.filter(
    g => g.id !== game.id
  );
}
}
