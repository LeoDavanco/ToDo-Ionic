import { Component } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks : any[] = [];

  constructor(private alertCtrl: AlertController, private toastCtrl : ToastController) {}

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

}
