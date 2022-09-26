/* export interface GoogleAuthI {
    error: any,
    displayName: string,
    email: string,
    photoUrl: string,
    uid: string,
} */
export interface errorAuth {
  errorMessage: string;
  errorCode: string;
}

export interface basicCredentials {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  error: errorAuth | null;
}
