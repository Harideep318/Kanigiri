/**
 * This lb2bCartOrderSummary component is use in cart page with Checkout button.
 * 
 * Data required the Order type, shiping condition, PO number and date fields to proceed to checkout.
 */


 import { LightningElement, api, wire,track } from 'lwc';
 import { NavigationMixin } from 'lightning/navigation';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import poNumber from '@salesforce/schema/Order.PoNumber';
 import getProfile from '@salesforce/apex/ProfileBased.getProfile';
 import {getRecord, getFieldValue, updateRecord} from 'lightning/uiRecordApi';
 const fields = [poNumber];
 
 export default class lb2bCartOrderSummary extends NavigationMixin(LightningElement) {
     @api poValue;
     @api recordId; // get the current record id
     @track data;
     ShowBtn = false;
     error;
     wiredActivities;
     @wire(getProfile)
     wiredActivities({ error, data }) {
       if (data){
         console.log('Data==> '+JSON.stringify(data));
         
         this.data = data;
         if(this.data == 'Customer Community Plus User'){
           this.ShowBtn = true;
         }else{
         this.ShowBtn = false;
   }
         console.log(this.data);
         this.error = undefined;
        } else if (error) {
         this.error = error;
         this.data = undefined;
        
     }
   }
     
     
      
     
     // Wire method to get the data of fields
     // @wire(getRecord, { recordId: '$recordId', fields })
     // order;
     handleChange(event){
         this.poValue = event.target.value;
         console.log(this.poValue+" "+this.order.data.id);  
         const fields = {};
         fields.Id = this.order.data.id;
         fields[poNumber.fieldApiName] = event.target.value;
         const recordInput = { fields };
         console.log("Updated Record"+recordInput);  
         updateRecord(recordInput)
         .then(() => {
             this.dispatchEvent(
                 new ShowToastEvent({
                     title: 'Success',
                     message: 'Value Updated',
                     variant: 'success'
                 })
             );
         })
         .catch(error => {
             console.log(error);
         });
          
     }
 
     value = '';
     value1 = '';
     get options() {
         return [
             { label: 'Indirect Customer', value: 'indirect customer' },
             { label: 'Regular Customer', value: 'regular customer' },
             { label: 'Premium Cutsomer', value: 'permium customer' },
         ];
     }
 
     get options1() {
         return [
             { label: 'Option 1', value1: 'option 1' },
             { label: 'Option 2', value1: 'option 2' },
             { label: 'Option 3', value1: 'option 3' },
         ];
     }
 /*
     handleOrderType(event) {
         this.value = event.detail.value;
         // this.options1= this.options.filter(d => d.value != this.value);
     }*/
 
     handleShipping(event) {
         this.value1 = event.detail.value1;
     }
 
 
     navigateToNext(event) {
         // getCartTotal();
 
         // let url = window.location.href.split("/s/");           
         // let newUrl = url[0] + "/s/order-review" ; 
         let url = window.location.href;
         let newUrl = url.replace(/cart/, 'checkout');
         console.log("url", newUrl);
         //this.showSpinner = false;       
         this.navigateToWebPage(newUrl);
    
     }
     navigateToWebPage(url) {
         console.log(url)
         this[NavigationMixin.Navigate]({
             type: 'standard__webPage',
             attributes: {
                 // objectApiName: 'Order_Review__c',
                 // actionName: 'view'
                 url: url
             }
         });
     }
 
 
     get todaysDate() {
         var today = new Date();
         var dd = String(today.getDate()).padStart(2, '0');
         var mm = String(today.getMonth() + 1).padStart(2, '0');
         var yyyy = today.getFullYear();
         today = mm + '/' + dd + '/' + yyyy;
         return today;
     }
 }