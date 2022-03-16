import { ElementRef, Injectable, QueryList } from '@angular/core';
import { CardContent } from './interfaces/card-content';

import { LeaderLineRef } from './interfaces/leader-line-ref';
import { STRING_SEPERATOR } from './utils/constants';

declare let LeaderLine: any;

@Injectable({ providedIn: 'root' })
export class DraggableService {
  private draggableElemRefMap = new Map<String, HTMLElement>();
  leaderLineRefArr: Array<LeaderLineRef>;

  constructor() {
    this.leaderLineRefArr = [];
  }

  modifyElemRefMap(draggableList: QueryList<ElementRef>) {
    if (!draggableList) {
      return;
    }
    this.draggableElemRefMap = new Map<String, HTMLElement>();
    draggableList.forEach(({ nativeElement }) => {
      this.draggableElemRefMap.set(
        nativeElement.id,
        nativeElement
      );
    });
    this.leaderLineRefArr
      .forEach((obj) => {
        obj.leaderLineObj.position();
      });
  }

  drawLeaderLine(flowChartContainerElem: HTMLElement, startId: string, endId: string, contentList: Array<CardContent>) {

    let idx = this.leaderLineRefArr.findIndex(obj => (obj.startId === startId && obj.endId === endId) || (obj.endId === startId && obj.startId === endId));
    if (idx >= 0) {
      return;
    }

    let contentObj = contentList.find(contentObj => contentObj.id === startId);
    let color: string;

    switch (contentObj?.type?.toLowerCase()) {
      case "translation":
        color = "#955251";
        break;
      case "language":
        color = "#88B04B";
        break;
      case "approver":
        color = "#34568B";
        break;
      default:
        color = "#000000";
    }

    let leaderLineObj = new LeaderLine(
      this.draggableElemRefMap.get(startId),
      this.draggableElemRefMap.get(endId),
      { color }
    );
    // let leaderLineElem:any = document.querySelector("body>.leader-line:last-of-type");
    // let leaderLineBoundingRect = leaderLineElem.getBoundingClientRect();
    // let flowChartContainerBoundingRect = flowChartContainerElem.getBoundingClientRect();
    // let x = leaderLineBoundingRect.left - flowChartContainerBoundingRect.x;
    // let y = leaderLineBoundingRect.top - flowChartContainerBoundingRect.y;

    // leaderLineElem.style.left = x + "px";
    // leaderLineElem.style.top = y + "px";

    // leaderLineElem.id = `${startId}_${endId}`;
    // flowChartContainerElem.appendChild(leaderLineElem);
    leaderLineObj.position();

    this.leaderLineRefArr.push({
      id: [startId, endId].join(STRING_SEPERATOR),
      startId,
      endId,
      leaderLineObj
    });
  }
}
