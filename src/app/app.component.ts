import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import * as uuid from 'uuid';

import { CardContent } from './interfaces/card-content';
import { DraggableService } from './draggable.service';
import { STRING_SEPERATOR } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('flowChartContainer', { read: ElementRef }) flowChartContainerRef!: ElementRef;
  @ViewChildren('draggableDiv', { read: ElementRef })
  draggableList!: QueryList<ElementRef>;
  destroy$ = new Subject<boolean>();
  selElemLineIdsList: Array<any> = [];

  selContentObj: any;
  selStartId: string = "";
  selEndId: string = "";

  btnContentList: Array<CardContent> = [
    {
      "id": uuid.v4(),
      "value": "Translation",
      "type": "translation",
      "position": {
        "x": 0,
        "y": 0
      },
      "childIds": []
    },
    {
      "id": uuid.v4(),
      "value": "Language",
      "type": "language",
      "position": {
        "x": 0,
        "y": 0
      },
      "childIds": []
    },
    {
      "id": uuid.v4(),
      "value": "Approver",
      "type": "approver",
      "position": {
        "x": 0,
        "y": 0
      },
      "childIds": []
    }
  ];

  contentList: Array<CardContent> = [
    {
        "id": "a17c459b-4d0c-4ab5-954c-42615216d26a",
        "value": "Approver",
        "type": "approver",
        "position": {
            "x": 568,
            "y": 2
        },
        "childIds": [
            "9833b6b0-98a4-480d-9c5c-af1049fcb81b",
            "d3b97605-c8a9-4754-ad49-b52f6c0a7e2f",
            "07b6049f-541e-40d5-b9fa-f497dff86607"
        ]
    },
    {
        "id": "9833b6b0-98a4-480d-9c5c-af1049fcb81b",
        "value": "Language",
        "type": "language",
        "position": {
            "x": 567,
            "y": 397
        },
        "childIds": [
            "c46963eb-43cd-43c9-aa12-a059e58471ef",
            "2d79c44f-a67f-410b-b950-80d2c5859223"
        ]
    },
    {
        "id": "7688edc8-11bc-45c2-a6a5-461cdff0d696",
        "value": "Content3",
        "type": "approver",
        "position": {
            "x": 0,
            "y": 187
        },
        "childIds": [
            "94976ab0-dda6-42ed-8be7-254714087688",
            "c46963eb-43cd-43c9-aa12-a059e58471ef"
        ]
    },
    {
        "id": "94976ab0-dda6-42ed-8be7-254714087688",
        "value": "Language",
        "type": "language",
        "position": {
            "x": 1133,
            "y": 190
        },
        "childIds": [
            "2d79c44f-a67f-410b-b950-80d2c5859223"
        ]
    },
    {
        "id": "895683f0-4683-4e6c-9d3d-fe8d290a6f59",
        "value": "Content1",
        "type": "translation",
        "position": {
            "x": 298,
            "y": 281
        },
        "childIds": [
            "c46963eb-43cd-43c9-aa12-a059e58471ef"
        ]
    },
    {
        "id": "c46963eb-43cd-43c9-aa12-a059e58471ef",
        "value": "Content2",
        "type": "language",
        "position": {
            "x": 0,
            "y": 400
        },
        "childIds": []
    },
    {
        "id": "2232542d-e7c0-4181-9663-9d944fea51d8",
        "value": "Content1",
        "type": "translation",
        "position": {
            "x": 818,
            "y": 109
        },
        "childIds": [
            "895683f0-4683-4e6c-9d3d-fe8d290a6f59"
        ]
    },
    {
        "id": "07b6049f-541e-40d5-b9fa-f497dff86607",
        "value": "Approver",
        "type": "approver",
        "position": {
            "x": 1132,
            "y": 0
        },
        "childIds": [
            "2232542d-e7c0-4181-9663-9d944fea51d8",
            "94976ab0-dda6-42ed-8be7-254714087688"
        ]
    },
    {
        "id": "2d79c44f-a67f-410b-b950-80d2c5859223",
        "value": "Translation",
        "type": "translation",
        "position": {
            "x": 1133,
            "y": 400
        },
        "childIds": []
    },
    {
        "id": "e8dba4c0-dcff-4c09-8dac-328da603f50a",
        "value": "Content3",
        "type": "approver",
        "position": {
            "x": 818,
            "y": 276
        },
        "childIds": [
            "2d79c44f-a67f-410b-b950-80d2c5859223"
        ]
    },
    {
        "id": "e4ed675f-92a1-4e7e-8155-4b9cafb1aa24",
        "value": "Content2",
        "type": "language",
        "position": {
            "x": 316,
            "y": 104
        },
        "childIds": [
            "e8dba4c0-dcff-4c09-8dac-328da603f50a"
        ]
    },
    {
        "id": "d3b97605-c8a9-4754-ad49-b52f6c0a7e2f",
        "value": "Content1",
        "type": "translation",
        "position": {
            "x": 0,
            "y": 0
        },
        "childIds": [
            "e4ed675f-92a1-4e7e-8155-4b9cafb1aa24",
            "7688edc8-11bc-45c2-a6a5-461cdff0d696"
        ]
    }
  ];

  constructor(private draggableService: DraggableService) { }


  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    fromEvent(this.flowChartContainerRef.nativeElement, "scroll").pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.onParentScroll();
    });

    this.draggableList = this.draggableList ?? [];
    this.draggableService.modifyElemRefMap(this.draggableList);

    this.createInitialCards();

    this.draggableList.changes.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.draggableService.modifyElemRefMap(this.draggableList);
      }
    );
  }

  createInitialCards(): void {
    this.draggableList.toArray().forEach(elem => {
      let elemStyle = elem.nativeElement.style;
      elemStyle.position = "absolute";
      let contentIdx = this.contentList.findIndex(contentObj => contentObj.id === elem.nativeElement.id);
      elemStyle.left = this.contentList[contentIdx].position.x + "px";
      elemStyle.top = this.contentList[contentIdx].position.y + "px";
    });
    this.drawInitialLeaderLines();
  }


  drawInitialLeaderLines(): void {
    let uniqueCombinedIdsSet = new Set<string>();
    this.contentList.forEach(contentObj => {
      let parentId = contentObj.id;
      contentObj.childIds.forEach(childId => {
        uniqueCombinedIdsSet.add([parentId, childId].join(STRING_SEPERATOR));
      });
    });
    [...uniqueCombinedIdsSet].forEach(combinedId => {
      let ids = combinedId.split(STRING_SEPERATOR);
      this.drawLeaderLine(ids[0], ids[1]);
    });
  }


  drawLeaderLine(startId: string, endId: string): void {
    if (!startId && !endId) {
      return;
    }
    this.draggableService.drawLeaderLine(this.flowChartContainerRef.nativeElement, startId, endId, this.contentList);
  }


  saveFlowChart(): void {
    let parentChildObj = this.draggableService.leaderLineRefArr.reduce((acc: { [key: string]: string[] }, obj) => {
      (acc[obj.startId] = acc[obj.startId] ?? []).push(obj.endId);
      return acc;
    }, {});

    this.contentList = this.contentList.map(contentObj => {
      let key = contentObj.id;
      if (parentChildObj[key]) {
        contentObj.childIds = parentChildObj[key];
      }
      return contentObj;
    });

    console.log(this.contentList);
  }


  onParentScroll(): void {
    this.draggableService.leaderLineRefArr.forEach(elem => {
      elem.leaderLineObj.position();
    });
  }


  onEditLinksClick(selContentObj: CardContent): void {
    this.selContentObj = { ...selContentObj };
    let selectedId = selContentObj.id;
    this.selElemLineIdsList = [];
    this.draggableService.leaderLineRefArr.forEach(obj => {
      if (obj.startId === selectedId) {
        this.selElemLineIdsList.push(obj.endId);
      } else if (obj.endId === selectedId) {
        this.selElemLineIdsList.push(obj.startId);
      }
    });
  }


  cdkDrop(event: CdkDragDrop<Array<CardContent>>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.btnContentList = [
        {
          "id": uuid.v4(),
          "value": "Translation",
          "type": "translation",
          "position": {
            "x": 0,
            "y": 0
          },
          "childIds": []
        },
        {
          "id": uuid.v4(),
          "value": "Language",
          "type": "language",
          "position": {
            "x": 0,
            "y": 0
          },
          "childIds": []
        },
        {
          "id": uuid.v4(),
          "value": "Approver",
          "type": "approver",
          "position": {
            "x": 0,
            "y": 0
          },
          "childIds": []
        }
      ];
    }
  }


  onDragEnd(currElem: HTMLElement, flowChartContainerElem: HTMLElement, idx: number): void {
    let flowChartContainerElemBoundingRect = flowChartContainerElem.getBoundingClientRect();
    let currElemBoundingRect = currElem.getBoundingClientRect();

    let x = currElemBoundingRect.x - flowChartContainerElemBoundingRect.x;
    let y = currElemBoundingRect.y - flowChartContainerElemBoundingRect.y;

    this.contentList[idx].position = { x, y };

    let { id: elemId } = currElem;

    let filteredLeaderLineArr = this.draggableService.leaderLineRefArr.filter(obj => obj.id.split(STRING_SEPERATOR).includes(elemId));

    if (Array.isArray(filteredLeaderLineArr) && (filteredLeaderLineArr.length > 0)) {
      filteredLeaderLineArr
        .forEach((obj) => {
          obj.leaderLineObj.position();
        });
    }
  }


  removeConnection(elemId: string, elemIdx: number): void {
    let filteredLeaderLineArr = [];
    let newLeaderLineArr = [];
    for (let leaderLineRefObj of this.draggableService.leaderLineRefArr) {
      let idsArr = leaderLineRefObj.id.split(STRING_SEPERATOR);
      if (idsArr.includes(this.selContentObj.id) && idsArr.includes(elemId)) {
        filteredLeaderLineArr.push(leaderLineRefObj);
      } else {
        newLeaderLineArr.push(leaderLineRefObj);
      }
    }
    if (Array.isArray(filteredLeaderLineArr) && (filteredLeaderLineArr.length > 0)) {
      filteredLeaderLineArr
        .forEach((leaderLineRefObj) => {
          leaderLineRefObj.leaderLineObj.remove();
        });

      this.draggableService.leaderLineRefArr = newLeaderLineArr;
      this.selElemLineIdsList.splice(elemIdx, 1);
    }
  }


  removeCard(parentElem: HTMLElement, cardIndex: number): void {
    let { id: elemId } = parentElem;
    let filteredLeaderLineArr = [];
    let newLeaderLineArr = [];

    for (let obj of this.draggableService.leaderLineRefArr) {
      if (obj.id.split(STRING_SEPERATOR).includes(elemId)) {
        filteredLeaderLineArr.push(obj);
      } else {
        newLeaderLineArr.push(obj);
      }
    }

    if (Array.isArray(filteredLeaderLineArr) && (filteredLeaderLineArr.length > 0)) {
      filteredLeaderLineArr
        .forEach((obj) => {
          obj.leaderLineObj.remove();
        });

      this.draggableService.leaderLineRefArr = newLeaderLineArr;
    }

    this.contentList.splice(cardIndex, 1);
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
