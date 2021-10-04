// eventWithData.js
import { LightningElement, wire,track,api} from 'lwc';
import getNameMovie from '@salesforce/apex/MovieController.getNameMovie';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import MOVIE_SELECTED_CHANNEL from '@salesforce/messageChannel/Movie_Selected__c';
// const COLUMNS = [
//     { label: 'Name', fieldName: 'Name__c' },
//     { label: 'Category', fieldName: 'Category__c' }
// ];

export default class MoviesResultsLWC extends LightningElement {
    // @api recordId;
    // @track columns = COLUMNS;
    // @track data;
    
    // @track isError=false;
    // @track errorMessage;

    // //Lifecycle hook which fires when a component is inserted into the DOM
    // connectedCallback(){
    //     this.loadRelatedContacts();
    // }
    
    // loadRelatedContacts(){
    //     //Returns a promise
    //     getNameMovie({movieId : this.recordId})
    //     .then(results=>{
    //         this.data=results;
    //         this.isError=false;
    //     })
    //     .catch(error=>{
    //         this.isError=true;
    //         this.errorMessage=error.body.message;    
    //     });
    // }



    selectedMovie;

	@wire(getNameMovie) movies;

    @wire(MessageContext) messageContext;


    movieSelected(event) {
        const movieId = event.detail;
        this.selectedMovie = this.movies.data.find(movie => movie.Id === movieId);
    }


        // Respond to UI event by publishing message
        handleMovieSelect(event) {
            const payload = { recordId: event.target.movie.Id };
    
            publish(this.messageContext, MOVIE_SELECTED_CHANNEL, payload);
        }
   
}