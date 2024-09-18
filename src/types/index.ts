export interface Letter {
    id: string;
    name: string;
    content: string;
  }
  
  export interface Resume {
    id: string;
    name: string;
    filename: string;
  }
  
  export interface EmailRequest {
    emails?: string[];
    email?: string;
    letterId: string;
    resumeId: string;
    subject: string;
  }