
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { Documents } from '../components/Documents';
import { Users } from '../components/Users';
import { Categories } from '../components/Categories';
import { Profile } from '../components/Profile';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'documents':
        return <Documents />;
      case 'users':
        return <Users />;
      case 'categories':
        return <Categories />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Index;
