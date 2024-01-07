import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { AppareilModel } from 'src/app/core/model/appareil.model';
import { CategorieModel } from 'src/app/core/model/categorie.model';
import { Pagination } from 'src/app/core/model/request.model';
import { AppareilService } from 'src/app/core/services/appareil.service';

@Component({
  selector: 'app-list-appareil',
  templateUrl: './list-appareil.component.html',
  styleUrls: ['./list-appareil.component.scss']
})
export class ListAppareilComponent implements OnInit, OnDestroy {
  i = 0;
  private appareil?: AppareilModel;
  listOfData: AppareilModel[] = [];
  listCat: CategorieModel[] = [];
  private subscriptions: Subscription[] = [];
  page: number = 0;
  size: number = 4;
  totalElement: number = 0;
  isLoading: boolean = true;
  isUpdate: boolean = false;
  isAdd: boolean = false;
  updateForm!: FormGroup
  addForm!: FormGroup;
  constructor(private appService: AppareilService, private message: NzMessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      label: [null, [Validators.required]],
      description: [null, [Validators.required]],
      state: [null, [Validators.required]],
      categorie: [null, [Validators.required]],
    });
    this.addForm = this.formBuilder.group({
      label: [null, [Validators.required]],
      description: [null, [Validators.required]],
      state: [null, [Validators.required]],
      categorie: [null, [Validators.required]],
    });

    this.subscriptions.push(this.fetchAll());
    this.subscriptions.push(this.fetchCategorie());
  }

  fetchAll(): Subscription {
    return this.fetch('getAllAppareils');
  }


  showUpdateModal(data: AppareilModel): void {
    this.updateForm.patchValue({
      label: data.label,
      description: data.description,
      state: data.state,
      categorie: data.categorie?.id
    });

    this.isUpdate = true;
  }


  fetch(action: string, value?: any): Subscription {
    console.log(`Fetching data for action: ${action}`);
    let queryParams: Pagination = {
      page: this.page + 1,
      size: this.size
    };

    switch (action) {
      case 'getAllAppareils':
        return this.appService.getAppareils(queryParams).subscribe(
          (success: any) => {
            console.log("success  ", success);
            this.listOfData = success.content;
            this.totalElement = success.length;
            this.isLoading = false;
          },
          (failed) => {
            console.error('Error fetching appareils:', failed);
            this.message.error(failed.error);
            this.isLoading = false;
          }
        );
      case 'addAppareil':
        console.log("addForm vvvv =>> ", this.addForm.value);
        const data = this.addForm.value;

        this.appareil = {
          label: data.label,
          description: data.description,
          state: data.state,
          categorie: { id: data.categorie }
        };
        console.log(data);

        return this.appService.addAppareil(this.appareil).subscribe(
          (success) => {
            this.message.success("Addition successful");
            this.isAdd = false;
            this.fetchAll();
          },
          (failed) => {
            console.error('Error adding appareil:', failed);
            this.message.error(failed.error);
            this.isAdd = false;
          }
        );

      case 'editAppareil':
        console.log("update fff =>> ", this.addForm.value);
        const dataUp=this.updateForm.value;
        this.appareil = {
          id: dataUp.id,
          label: dataUp.label,
          description: dataUp.description,
          categorie: {id: dataUp.categorie}
        }
        console.log(dataUp);
        
        return this.appService.updateAppareil(this.appareil).subscribe(
          (success)=>{
            this.message.success("update successful");
            this.isUpdate = false;
            this.fetchAll();
          },
          (failed) => {
            console.error('Error update appareil:', failed);
            this.message.error(failed.error);
            this.isUpdate = false;
          }
        )
       break;
      case 'deleteAppareil':
        console.log("delete", value);

        return this.appService.deleteApp(value).subscribe(
          (success) => {
            this.message.success("delete successful");
            this.fetchAll();
          },
          (failed) => {
            console.error('Error dete appareil:', failed);
            this.message.error(failed.error);
          }
        );
        break;

      default:
        console.warn('Unknown action:', action);
        throw new Error(`Unknown action: ${action}`);
    }
  }

  fetchCategorie(request?: any): Subscription {
    this.isLoading = true;
    return this.appService.getCategorie(request).subscribe(
      (data: any) => {
        console.log('Fetched app:', data);
        this.listCat = data.content;
      }
    );
  }

  showModal() {
    this.isAdd = true;
  }
  handleCancel() {
    this.isAdd = false;
    this.isUpdate = false
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    this.size = params.pageSize;
    this.page = params.pageIndex - 1;
    this.isLoading = true;
    this.fetchAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
