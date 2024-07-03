export interface addProfile {
    skill: string,
    name: string,
    description:string,
    message?:string,
   
}
export interface editProfile {
    skill: string,
    name: string,
    description:string,
    message?:string,
    job_id:string
   
}

export interface getProfile {
    current_ctc: string,
    email: string,
    expected_ctc: string,
    experience: number,
    filename: string,
    id: number,
    name: string,
    phone: string,
    skill: string,
}
export interface getAlljob {
    clean_job_description: string,
    degree_years_of_experience: number,
    degrees: string,
    id: number,
    job_description: string,
    job_id: string,
    job_title: string,
    majors: string,
    skills: string,
    years_of_experience_in_skills: number
}
export interface interview {
    [x: string]: any;
    name: string;
    job_id: string;
    user_email: string;
    user_name: string;
    created_at: string;
  }
