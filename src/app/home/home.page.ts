import { Component } from '@angular/core';
import { ActionSheetController, AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks : any[] = [];
  ActionSheetController: any;

  constructor(private alertCtrl: AlertController, private toastCtrl : ToastController, private actionSheetCtrl : ActionSheetController) {
    let taskJson = localStorage.getItem('taskDb');

    if (taskJson != null){
      this.tasks = JSON.parse(taskJson);
    }
  }

  async showAdd(){
    
    const alert = await this.alertCtrl.create({
      header: 'Adicionar novo item',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'O que deseja adicionar?'
        },
        
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmar Cancelar');
          }
        }, {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form.task);

           this.add(form.task);
          }
        }
      ]
    });

    await alert.present();

  }

  async add(newTask: string) {
    if (newTask.trim().length < 1)
    {
      const toast = await this.toastCtrl.create({
          message: 'Informe o que deseja fazer',
          duration: 2000,
          position: 'top',
      });

      toast.present();
      return;
    }
    let task = { name: newTask, done: false};

    this.tasks.push(task);

    this.updateLocalStorage();
  }

  updateLocalStorage(){
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }

  async openActions(task : any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;

          this.updateLocalStorage();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  delete(task : any){
    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.updateLocalStorage();
  }

}

  


