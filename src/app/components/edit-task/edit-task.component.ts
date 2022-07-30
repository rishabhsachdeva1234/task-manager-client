import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
  private readonly _subscription$ = new Subject<void>();
  taskID: string = '';
  editTaskForm!: FormGroup;
  constructor(
    private readonly _router: ActivatedRoute,
    private readonly _taskService: TaskService,
    private readonly _alertService: AlertHandlerService,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editTaskForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      completed: [false, [Validators.required]],
    });

    this._router.paramMap
      .pipe(
        takeUntil(this._subscription$),
        switchMap((param: ParamMap) => {
          this.taskID = param.get('id')!;
          return this._taskService.getTask(this.taskID);
        })
      )
      .subscribe((taskResponse) => this.editTaskForm.patchValue(taskResponse));
  }

  updateTask() {
    if (this.editTaskForm.invalid) {
      this.editTaskForm.markAllAsTouched();
      this.editTaskForm.updateValueAndValidity();
      return;
    }
    this._taskService
      .updateTask(this.taskID, this.editTaskForm.value)
      .pipe(takeUntil(this._subscription$))
      .subscribe({
        next: () => {
          this._alertService.sendAlert('Task Updated');
        },
      });
    console.log(this.editTaskForm.value);
  }

  get getTaskName(): FormControl {
    return this.editTaskForm.get('name') as FormControl;
  }

  ngOnDestroy(): void {
    this._subscription$.next();
    this._subscription$.complete();
  }
}
