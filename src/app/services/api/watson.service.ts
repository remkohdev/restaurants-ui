import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WatsonService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTone(text) {
    return new Promise( (resolve, reject) => {

      const apikey = '8FOEUDaR01oQLhn4XCa-pik37WqhhwjM8PHZdAv-brwC';
      const authorizationToken = 'Basic YXBpa2V5OjhGT0VVRGFSMDFvUUxobjRYQ2EtcGlrMzdXcWhod2pNOFBIWmRBdi1icndD';

      const url = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21';

      const headers = new HttpHeaders();
      headers.set('Accept', '*/*');
      headers.set('Content-Type', 'application/json' );
      headers.set('Authorization', authorizationToken);
      headers.set('apikey', apikey);
      headers.set('Access-Control-Allow-Origin', '*');

      const options = {};

      const body = {
        text
      };

      /** creates CORS error when running as web server
       * TODO replace with proxy in Node.js /tone
      this.httpClient.post(url, body, { headers })
        .subscribe( (data) => {
          console.log(`=====>tone`);
          console.log( data );
          resolve(data);
        }, error => {
          console.log(error);
          reject(error);
        });
      */
    });
  }

}
