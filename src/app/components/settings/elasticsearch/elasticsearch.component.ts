import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent {

  elasticSearchUrl = new FormControl('', [Validators.required, Validators.pattern('https?://.*')]);

  getErrorMessage() {
    return this.elasticSearchUrl.hasError('required') ? 'You must enter a value' :
      this.elasticSearchUrl.hasError('email') ? 'Not a valid email' :
        'Not a valid url';
  }


}
