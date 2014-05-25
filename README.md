dokuwiki-freight
================

Website: http://freight.braveineve.com

## Frontend
* Adapt freighting rates, hubs and exports in *webroot/js/calc.js*
* Point webserver to *webroot*

## Backend
* Store EVE data export in *toolkit_ruby* schema
* Edit DB username and password in *evedata/generate.py*
* Adapt region filter/station list in *evedata/generate.py*
* Chose between *online* or *offline* mode in *evedata/generate.py*
* Run *./generate.py ../webroot/evedata.json*

### Online
Online mode fetches all required information through the EVE API
* Setup a crontab to re-generate data on a regular basis

### Offline
Offline mode requires manually downloaded EVE API files
* Download EVE API files manually and place them along *generate.py*
* Run *./generate.py ../webroot/evedata.json*
