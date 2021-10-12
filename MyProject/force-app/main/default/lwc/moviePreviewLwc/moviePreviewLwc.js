import { LightningElement, wire,track } from "lwc";
import {
  subscribe,
  unsubscribe,
  MessageContext
} from "lightning/messageService";
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { deleteRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

import movieSelected from '@salesforce/messageChannel/MovieChannel__c';
import ID_FIELD from '@salesforce/schema/Movie__c.Id';
import NAME_FIELD from '@salesforce/schema/Movie__c.Name__c';
import CATEGORY_FIELD from '@salesforce/schema/Movie__c.Category__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Movie__c.Description__c';



const FIELDS = [
    NAME_FIELD,
    DESCRIPTION_FIELD,
    CATEGORY_FIELD
    // ID_FIELD
];

export default class MoviePreviewLwc extends LightningElement {
    subscription = null;
    @track recordId;
    @track Exist = true;
    Name;
    Category;
    @track fields = FIELDS;

    @track isUpdateMode = false;
    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (error) {
            this.Exist=false;
            this.dispatchToast(error);
        } else if (data) {
            console.log("--data exist inside wiredRecord----");
            console.log(data);
            this.handleMessage(data);
            this.Exist=true;
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data, item))
            );
        }
    }
    @wire(MessageContext)
    messageContext;


    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        console.log('----connectedCallback in LWCPREVIEW----');
        this.subscribeToMessageChannel();
    }
    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
            if (!this.subscription) {
                console.log("---subscribing in progress -------");
                this.subscription = subscribe(
                    this.messageContext,
                    movieSelected,
                    (message) => this.handleMessage(message)
                );
            }else{
                console.log("---subscribing is not  progress -------");

            }
            console.log("---Methode subscribeToMessageChannel-------");

    }
    // Handler for message received by component
    handleMessage(message) {
        console.log("MESSAGE in handleMessage ");
        console.log(message);
        this.recordId = message.recordId;
    }
    disconnectedCallback() {
        console.log("-----disconnectedCallback-------");
        this.unsubscribeToMessageChannel();
    }
    
    unsubscribeToMessageChannel() {
        console.log("-----unsubscribeToMessageChannel-------");
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Helper
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: reduceErrors(error).join(', '),
                variant: 'error'
            })
        );
    }



    clickdelete(event) {
        let deleteId = event.target.value;
        deleteRecord(deleteId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );

            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

//--------------------------Methode Update--------------------------------------//
    customHideModalPopup() {    
        
        this.isUpdateMode = false;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isUpdateMode = false;
    }
    clickUpdateMode(){
        this.isUpdateMode = true;
    }
    // clickUpdate(){
    //     this.isUpdateMode = true;
    //  //Create the recordInput object
    //     // const fields = {};
    //     // fields[ID_FIELD.fieldApiName] = this.movie.Id;
    //     // fields[MOVIENAME_FIELD.fieldApiName] = this.template.querySelector("[data-field='Name__c']").value;
    //     // fields[CATEGORY_FIELD.fieldApiName] = this.template.querySelector("[data-field='Category__c']").value;

        
    //     const recordInput = { fields };
    //     updateRecord(recordInput)
    //     .then(() => {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Success',
    //                 message: 'Case Updated',
    //                 variant: 'success'
    //             })
    //         );
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
    }
}

