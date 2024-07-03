import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { Userlist } from '../model/userlist';
import {
  addProfile,
  editProfile,
  getAlljob,
  getProfile,
  interview,
} from '../model/profile';
@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private sharedservice: SharedService, private http: HttpClient) {}

  /**get userlist data */
  public userList(
    page?: number,
    search?: any,
    pageLimit?: number
  ): Observable<any> {
    let endPoint = `users?page=${page}&limit=${pageLimit}&search=${search}&sortColumn=firstname&sortOrder=DESC`;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get<Userlist>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**Add new profile Data */
  public addProfileData(
    data: addProfile,
    endpoints: string
  ): Observable<addProfile> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('title', data?.name);
    body.append('description', data?.description);
    body.append('skills', data?.skill);
    return this.http.post<addProfile>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**edit profile Data */
  public editProfileData(
    data: editProfile,
    endpoints: string
  ): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('title', data?.name);
    body.append('description', data?.description);
    body.append('skills', data?.skill);
    body.append('job_id', data?.job_id);
    return this.http.put<editProfile>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**view profile by email */
  public viewProfile(email: string): Observable<any> {
    const endPoint = `get_profile/${email}`;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**getallprofile */
  public getallProfile(): Observable<any> {
    const endPoint = `get_all_profiles`;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get<getProfile>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**getInterviewHistory */
  public getChatHistory(session_id: string): Observable<any> {
    const endPoint = `interview_by_id`;
    const url = `${this.sharedservice.base_url}${endPoint}/${session_id}`;
    return this.http.get<getProfile>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**edit profile */
  public editProfile(email: string, data: any, resume: File): Observable<any> {
    const endPoint = `/edit_profile/${email}`;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    if (resume) {
      body.append('file', resume);
    }
    body.append('name', data?.name);
    body.append('email', data?.email);
    body.append('phone', data?.phone);
    body.append('skill', data?.skill);
    body.append('current_ctc', data?.current_ctc);
    body.append('expected_ctc', data?.expected_ctc);
    body.append('experience', data?.experience);
    return this.http.put(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**get all cards */
  public getAllCards(endpoints: string): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get<getAlljob>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**get all interviews */
  public getAllInterviews(endpoints: string): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get<interview>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**scheduled meeting */
  public scheduledMetting(body: any, endPoints: string): Observable<any> {
    const endPoint = endPoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const data = new FormData();
    data.append('user_name', body?.name);
    data.append('user_email', body?.email);
    data.append('job_id', body?.job_id);
    return this.http.post(url, data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**ChatBot meeting */
  public chatBot(body: any, endPoints: string): Observable<any> {
    const endPoint = endPoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const data = new FormData();
    data.append('candidate_answer', body?.candidate_answer);
    data.append('interview_id', body?.interview_id);
    data.append('ai_model', body?.ai_model);
    return this.http.post(url, data).pipe(
      map((data) => {
        return data;
      })
    );
  }
   /**ChatBot meeting */
   public login(body: any): Observable<any> {
    const loginUrl= 'http://localhost:4000/login'
    // const endPoint = endPoints;
    // const url = `${this.sharedservice.base_url}${endPoint}`;
    // const data = new FormData();
    // data.append('email', body?.email);
    // data.append('password', body?.password);
    return this.http.post(loginUrl, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
    /**scheduleMetting  */
    public scheduleMetting(body: any): Observable<any> {
      const endPoint = 'http://localhost:4000/scheduleMeeting';
      // const url = `${this.sharedservice.base_url}${endPoint}`;
      const formData = new FormData();
      formData.append('name', body?.name);
        formData.append('email',body?.email);
        formData.append('jobtitle',body?.jobtitle );
        formData.append('date_time',body?.dateTime );
        formData.append('resume',body?.resume );
      return this.http.post(endPoint,formData).pipe(
        map((data) => {
          return data;
        })
      );
    }

     /**getallJobTitle */
  public getallJobTitle(): Observable<any> {
    const endPoint = `http://localhost:4000/jobs`;
    // const url = `${this.sharedservice.base_url}${endPoint}`;
    return this.http.get(endPoint).pipe(
      map((data) => {
        return data;
      })
    );
  }
     /**getallJobTitle */
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
   public generateTopics(
    data: any,
    endpoints: string
  ): Observable<any> {
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
  };

   /**Add new GenerateQuestions Data */
   public generateQuestions(
    data: any,
    endpoints: string
  ): Observable<any> {
    const endPoint = endpoints;
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('topic', data?.topic);
    body.append('grade', data?.grade);
    body.append('age', data?.age);
    body.append('subject', data?.subject);
    body.append('difficulty', data?.difficulty)
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
           public approvedquestion(): Observable<any> {
            const endPoint = 'get_approved_questions';
            const url = `${this.sharedservice.base_url}${endPoint}`;
      
            return this.http.get(url).pipe(
              map((data) => {
                return data;
              })
            );
          }
     /**get_all_questions */
    //  public get_all_questions(data:any): Observable<any> {
    //   const endPoint = 'questions';
    //   const url = `${this.sharedservice.base_url}${endPoint}`;
    //   const body = new FormData();
    // body.append('grade', 'First');
    // body.append('subject', 'Maths');
    // body.append('topic', 'First');
    // body.append('difficulty', 'easy');
    //   return this.http.get(url,body).pipe(
    //     map((data) => {
    //       return data;
    //     })
    //   );
    // }
    /** get_all_questions */
/** get_all_questions */
public get_all_questions(body:any): Observable<any> {
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
   public generateVr(
    data: any,
   
  ): Observable<any> {
    const endPoint = 'visualizing_question';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('question_id', data?.question_id);
    body.append('user_input', data?.user_input);
    return this.http.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  };
 /**Add movetoworksheet VR Data */
  public movetoworksheet(
    data: any,
   
  ): Observable<any> {
    const endPoint = 'approve_question';
    const url = `${this.sharedservice.base_url}${endPoint}`;
    const body = new FormData();
    body.append('regenerated_id', data?.regenerated_id);
    return this.http.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  };
}
