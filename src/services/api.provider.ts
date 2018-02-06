import {
    Http,
    Headers,
    Response,RequestOptions
} from "@angular/http";
import {
    Observable
} from "rxjs/Observable";
import "rxjs/Rx";
import {
    Injectable
} from "@angular/core";
import 'rxjs/add/operator/map';

export interface patient_signup {
    first_name: string;
    last_name: string;
    password: string;
    birthday: string;
    role ? : string;
}

export interface api_feeds {
    filter: string;
    user_id: string;
    page : number;
    per_page: number;
    offset: number;
}

export interface auth_loginWrapper {
    body: patient_signup,
    headers: Headers
}

export interface user_signin{
    email: string;
    password: string;
}
/**
 *
 * @class Api
 * @param {(string)} [domainOrOptions] - The project domain.
 */
@Injectable()
export class Api {

    private domain: string;
    private domain1: string;
    private domain2: string;
    private domain3: string;
    private domain4: string;

    constructor(private http: Http) { //had to include HTTP_PROVIDERS in bootstrap (global) for this to work. Workaround needed
        this.domain ="http://139.59.87.215:8000/api/v1.0/resources";
        this.domain1 ="http://139.59.87.215:8000";
        this.domain2 ="http://139.59.87.215:8000/api/v1.0/reports";
        this.domain3="http://139.59.26.157:3333/";
        this.domain4="http://139.59.26.157:3335"
    }

    /**
     * Handles api call error
     * @param {any} error
     * @returns {ErrorObservable}
     */
    private handleError(error: any) {
        let errMsg = error || {
            status: 500
        };
        return Observable.throw(errMsg);
    }

    /**
     * Set pattern type parameters
     * @param {string} pattern - the regex pattern
     * @returns {Object} the query parameters
     */
    private setPatternTypeParameter(pattern, queryParameters, parameters) {
        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp(pattern).test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });
        return queryParameters;
    }

    /**
     * Set pattern type parameters
     * @param {string} camelCaseName - the camel case name of the parameter
     * @param {string} name - the name of the parameter
     * @returns {Object} the query parameters
     */
    private setNonPatternTypeParameter(camelCaseName: string, name: string, queryParameters, parameters) {
        if (parameters[camelCaseName] !== undefined) {
            queryParameters[name] = parameters[camelCaseName];
        }
        return queryParameters;
    }

    /**
     * Returns the api call url
     * @param {string} path - the path of the endpoint
     * @param {Object} queryParameters - the corresponding query parameters
     * @returns {string} - the complete query api call url
     */
    private getUrl(path: string, queryParameters) {

        let paramsStr = Object.keys(queryParameters).map(function(key) {
            return key + '=' + encodeURIComponent(queryParameters[key]);
        }).join('&');

        let url = paramsStr ? this.domain + path + '?' + paramsStr : this.domain + path;
        return url;
    }

    private getUrl1(path: string, queryParameters) {

        let paramsStr = Object.keys(queryParameters).map(function(key) {
            return key + '=' + encodeURIComponent(queryParameters[key]);
        }).join('&');

        let url = paramsStr ? this.domain1 + path + '?' + paramsStr : this.domain + path;
        return url;
    }
    private getUrl3(path: string, queryParameters) {

        let paramsStr = Object.keys(queryParameters).map(function(key) {
            return key + '=' + encodeURIComponent(queryParameters[key]);
        }).join('&');

        let url = paramsStr ? this.domain3 + path + '?' + paramsStr : this.domain3 + path;
        return url;
    }
    private getUrl4(path: string, queryParameters) {

        let paramsStr = Object.keys(queryParameters).map(function(key) {
            return key + '=' + encodeURIComponent(queryParameters[key]);
        }).join('&');

        let url = paramsStr ? this.domain4 + path + '?' + paramsStr : this.domain4 + path;
        return url;
    }

    /**
     * Returns the query parameters
     * @param {Object} parameters - the api call parameters
     * @param queryParameters - the corresponding query parameters
     * @returns {Object} - the query parameters of the api call
     */
    private setQueryParameters(parameters, queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            var parameter = parameters.$queryParameters[parameterName];
            queryParameters[parameterName] = parameter;
        });
        return queryParameters;
    }

