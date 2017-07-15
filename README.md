# ng2csv

[![Build Status](https://travis-ci.org/rars/ng2csv.svg?branch=master)](https://travis-ci.org/rars/ng2csv)

Angular 2 module for saving CSV files.

## Quickstart

1. Install `file-saver` and `ng2csv` modules from npm:
    ```
    npm install file-saver ng2csv --save
    ```
2. Import `Ng2CsvModule` to your app:
    ```
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { Ng2CsvModule } from 'ng2csv/Ng2Csv.module';
    import { AppComponent } from './app.component';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        Ng2CsvModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
3. Inject the `Ng2CsvService` into your component:
    ```
    import { Component } from '@angular/core';
    import { Ng2CsvService } from 'ng2csv/Ng2Csv.service';
    
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
      providers: [Ng2CsvService]
    })
    export class AppComponent {
      public constructor(private ng2Csv: Ng2CsvService) {}
    
      public download(): void {
        this.ng2Csv.download([
            {
              id: 1,
              name: 'Alice'
            },
            {
              id: 2,
              name: 'Bob'
            }
          ],
          'names.csv');
      }
    }
    ```


## Configuration

### Auto mapping
Unless specified, an automatic mapping is used from the data to columns. It does this by looking at the properties available on the object and then enumerating them, one column for each, and using the `.toString()` method to serialise the values to the CSV data.

### Row headers and ordering
You can output a subset of the data's properties to CSV by defining your own custom mapping. This allows you to specify the order columns are written in and what value is written for each row in each column.
```
import { OrderedProjectionCsvRowMapper } from 'ng2csv/OrderedProjectionCsvRowMapper';
// ...
const rowMapper = new OrderedProjectionCsvRowMapper<MyType>([
    ['First Name', x => x.Name],
    ['Identifier', x => 'N' + x.Id.toString()]
]);
this.ng2Csv.download(myData, 'file.csv', rowMapper);
/* 
 Generates CSV:
 "First Name","Identifier"
 Alice,N1
 Bob,N2
 */
```

### Delimiters, header row
You can control what character is used to separate columns (e.g. to use ';' or tab separators rather than ',') and whether to include a header row.
```
import { CsvConfiguration } from 'ng2csv/CsvConfiguration';
// ...
const csvConfig = new CsvConfiguration();
csvConfig.delimiter = '\t';
csvConfig.includeHeaderRow = false;
this.ng2Csv.download(myData, 'file.csv', undefined, csvConfig);
```

## Contributions welcome!
If you have a feature or improvement you would like to see included, please raise an issue or a PR and I will review.

