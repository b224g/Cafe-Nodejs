import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private snackbarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]]
    });
    if (this.dialogData.action == 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction == 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const formData = this.categoryForm.value;
    const data = {
      name: formData.name
    };
    this.categoryService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    )
  }

  edit() {
    const formData = this.categoryForm.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name
    };
    this.categoryService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

}