/**
     * @method
     * @name Api#api_ppToilets_list
     * @param {} body - zone list
     *
     */
    api_ppToilets_list(parameters: {
      "zone_number" ?: number,
      "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain4;
        let path = '/getPetrolPumpList';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl4(path, queryParameters);

        return this.http.get(url,body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_ctpt_list
     * @param {} body - zone list
     *
     */
    api_ctpt_list(parameters: {
      "zone_number" ?: number,
      "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/getCTPTList';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);


        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_gvp_list
     * @param {} body - zone list
     *
     */
    api_gvp_list(parameters: {
        'zone_number' ? : number,
        'ward_number' ? : string,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/getGvpsList';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);
        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_rwa_list
     * @param {} body - zone list
     *
     */
    api_rwa_list(parameters: {
      "zone_number" ?: number,
      "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain4;
        let path = '/getRwasList/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);
        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

/**
     * @method
     * @name Api#api_streetPlay_list
     * @param {} body - zone list
     *
     */
    api_streetPlay_list(parameters: {
        "zone_number" ?: number,
        "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/streetplay/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };



    /**
     * @method
     * @name Api#api_getCityParksList
     *
     */
    api_getCityParksList(parameters: {
      "zone_number" ?: number,
      "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/getCityParksList';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);


        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_getCommercialAreasList
     *
     */
    api_getCommercialAreasList(parameters: {
      "zone_number" ?: number,
      "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/getCommercialAreasList';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);


        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_owc_list
     * @param {} body - zone list
     *
     */
    api_owc_list(parameters: {
        "zone_number" ?: number,
        "ward_number" ?: string
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain4;
        let path = '/getOwcsList/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);


        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_twinbin_list
     * @param {} body - zone list
     *
     */
    api_twinbin_list(parameters: {
        'zone_number' ? : number,
        'ward_number' ? : string,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/getTwinBinsList';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_number', 'zone_number', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('ward_number', 'ward_number', queryParameters, parameters);


        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };
    /**
     * @method
     * @name Api#api_zone_list
     * @param {} body - zone list
     *
     */
    api_zone_list(parameters: {
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/zones/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    api_zone_list_with_geo(parameters: {
        'geofence_require' ? : boolean,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/zones/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;


        queryParameters = this.setNonPatternTypeParameter('geofence_require', 'geofence_require', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_ward_list
     * @param {} body - zone list
     *
     */
    api_ward_list(parameters: {
        'zone_id' ? : number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/wards/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_id', 'zone_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_ward_routes_list
     * @param {} body - zone list
     *
     */
    api_ward_routes_list(ward_id): Observable < any > {
        let domain = this.domain;
        let path = '/wards/'+ward_id;
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_vehicles_shift
     * @param {} body - api vehicles shift
     *
     */
    api_vehicles_shift(parameters: {
        'zone_id' ? : number,
        'shift_id' ? : number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/vehicles/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_id', 'zone_id', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('shift_id', 'shift_id', queryParameters, parameters);
        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_vehicles_List
     * @param {} body - api vehicles List
     *
     */
    api_vehicles_List(parameters: {
        'ward_id' ? : number,
        'shift_id' ? : number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/vehicles/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('ward_id', 'ward_id', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('shift_id', 'shift_id', queryParameters, parameters);
        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };


     /**
     * @method
     * @name Api#api_vehicles_List
     * @param {} body - api vehicles List
     **/
    api_vehicles_route_list(parameters: {
        'ward_id' ? : number,
        'shift_id' ? : number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/routes/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('ward_id', 'ward_id', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('shift_id', 'shift_id', queryParameters, parameters);
        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_ward_route_list
     * @param {} body - api_ward_route_list
     * 356917057989589/?start_date=2017-12-15&shift_id=0
     **/
    api_ward_route_list(name, parameters: {
        'shift_id' ? : number,
        'start_date' ? : string,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/live_feed_data1/'+name+'/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('start_date', 'start_date', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('shift_id', 'shift_id', queryParameters, parameters);
        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    api_ward_route_list_page(path, parameters: {
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain1;

        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.domain1 + path;//this.getUrl1(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_zone_fuel_stations
     * @param {} body - zone list
     *
     */
    api_zone_fuel_stations(parameters: {
        'zone_id' ? : number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/fuel_stations/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_id', 'zone_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
       url = this.getUrl(path, queryParameters);
        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };
    /**
     * @method
     * @name Api#api_parkingspots_list
     * @param {} body - performance report
     *
     */
     api_parkingspots_list(parameters: {
        $queryParameters ? : {}
     }): Observable < any > {
        let domain = this.domain2;
        let path = '/parkingspots/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        url = this.getUrl(path, queryParameters);
        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };


    /**
     * @method
     * @name Api#transfer_stations
     * @param {} body - performance report
     *
     */
     transfer_stations_list(parameters: {
        'ward_id' ? : number,
        $queryParameters ? : {}
     }): Observable < any > {
        let domain = this.domain2;
        let path = '/transfer_stations/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        queryParameters = this.setNonPatternTypeParameter('ward_id', 'ward_id', queryParameters, parameters);
        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);
        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };
     /**
     * @method
     * @name Api#trenching_grounds
     * @param {} body - performance report
     *
     */
     trenching_grounds_list(parameters: {
        $queryParameters ? : {}
     }): Observable < any > {
        let domain = this.domain2;
        let path = '/trenching_grounds/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        url = this.getUrl(path, queryParameters);
        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_performance_report
     * @param {} body - performance report
     *
     */
    api_performance_report(parameters: {
        'month' ? : number,
        'year' ? : number,
        'zone_no'?: number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain2;
        let path = '/../reports/performance_report/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_no', 'zone_no', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('month', 'month', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('year', 'year', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);

        // url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };


    /**
     * @method
     * @name Api#api_gps_movement_report
     * @param {} body - zone list
     *
     */
    api_gps_movement_report(imei ,date): Observable < any > {
        let domain = this.domain3;
        let path = 'gps_movement_report/'+imei+'/'+date+'/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl3(path, queryParameters);
        console.log(url);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_gps_log_report
     * @param {} body - zone list
     *
     */
    api_gps_log_report(imei ,date): Observable < any > {
        let domain = this.domain3;
        let path = 'gps_log/'+imei+'/'+date+'/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl3(path, queryParameters);
        console.log(url);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_gps_log_report
     * @param {} body - zone list
     *
     */
    api_gps_playback(imei ,date): Observable < any > {
        let domain = this.domain3;
        let path = 'gps_log/'+imei+'/'+date+'/snapped';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl3(path, queryParameters);
        console.log(url);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_vehicles_List_zone_wise
     * @param {} body - api vehicles List according to zone
     *
     */
    api_vehicles_List_zone_wise(parameters: {
        'zone_id' ? : number,
        'shift_id' ? : number,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/vehicles/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('zone_id', 'zone_id', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('shift_id', 'shift_id', queryParameters, parameters);
        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }

        url = this.getUrl(path, queryParameters);



        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_gps_log_report
     * @param {} body - zone list
     *
     */
    live_gps_data(imei ,date): Observable < any > {
        let domain = this.domain3;
        let path = 'live_gps_data/'+imei+'/'+date;
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        url = this.getUrl3(path, queryParameters);
        console.log(url);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#api_gps_log_report
     * @param {} body - zone list
     *
     */
    api_all_vehicle_list(body_param): Observable < any > {
        let domain = this.domain3;
        let path = 'vehicles/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        url = this.getUrl3(path, queryParameters);
        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };


    /**
     * @method
     * @name Api#Login
     * @param {} body - User Login
     *
     */
    
    api_login(parameters: {
        'email' ? : string,
        'password' ? : string,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/login';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;

        queryParameters = this.setNonPatternTypeParameter('email', 'email', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('password', 'password', queryParameters, parameters);


        url = this.getUrl4(path, queryParameters);

        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };

    /**
     * @method
     * @name Api#Register
     * @param {} body - User Register
     *
     */
    api_register(parameters: {
        'email' ? : string,
        'password' ? : string,
        'firstname' ? : string,
        'lastname' ? : string,
        'mobile' ? : string,
        $queryParameters ? : {}
    }): Observable < any > {
        let domain = this.domain;
        let path = '/register';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let form = new FormData();
        let requestOptionArgs = {};
        let paramsStr: string;
        queryParameters = this.setNonPatternTypeParameter('email', 'email', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('password', 'password', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('firstname', 'firstname', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('lastname', 'lastname', queryParameters, parameters);
        queryParameters = this.setNonPatternTypeParameter('mobile', 'mobile', queryParameters, parameters);
        url = this.getUrl4(path, queryParameters);
        return this.http.get(url, body)
            .map(res => {
                return {
                    body: res.json(),
                    headers: res.headers,
                }
            })
            .catch(this.handleError);
    };
}

export const APP_SC_PROVIDERS = [Api];
