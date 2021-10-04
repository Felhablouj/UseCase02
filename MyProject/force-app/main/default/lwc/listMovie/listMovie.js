import { LightningElement, wire } from 'lwc';
import getNameMovie from '@salesforce/apex/MovieController.getNameMovie';

export default class ListMovie extends LightningElement {
    selectedMovie;

    @wire(getNameMovie) movies;

    movieSelected(event) {
        const movieId = event.detail;
        this.selectedMovie = this.movies.data.find(movie => movie.Id === movieId);
    }

    get listIsNotEmpty() {
        return this.movies && Array.isArray(this.movies.data) && this.movies.data.length > 0;
    }
}