import {effect, Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  overlayOpen: WritableSignal<boolean> = signal<boolean>(false)
  recentSearches: WritableSignal<string[]> = signal<string[]>(JSON.parse(window.localStorage.getItem('recentSearches') ?? '[]'));
  searchTerm = signal('')

  constructor() {
  }

  search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    this.overlayOpen.set(false)
    this.addToRecentSearches(searchTerm);
    console.log("added",this.searchTerm());
  }

  addToRecentSearches(searchTerm: string) {
    const loweCaseTerm = searchTerm.toLowerCase();
    this.recentSearches.set([loweCaseTerm, ...this.recentSearches().filter(s => s !== loweCaseTerm)])

  }

  clearSearch(){
    this.searchTerm.set('')
    this.overlayOpen.set(true)
  }

  deleteRecentSearch(search: string) {
    this.recentSearches.set(this.recentSearches().filter(s => s !== search))
    console.log("removed",search)
  }

  saveLocalStorage = effect(() =>
    window.localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches()))
  )
}
