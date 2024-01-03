import {Component} from "@angular/core";
import {NgForOf} from "@angular/common";

@Component({
    selector: "result-table",
    standalone: true,
    template: `
        <div id="tableBlock">
            <label>Recent results</label>
            <table>
                <thead>
                <tr id="headerTr">
                    <th style="width: 7%;">X</th>
                    <th style="width: 7%">Y</th>
                    <th style="width: 7%">R</th>
                    <th style="width: 9%">Result</th>
                    <th style="width: 30%">Request</th>
                    <th style="width: 30%">Execution time</th>
                </tr>
                </thead>
                <tbody id="mainTableBody">
                <ng-container *ngFor="let _ of [].constructor(10)">
                    <tr>
                        <td style="width: 7%;">1</td>
                        <td style="width: 7%;">2</td>
                        <td style="width: 7%;">3</td>

                        <td style="width: 9%;">YES</td>


                        <td style="width: 30%;">03.01.24</td>
                        <td style="width: 30%;">3 ms</td>
                    </tr>
                </ng-container>

                </tbody>
            </table>
        </div>
    `,
    imports: [
        NgForOf
    ],
    styleUrls: ['./result-table.component.css']
})

export class ResultTableComponent {

}