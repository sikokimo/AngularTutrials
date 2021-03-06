﻿import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/topromise"

import { Hero } from "./hero";
//import { HEROES } from "./mock-heros";

@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:18444/api/heroes';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl).toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }

    create(name: string) {
        var postHeader = new Headers({ "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }); //"name=" + name JSON.stringify({ "name": name })
        return this.http.post(this.heroesUrl, JSON.stringify({ "name": name }), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    update(hero: Hero) {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(id: number) {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    //getHeroesSlowly(): Promise<Hero[]> {
    //    return new Promise(resolve => {
    //        // Simulate server latency with 2 second delay
    //        setTimeout(() => resolve(this.getHeroes()), 2000);
    //    });
}
