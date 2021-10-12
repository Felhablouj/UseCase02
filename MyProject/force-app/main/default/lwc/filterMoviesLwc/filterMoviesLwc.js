import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import MOVIE_OBJECT from '@salesforce/schema/Movie__c';

import NAME_FIELD from '@salesforce/schema/Movie__c.Name__c';
import RELEASEDATE_FIELD from '@salesforce/schema/Movie__c.Release_date__c';
import CATEGORY_FIELD from '@salesforce/schema/Movie__c.Category__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Movie__c.Description__c';



// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import filterMoviesMC from '@salesforce/messageChannel/FilterMoviesMessageChannel__c';

export default class FilterMoviesLwc extends LightningElement {
    
    /**
     * A Context object which provides information about the Lightning web components
     *  that are using the Lightning message service.
     */
    @wire(MessageContext)
    messageContext;

    @track filterValue;
    @track submittedFilterValue;
    @api fields;
    @api objectApiName = MOVIE_OBJECT;
    /**
     * Input from Design parameters in Lightning App Builder.
     * Name should match the property name given in meta.xml file
     */
    @api componentLabel;
    //@api filterLabel;//Input from parent component

    handleClick(){
        /**
         * Don’t use the window or document global properties to query for DOM elements
         * Don’t use ID selectors with querySelector. The IDs that you define in HTML templates
         *  may be transformed into globally unique values when the template is rendered.
         */
        let filterBox = this.template.querySelector("lightning-input");
        let filterKeyValue = filterBox.value;
        this.submittedFilterValue=filterKeyValue;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Event dispatched using Lightning Message Service',
                message: 'Filter Key : '+this.submittedFilterValue,
                variant: 'success'
            })
        );

        const payload = { filterKey : this.submittedFilterValue };
        publish(this.messageContext, filterMoviesMC, payload);

    }



        //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
        @track isModalOpen = false;
        openModal() {
            // to open modal set isModalOpen tarck value as true
            this.isModalOpen = true;
        }
        closeModal() {
            // to close modal set isModalOpen tarck value as false
            this.isModalOpen = false;
        }
             // Expose a field to make it available in the template
        fields = [NAME_FIELD,RELEASEDATE_FIELD,CATEGORY_FIELD,DESCRIPTION_FIELD];

        handleSuccess(event) {
            const toastEvent=new ShowToastEvent({

                title:"Movie has been created successfully",
                message:"Movie created : "+event.detail.id,
                variant:"success"
            })
            this.dispatchEvent(toastEvent);
        }

}