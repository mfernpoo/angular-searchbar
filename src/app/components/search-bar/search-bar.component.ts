import {Component, inject} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';
import {SearchBarService} from '../../services/search-bar.service';
import {SearchOverlayComponent} from '../search-overlay/search-overlay.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconButton, MatIcon, OverlayModule, SearchOverlayComponent, NgClass],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  private readonly searchbarService = inject(SearchBarService)
  overlayOpen = this.searchbarService.overlayOpen;
  searchTerm = this.searchbarService.searchTerm;

  search(searchTerm:string){

    if (!searchTerm) return;

    this.searchbarService.search(searchTerm);
  }

  clearSearch(){
    this.searchbarService.clearSearch();
  }

}
