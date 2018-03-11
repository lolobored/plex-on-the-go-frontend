import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ComponentPageTitle} from '../../../shared/page-title/page-title';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent implements OnInit {

  elasticSearchUrl = new FormControl('', [Validators.required, Validators.pattern('https?://.*')]);

  constructor(public _componentPageTitle: ComponentPageTitle) {
  }

  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - Elastic Search';
  }

  getErrorMessage() {
    return this.elasticSearchUrl.hasError('required') ? 'You must enter a value' :
      this.elasticSearchUrl.hasError('email') ? 'Not a valid email' :
        'Not a valid url';
  }




}
