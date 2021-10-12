// eventWithData.js
import { LightningElement, wire,api,track} from 'lwc';
import getNameMovie from '@salesforce/apex/MovieController.getNameMovie';
import getMoviesByFilter from '@salesforce/apex/MovieController.getMoviesByFilter';


// Import message service features required for publishing  , subscrinbing and the message channel
import {subscribe,unsubscribe,publish, MessageContext } from 'lightning/messageService';
import filterMoviesMC from '@salesforce/messageChannel/FilterMoviesMessageChannel__c';
import movieSelected from '@salesforce/messageChannel/MovieChannel__c';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name__c' },
    { label: 'Category', fieldName: 'Category__c'}
];
export default class MoviesResultsLWC extends LightningElement {

    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    handleMovieSelect(event) {   
        console.log("---publishing In Progress----- "); 
        const payload = { recordId: event.target.movie.Id };
        console.log("value of payload");
        console.log(payload);
        publish(this.messageContext, movieSelected, payload);      
    }
    
    subscription = null;
    @track columns = COLUMNS;
    @track movies;

    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        //subscribing to the Lightning Message Service Channel
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                filterMoviesMC,
                (message) => this.handleFilterKeySubmit(message)
            );
        }
        this.loadRelatedContacts("");
    }
    
    //Lifecycle hook which fires when a component is removed from the DOM
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    loadRelatedContacts(filterKey){
        getMoviesByFilter({ key : filterKey})
        .then(results=>{
            this.movies=results;console.log('dans loadRelatedContacts');
        })
        .catch(error=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleFilterKeySubmit(message){
        const filterKey = message.filterKey;
        this.loadRelatedContacts(filterKey);
    }

   
}