import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  
  public tweetForm : FormGroup;
  public commentForm: FormGroup;
  public likeForm: FormGroup;
  constructor(private authService:AuthService,
    private router:Router,
    private service:TweetService,
    private formBuilder:FormBuilder) { }
    public mytweet:number;
    public tweetdata:any;
    public commentdata:any;
    public userdata:any;
    public likedata:any;
    public k:any;
    public showMe:boolean=true;
    public show:boolean=false;
    public editshow:boolean = false;
    // public count:number=0;
    public count:any = [];
    public countcheck:any=[];

  ngOnInit(): void {
    this.gettweet();
    this.getUser();
    this.getComment();
    this.getLike();
    this.init();
    // this.try(likedata);
  }
  try(likedata:any){
    
    var arr=[2,3,4,55,2,3,4];
    var p =[];
    // var count:any = {
    // console.log(count);
    // console.log(likedata);

    for(var i=0;i<likedata.length;i++){
      // console.log(likedata);
      // console.log(likedata[i].tweetId);
      p[i] = likedata[i].tweetId;
    }
    // console.log(p);
    for(var i=0;i<p.length;i++){
      var num = p[i];
      // var dict:any = {};
      this.count[num] = this.count[num]?this.count[num]+1:1;
      // dict["tweet"]=p[i];
      // dict["like"]=this.count[num];
      // this.countcheck[i]=dict;
    }
    console.log(this.count);
    var zz = 0;
    for(var i=0;i<this.count.length;i++){
      if(this.count[i]>0){
        var dict:any = {};
        dict["tweet"]=i;
      dict["like"]=this.count[i];
      this.countcheck[zz]=dict;
        zz = zz + 1;
      }
    }
    console.log(123);
    
    console.log(this.countcheck);
    
    // for(var i=0;i<this.count.length;i++){
    //   console.log(1);
      
    //   console.log(this.count[i]);
      
    // }
    
    
  }
  toggle(){
    this.showMe=false;
    this.show=true;
  }

  toggle1(){
    this.showMe=true;
    this.show=false;
    console.log(this.count);
    
  }

  toggle2(){
    this.editshow = false;
    this.tweetForm.controls['post'].setValue('');
  }

  logout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  private gettweet():void{
    this.service.getTweet().subscribe(res => {
      this.tweetdata = res; 
      console.log(this.authService.loadCurrentUser());  
    });
  }

  private getUser():void{
    this.service.getUser().subscribe(res => {
      this.userdata = res; 
      console.log(this.userdata);  
    });
  }

  private getComment():void{
    this.service.getComment().subscribe(res => {
      this.commentdata = res; 
      console.log(this.commentdata);  
    });
  }

  private getLike():void{
    this.service.getLike().subscribe(res => {
      this.likedata = res; 
      console.log(this.likedata);  
      
      this.try(res);
    });

  }
  // tweetForm = new FormGroup({
  //   UserId:new FormControl(),
  //   post:new FormControl(''),
  // });

  public saveTweet(){
    
    console.log(this.tweetForm.value);
    
    this.service.addTweet(this.tweetForm.value).subscribe(res => {
      alert(res);
      this.gettweet();
    });
  }

  private init():void{
    this.k=this.authService.loadCurrentUser();
    this.mytweet=this.k.value.UserId;
    
    // this.tweetForm.value.UserId=;
    this.tweetForm=this.formBuilder.group({

      userId:[parseInt(this.k.value.UserId)],
      tweetId:[1],
      post:[]
    });

    this.commentForm=this.formBuilder.group({
        UserId:[parseInt(this.k.value.UserId)],
        TweetId:[],
        reply:[]
    });

    this.likeForm=this.formBuilder.group({
      UserId:[parseInt(this.k.value.UserId)],
      TweetId:[]
    })
  }

  deletetweet(tweet:any){
    console.log(typeof tweet.tweetId);
    
    this.service.deleteTweet({id:tweet.tweetId}).subscribe(res=>{
      // console.log("delete");
      alert("Deleted Successfully!")
      this.gettweet();
    });
    // console.log(tweet);
    
  }
  edittweet(tweet:any){
    this.tweetForm.controls['post'].setValue(tweet.post);
    this.tweetForm.controls['tweetId'].setValue(tweet.tweetId);
    this.editshow = true;
    // console.log(tweet.postId);
    
  }
  saveedittweet(){
    this.service.updateTweet(this.tweetForm.value).subscribe(res=>{
      console.log(res);
      this.gettweet();
    });
  }

  commenttweet(tweet:any){
    console.log(tweet);
    this.commentForm.controls['TweetId'].setValue(tweet.tweetId);
    
  }
  saveComment(){
    // console.log(this.commentForm.value);
    
    this.service.addComment(this.commentForm.value).subscribe(res=>{
      console.log(res);
    });
  }

  like(tweet:any){
    
    this.likeForm.controls['TweetId'].setValue(tweet.tweetId);
    // console.log(this.likeForm.value);
    
    this.service.addlike(this.likeForm.value).subscribe(res=>{
      console.log(res);

      this.gettweet();
    });
    // this.getLike();
    // this.gettweet();
  }
}
