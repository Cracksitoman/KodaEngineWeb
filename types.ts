
import React from 'react';

export interface User {
  username: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  notifications: boolean;
  isLoggedIn: boolean;
}

export enum View {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD'
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
