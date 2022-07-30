import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  filter,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  finalize,
} from 'rxjs';
import { ITaskList } from 'src/app/interfaces/task.interface';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit, OnDestroy {
  private readonly _subscription$ = new Subject<void>();
  taskList$!: Observable<ITaskList[]>;
  isTaskListLoading: boolean = false;

  constructor(
    private readonly _taskService: TaskService,
    private readonly _alertService: AlertHandlerService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.inItTask();
  }

  inItTask() {
    this.isTaskListLoading = true;
    this.taskList$ = this._taskService.getAllTasks().pipe(
      finalize(() => (this.isTaskListLoading = false)),
      takeUntil(this._subscription$)
    );
  }

  addTask(task: NgModel) {
    if (!task.valid) return;
    this._taskService
      .addNewTask({ name: task.value })
      .pipe(takeUntil(this._subscription$))
      .subscribe({
        next: () => {
          task.reset();
          this.inItTask();
          this._alertService.sendAlert('Task added');
        },
      });
  }

  deleteTask(content: TemplateRef<any>, taskId: string) {
    let modalOptions: NgbModalOptions = {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    };

    this._modalService.open(content, modalOptions).result.then((result) => {
      if (!result) return;

      this._taskService
        .deleteTask(taskId)
        .pipe(takeUntil(this._subscription$))
        .subscribe({
          next: () => {
            this.inItTask();
            this._alertService.sendAlert('Task Deleted');
          },
        });
    });
  }

  ngOnDestroy(): void {
    this._subscription$.next();
    this._subscription$.complete();
  }
}
