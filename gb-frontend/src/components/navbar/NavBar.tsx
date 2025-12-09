import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logotipo.png';

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Trainings', path: '/trainings' },
    { name: 'Athletes', path: '/athletes' },
    { name: 'Coaches', path: '/coaches' },
    { name: 'Exercises', path: '/exercises' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="GymBros Logo" className="h-8" />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-primary text-white hover:bg-brand-primaryDark'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
