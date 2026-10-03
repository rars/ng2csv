import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ng2CsvService } from 'ng2csv';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly ng2Csv = inject(Ng2CsvService);

  public download(): void {
    this.ng2Csv.download(
      [
        {
          id: 1,
          name: 'Alice',
        },
        {
          id: 2,
          name: 'Bob',
        },
      ],
      'names.csv',
    );
  }
}
