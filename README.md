bravecollective-freight
================

Website: http://freight.braveineve.com

## Frontend
* Adapt freighting rates, hubs and exports in *webroot/js/freight_jf.js*
* Run *./generate.sh* in *./gen_website/*
* Point webserver to *webroot*

## Backend - Stations
* Store EVE data export in *toolkit_ruby* schema
* Edit database username and password in *./gen_stations/generate.py*
* Adapt region filter/station list in *./gen_stations/generate.py*
* Run *./cron.sh* in *./gen_stations/*

## Backend - Contracts
* Edit corp API keys in *./gen_contracts/cron.sh*
* Run *./cron.sh* in *./gen_contracts/*
