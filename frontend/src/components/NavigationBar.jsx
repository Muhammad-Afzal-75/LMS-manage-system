import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, LogOut, LayoutDashboard } from 'lucide-react';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'instructor') return '/instructor-dashboard';
    return '/student-dashboard';
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-gradient">
          <BookOpen className="text-primary" size={28} />
          <span>EduLMS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-3">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2 border-0 bg-transparent rounded-pill px-3 py-2" style={{ boxShadow: 'none' }}>
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                    {user.name?.charAt(0).toUpperCase() || <User size={18} />}
                  </div>
                  <span className="fw-medium text-dark">{user.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2" style={{ minWidth: '220px' }}>
                  <div className="px-3 py-2 border-bottom mb-2">
                    <p className="mb-0 fw-bold">{user.name}</p>
                    <small className="text-muted text-capitalize">{user.role}</small>
                  </div>
                  <Dropdown.Item as={Link} to={getDashboardLink()} className="d-flex align-items-center gap-2 py-2">
                    <LayoutDashboard size={16} className="text-primary" /> Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2 py-2">
                    <LogOut size={16} /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="fw-medium px-3">Log in</Nav.Link>
                <Button as={Link} to="/register" className="btn-primary-custom rounded-pill">
                  Sign up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
