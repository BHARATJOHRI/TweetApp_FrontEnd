import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http:HttpClient) { }
  // private basepath =  'https://localhost:5001/api/tweet/';
  private basepath =  'https://tweetappazureapi.azurewebsites.net/api/tweet';

  public getUser():Observable<any>{
    return this.http.get(this.basepath+"/user");
  }


  public getTweet():Observable<any>{
    return this.http.get(this.basepath+"/");
  }

  public getComment():Observable<any>{
    return this.http.get(this.basepath+"/comment");
  }

  public getLike():Observable<any>{
    return this.http.get(this.basepath+"/like");
  }

  public addComment(tweet:any):Observable<any>{
    console.log(tweet);
    // const headers = {'content-type':'application/json'};
    // const body = JSON.stringify(tweet);
    // return this.http.post(this.basepath,body,{'headers':headers});
    return this.http.post(this.basepath+"/comment",tweet);
  }

  public addTweet(tweet:any):Observable<any>{
    // console.log(tweet.userId);
    // const headers = {'content-type':'application/json'};
    // const body = JSON.stringify(tweet);
    // return this.http.post(this.basepath,body,{'headers':headers});
    return this.http.post(this.basepath,tweet);
  }

  public addlike(tweet:any):Observable<any>{
    // console.log(tweet.userId);
    // const headers = {'content-type':'application/json'};
    // const body = JSON.stringify(tweet);
    // return this.http.post(this.basepath,body,{'headers':headers});
    return this.http.post(this.basepath+"/like",tweet);
  }

  public deleteTweet(id:any):Observable<any>{
    // console.log(id.id);
  
    return this.http.delete(this.basepath+"/"+id.id,id.id);
  }
  public updateTweet(tweet:any):Observable<any>{
    console.log(tweet);
    // const headers = {'content-type':'application/json'};
    // const body = JSON.stringify(tweet);
    // return this.http.post(this.basepath,body,{'headers':headers});
    return this.http.put(this.basepath+"/"+tweet.tweetId,tweet);
  }
}
