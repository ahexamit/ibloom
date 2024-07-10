import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared/shared.service';
@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private sharedservice: SharedService, private http: HttpClient) {}
  /**get all cards */
  public getAllCards(endpoints: string,body:any): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const params = new HttpParams()
      .set('grade', body?.grade)
      .set('subject', body?.subject)
    return this.http.get(url, { params }).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**getallQuestions */
  public getallQuestions(): Observable<any> {
    const endPoint = 'questions';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get(url).pipe(
      map((data) => {
        return data;
      })
    );
  }

  /**Add new generateTopics Data */
  public generateTopics(data: any, endpoints: string): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('topic', data?.title);
    body.append('grade', data?.grade);
    body.append('age', data?.age);
    body.append('subject', data?.subject);
    body.append('objective', data?.objective);
    return this.http.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }

  /**Add new GenerateQuestions Data */
  public generateQuestions(data: any, endpoints: string): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('topic', data?.topic);
    body.append('grade', data?.grade);
    body.append('age', data?.age);
    body.append('subject', data?.subject);
    body.append('difficulty', data?.difficulty);
    body.append('lesson', data?.lesson);
    return this.http.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**get_topics */
  public get_topics(): Observable<any> {
    const endPoint = 'get_all_topics';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();

    return this.http.get(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**get approved question */
  public approvedquestion(body: any): Observable<any> {
    const endPoint = 'get_approved_questions';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const params = new HttpParams()
      .set('grade', body?.grade)
      .set('subject', body?.subject)
      .set('topic', body?.topic)
      .set('difficulty', body?.diffucilty);
    return this.http.get(url, { params }).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /** get_all_questions */
  public get_all_questions(body: any): Observable<any> {
    const endPoint = 'questions';
    const url = `${this.sharedservice.base_url}${endPoint}`;

    const params = new HttpParams()
      .set('grade', body?.grade)
      .set('subject', body?.subject)
      .set('topic', body?.topic)
      .set('difficulty', body?.diffucilty);

    return this.http.get(url, { params }).pipe(
      map((response) => {
        return response;
      })
    );
  }
  /**Add new generate VR Data */
  public generateVr(data: any, datatype: string , api_endpoint:string): Observable<any> {
    // const endPoint = 'visualizing_question';
    const endPoint = api_endpoint;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    if (datatype === 'question') {
      body.append('question_id', data?.question_id);
    } else {
      body.append('regenerated_id', data?.regenerated_id);
    }
    body.append('user_input', data?.user_input);
    return this.http.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**Add movetoworksheet VR Data */
  public movetoworksheet(data: any, datatype: string): Observable<any> {
    const endPoint = 'approve_question';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    if (datatype === 'question') {
      body.append('question_id', data?.question_id);
    } else {
      body.append('regenerated_id', data?.question_id);
    }
    // body.append('regenerated_id', data?.regenerated_id);
    return this.http.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**Delete API questions  */

  public delete_questions(data: any, datatype: string): Observable<any> {
    const endPoint = 'delete_questions';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    let params = new HttpParams();
    
    if (datatype === 'question') {
      params = params.append('question_id', data?.question_id);
    } else {
      params = params.append('regenerated_id', data?.regenerated_id);
    }
  
    return this.http.delete<any>(url, { params: params }).pipe(
      map((data) => {
        return data;
      })
    );
  };
  /**Delete API topic  */

  public delete_topics(topic_id: number): Observable<any> {
    const endPoint = 'delete_topics';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    let params = new HttpParams().set('topic_id', topic_id.toString());
  
    return this.http.delete<any>(url, { params: params }).pipe(
      map((data) => {
        return data;
      })
    );
  }
  
  
}
