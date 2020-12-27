import React from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../components/Home';
import InstructorHome from '../components/InstructorHome';
import { myConsole } from '../constants/constants';

export default function HomePage() {
  const location = useLocation();

  const { userType } = location.state;
  myConsole.log(`User type ${userType}`);
  if (userType === 'tutee') return <Home />;
  return <InstructorHome />;
}
