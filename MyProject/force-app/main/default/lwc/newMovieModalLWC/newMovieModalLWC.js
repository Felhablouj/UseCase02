import { LightningElement} from 'lwc';

// import MOVIE_OBJECT from '@salesforce/schema/Movie__c';

import NAME_FIELD from '@salesforce/schema/Movie__c.Name__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Movie__c.Description__c';
import TYPE_FIELD from '@salesforce/schema/Movie__c.Category__c';
import RELEASEDATE_FIELD  from '@salesforce/schema/Movie__c.Release_date__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { NavigationMixin } from 'lightning/navigation';


import ACTORNAME_FIELD from '@salesforce/schema/Actor__c.Name__c';

import { createRecord } from 'lightning/uiRecordApi';

/**
 * Creates Movie records.
 */
export default class MovieCreator extends  NavigationMixin(LightningElement){

  
objectApiName = 'Movie__c';
fieldList = [NAME_FIELD,DESCRIPTION_FIELD,TYPE_FIELD,RELEASEDATE_FIELD,ACTORNAME_FIELD];

handleMovieCreate(event){
        const evt = new ShowToastEvent({
            title :  "Movie Create",
            message : "Record ID: "+event.detail.id,
            variant : "success",
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName : 'Movie__c',
                actionName: 'view',
            },
        }); 
    }
}






    
