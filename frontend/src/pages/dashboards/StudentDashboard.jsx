import { useState } from 'react';
import { Container, Row, Col, Nav, Card, ProgressBar, Badge, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, User, PlayCircle, Clock, Settings } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');

  const enrolledCourses = [
    { id: 1, title: 'Complete React Developer in 2024', progress: 65, lastAccessed: '2 days ago', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400' },
    { id: 2, title: 'Advanced CSS and Sass', progress: 100, lastAccessed: '1 week ago', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400' },
    { id: 3, title: 'Node.js Complete Guide', progress: 12, lastAccessed: 'Today', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400' }
  ];

  return (
    <div className="bg-light pb-5 pt-4 min-vh-100">
      <Container>
        <div className="d-flex align-items-center gap-3 mb-5">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '60px', height: '60px' }}>
            <span className="fs-3 fw-bold">{user?.name?.charAt(0) || 'S'}</span>
          </div>
          <div>
            <h2 className="fw-bold mb-0">Welcome back, {user?.name || 'Student'}!</h2>
            <p className="text-muted mb-0">Ready to continue your learning journey?</p>
          </div>
        </div>

        <Row className="g-4">
          <Col lg={3}>
            <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
              <Card.Body className="p-0">
                <Nav className="flex-column nav-pills custom-nav-pills p-3">
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'courses'} 
                      onClick={() => setActiveTab('courses')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <BookOpen size={20} className={activeTab === 'courses' ? 'text-primary' : 'text-muted'} />
                      My Learning
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'profile'} 
                      onClick={() => setActiveTab('profile')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <User size={20} className={activeTab === 'profile' ? 'text-primary' : 'text-muted'} />
                      Profile Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            {activeTab === 'courses' && (
              <div className="animate-fade-in">
                <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
                  <BookOpen className="text-primary" /> My Started Courses
                </h3>
                
                <Row className="g-4 mb-5">
                  {enrolledCourses.map(course => (
                    <Col md={6} xl={4} key={course.id}>
                      <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative hover-card transition">
                        <Card.Img variant="top" src={course.image} style={{ height: '160px', objectFit: 'cover' }} />
                        {course.progress === 100 && (
                          <Badge bg="success" className="position-absolute top-0 end-0 m-3 px-2 py-1">Completed</Badge>
                        )}
                        <Card.Body className="p-4 d-flex flex-column">
                          <Card.Title className="fw-bold fs-6 mb-3 flex-grow-1">{course.title}</Card.Title>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between small text-muted mb-1">
                              <span>{course.progress}% Complete</span>
                            </div>
                            <ProgressBar 
                              now={course.progress} 
                              variant={course.progress === 100 ? 'success' : 'primary'} 
                              style={{ height: '6px' }} 
                            />
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top border-light">
                            <span className="small text-muted d-flex align-items-center gap-1"><Clock size={14}/> {course.lastAccessed}</span>
                            <Button 
                              variant={course.progress === 100 ? 'outline-secondary' : 'primary'} 
                              size="sm" 
                              className="rounded-pill px-3 fw-medium d-flex align-items-center gap-1"
                            >
                              <PlayCircle size={16} /> 
                              {course.progress === 100 ? 'Review' : 'Resume'}
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
                  <div className="d-flex align-items-center gap-3 mb-5 pb-3 border-bottom">
                    <User className="text-primary" size={28} />
                    <h3 className="fw-bold mb-0">Profile Information</h3>
                  </div>

                  <Form>
                    <Row className="g-4 mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-muted">Full Name</Form.Label>
                          <Form.Control type="text" defaultValue={user?.name || ''} className="form-control-custom bg-light border-0 py-3 rounded-3" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-muted">Email Address</Form.Label>
                          <Form.Control type="email" defaultValue={user?.email || ''} readOnly className="form-control-custom bg-light border-0 py-3 rounded-3 opacity-75" />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-medium text-muted">Bio / About Me</Form.Label>
                          <Form.Control as="textarea" rows={4} placeholder="Tell us a bit about yourself..." className="form-control-custom bg-light border-0 py-3 rounded-3" />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-flex justify-content-end gap-3 pt-3">
                      <Button variant="outline-secondary" className="rounded-pill px-4 fw-medium">Cancel</Button>
                      <Button variant="primary" className="btn-primary-custom rounded-pill px-5 fw-bold shadow-sm d-flex align-items-center gap-2">
                        <Settings size={18} /> Save Changes
                      </Button>
                    </div>
                  </Form>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <style>{`
        .custom-nav-pills .nav-link.active { background-color: var(--primary) !important; color: white !important; }
        .custom-nav-pills .nav-link:hover:not(.active) { background-color: var(--light); color: var(--primary) !important; }
        .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
