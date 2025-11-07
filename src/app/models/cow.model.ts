export interface Cow {
 id: number;
 earTag: string;
 sex: 'Male' | 'Female';
 pen: string;
 status: 'Active' | 'In Treatment' | 'Deceased';
 weight?: number;
 lastEventDate: string;       
}
