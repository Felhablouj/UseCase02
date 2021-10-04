import { LightningElement,api,track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import MOVIENAME_FIELD from '@salesforce/schema/Movie__c.Name__c';
import CATEGORY_FIELD from '@salesforce/schema/Movie__c.Category__c';
import ID_FIELD from '@salesforce/schema/Movie__c.Id';



const fields = [
    NAME_FIELD,
    TITLE_FIELD,
    PHONE_FIELD,
    EMAIL_FIELD,
    PICTURE_FIELD
];


export default class MoviePreviewLwc extends LightningElement {
    
    @api movie;
    @api objectApiName;
    @track error;
    @track isUpdateMode;

    subscription = null;
    recordId;

    Name;
    Category;
    Descritpion;

    
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
    customHideModalPopup() {    
        
        this.isUpdateMode = false;
    }
    clickUpdate(){
        this.isUpdateMode = true;
    //  Create the recordInput object
        // const fields = {};
        // fields[ID_FIELD.fieldApiName] = this.movie.Id;
        // fields[MOVIENAME_FIELD.fieldApiName] = this.template.querySelector("[data-field='Name__c']").value;
        // fields[CATEGORY_FIELD.fieldApiName] = this.template.querySelector("[data-field='Category__c']").value;

        
        // const recordInput = { fields };
        // updateRecord(recordInput)
        // .then(() => {
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: 'Success',
        //             message: 'Case Updated',
        //             variant: 'success'
        //         })
        //     );
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
    }
}




   
