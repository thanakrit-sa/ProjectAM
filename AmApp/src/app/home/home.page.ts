import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfMake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { CallApiService } from '../call-api.service';
import { Order } from '../Models/Order';
import { concat } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  letterObj = {
    from: 'test',
    to: '123',
    text: 'come on bro'
  }
  data = {
    table: 'Table : ',
    number: 'Numberbill : ',
    date: 'Date : ',
    cat: 'Cashier :'
  }

  databill =
    { order: '', Quantity: '', total: '' }

  test: Order[] = []
  dataorder: Order[] = [];

  test111 = "sssss"
  dataOrder1: Order
  datadatebill: Date
  datadate: any
  pdfObj = null;
  constructor(private plt: Platform, private file: File, private fileopener: FileOpener, public callapi: CallApiService) { }
  ngOnInit() {
    this.getdatafilter()
    this.datadate = new Date().toLocaleString()


  }


  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'bill', style: 'subheader' },

        { text: this.data.table + "" + this.test111 },
        { text: this.data.number },
        { text: this.data.date + "" + this.datadate },
        { text: this.data.cat + "" },

        { text: '---------------------------------------------------------', style: 'subheader' },
        { text: this.dataname, },

        { text: "asdasd", style: 'story', margin: [0, 20, 0, 20] },


        {
          style: 'itemsTable',
          table: {
            widths: ['*', 75, 75,],
            body: [
              [
                { text: 'Description', style: 'itemsTableHeader' },
                { text: 'Quantity', style: 'itemsTableHeader' },
                { text: 'Price', style: 'itemsTableHeader' },

              ]
            ]
          }
        },
        {
          style: 'totalsTable',
          table: {
            widths: ['*', 75, 75],
            body: [
              [
                '',
                'Subtotal',
                'aaaa'
              ],
              [
                '',
                'Shipping',
                'asdqw'
              ],
              [
                '',
                'Total',
                '444444'
              ]
            ]
          },
          layout: 'noBorders'
        },

      ],
      styles: {
        ss:{},
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          alignment: 'center',
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        },
        itemsTable: {
          margin: [0, 5, 0, 15]
        },
        itemsTableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        totalsTable: {
          bold: true,
          margin: [0, 30, 0, 0]
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileopener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    }
    else {
      this.pdfObj.download();
    }
  }

dataname:any[]=[]
  getdatafilter() {
    this.callapi.GetListAllProduct().subscribe(it => {
      console.log(it.dateOrder);

      this.dataOrder1 = it
      console.log(this.dataOrder1);

      for (let index = 0; index < Object.keys(this.dataOrder1).length; index++) {
        this.test[index] = this.dataOrder1[index]
        this.dataname[index] = this.dataOrder1[index].nameProduct
        this.dataorder[index] = this.dataOrder1[index]

      }
      console.log(this.dataname);
      
      
     
      this.databill.order = this.dataOrder1.nameProduct 
      console.log(this.databill.order);
    });



  }
}
