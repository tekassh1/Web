import {Component, inject} from "@angular/core";
import {NgForOf} from "@angular/common";
import {DataService} from "../../../services/data.service";

@Component({
    selector: "result-table",
    standalone: true,
    imports: [
        NgForOf
    ],
    styleUrls: ['./result-table.component.css'],
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
                <ng-container *ngFor="let req of dataService.data">
                    <tr>
                        <td style="width: 7%;">{{ req.x }}</td>
                        <td style="width: 7%;">{{ req.y }}</td>
                        <td style="width: 7%;">{{ req.r }}</td>

                        <td style="width: 9%;">{{ req.res }}</td>


                        <td style="width: 30%;">{{ req.reqDate }}</td>
                        <td style="width: 30%;">{{ req.execTime }} ms</td>
                    </tr>
                </ng-container>

                </tbody>
            </table>
        </div>
    `
})

export class ResultTableComponent {
    protected dataService: DataService = inject(DataService);
}