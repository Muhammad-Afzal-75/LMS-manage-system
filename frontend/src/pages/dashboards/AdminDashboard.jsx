import { useState } from 'react';
import { Container, Row, Col, Nav, Card, Form, Button, Table, Badge, Dropdown, ButtonGroup, InputGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Users, BookOpen, BarChart3, Search, Settings, Filter, MoreVertical, Ban, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  const users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'student', status: 'Active', joined: 'Oct 10, 2023' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'instructor', status: 'Active', joined: 'Sep 15, 2023' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'student', status: 'Blocked', joined: 'Nov 20, 2023' },
    { id: 4, name: 'Diana King', email: 'diana@example.com', role: 'instructor', status: 'Active', joined: 'Jan 05, 2024' },
    { id: 5, name: 'Admin Root', email: 'admin@example.com', role: 'admin', status: 'Active', joined: 'Jan 01, 2023' },
  ];

  const statCards = [
    { title: 'Total Users', value: '142,500', icon: <Users size={24} className="text-primary"/>, bg: 'bg-primary' },
    { title: 'Active Courses', value: '3,240', icon: <BookOpen size={24} className="text-success"/>, bg: 'bg-success' },
    { title: 'Monthly Revenue', value: '$245K', icon: <BarChart3 size={24} className="text-warning"/>, bg: 'bg-warning' },
  ];

  return (
    <div className="bg-light pb-5 pt-4 min-vh-100">
      <Container>
        <div className="d-flex align-items-center gap-3 mb-5">
          <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '60px', height: '60px' }}>
            <Settings size={28} />
          </div>
          <div>
            <h2 className="fw-bold mb-0">Admin Control Panel</h2>
            <p className="text-muted mb-0">System overview and management</p>
          </div>
        </div>

        <Row className="g-4 mb-4">
          {statCards.map((stat, idx) => (
            <Col lg={4} key={idx}>
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden stat-card transition position-relative">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted small fw-medium mb-1 text-uppercase tracking-wider">{stat.title}</p>
                      <h3 className="fw-bold fs-2 mb-0">{stat.value}</h3>
                    </div>
                    <div className={`${stat.bg} bg-opacity-10 p-3 rounded-circle`}>
                      {stat.icon}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          <Col lg={3}>
            <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
              <Card.Body className="p-0">
                <Nav className="flex-column nav-pills custom-nav-pills p-3">
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'users'} 
                      onClick={() => setActiveTab('users')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <Users size={20} className={activeTab === 'users' ? 'text-primary' : 'text-muted'} />
                      Manage Users
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'courses'} 
                      onClick={() => setActiveTab('courses')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <BookOpen size={20} className={activeTab === 'courses' ? 'text-primary' : 'text-muted'} />
                      Manage Courses
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'reports'} 
                      onClick={() => setActiveTab('reports')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <BarChart3 size={20} className={activeTab === 'reports' ? 'text-primary' : 'text-muted'} />
                      Reports & Analytics
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            {activeTab === 'users' && (
              <div className="animate-fade-in">
                <Card className="border-0 shadow-sm rounded-4 p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom flex-wrap gap-3">
                    <h4 className="fw-bold mb-0">System Users</h4>
                    <div className="d-flex gap-3">
                      <InputGroup className="shadow-sm rounded-pill overflow-hidden border bg-white" style={{ maxWidth: '250px' }}>
                        <InputGroup.Text className="bg-transparent border-0 ps-3 text-muted"><Search size={16}/></InputGroup.Text>
                        <Form.Control placeholder="Search email/name..." className="border-0 shadow-none py-2" />
                      </InputGroup>
                      <Button variant="light" className="border shadow-sm rounded-pill d-flex align-items-center gap-2"><Filter size={16}/> Filter</Button>
                    </div>
                  </div>
                  
                  <div className="table-responsive rounded-3 border overflow-hidden">
                    <Table hover className="mb-0 text-nowrap align-middle">
                      <thead className="bg-light">
                        <tr>
                          <th className="fw-bold py-3 px-4 text-muted small">USER</th>
                          <th className="fw-bold py-3 px-4 text-muted small">ROLE</th>
                          <th className="fw-bold py-3 px-4 text-muted small">STATUS</th>
                          <th className="fw-bold py-3 px-4 text-muted small">JOINED DATE</th>
                          <th className="fw-bold py-3 px-4 text-end text-muted small">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id}>
                            <td className="py-3 px-4">
                              <div className="d-flex align-items-center gap-3">
                                <div className="bg-secondary bg-opacity-10 text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                  <span className="fw-bold">{u.name.charAt(0)}</span>
                                </div>
                                <div>
                                  <div className="fw-bold text-dark">{u.name}</div>
                                  <div className="small text-muted">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge bg="light" text="dark" className="border px-3 py-2 text-capitalize fw-medium shadow-sm">
                                {u.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge bg={u.status === 'Active' ? 'success' : 'danger'} className="bg-opacity-10 text-dark border-0 rounded-pill px-3 py-1">
                                <span className={`d-inline-block rounded-circle me-2 bg-${u.status === 'Active' ? 'success' : 'danger'}`} style={{ width: '6px', height: '6px' }}></span>
                                {u.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-muted small">{u.joined}</td>
                            <td className="py-3 px-4 text-end">
                              <Dropdown align="end">
                                <Dropdown.Toggle variant="light" className="btn-icon rounded-circle border-0 bg-transparent hide-caret shadow-none px-2 text-muted">
                                  <MoreVertical size={20} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="border-0 shadow-lg rounded-3 mt-2">
                                  <Dropdown.Item className="d-flex align-items-center gap-2 py-2 small fw-medium"><UserCheck size={16} className="text-success" /> Verify Identity</Dropdown.Item>
                                  <Dropdown.Item className="d-flex align-items-center gap-2 py-2 small fw-medium text-danger"><Ban size={16} /> Block User</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="text-muted small fw-medium">Showing 1-5 of 142,500 users</span>
                    <ButtonGroup size="sm">
                      <Button variant="outline-secondary" disabled>Prev</Button>
                      <Button variant="primary">1</Button>
                      <Button variant="outline-secondary">2</Button>
                      <Button variant="outline-secondary">3</Button>
                      <Button variant="outline-secondary">Next</Button>
                    </ButtonGroup>
                  </div>
                </Card>
              </div>
            )}

            {/* Empty views for the mock */}
            {activeTab === 'courses' && (
              <div className="animate-fade-in text-center py-5">
                <BookOpen size={64} className="text-primary opacity-25 mx-auto mb-4" />
                <h3 className="fw-bold">Manage Platform Courses</h3>
                <p className="text-muted">Review, approve, or suspend courses from instructors.</p>
                <Button variant="primary" className="btn-primary-custom rounded-pill px-4 mt-3">View All Courses</Button>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="animate-fade-in text-center py-5">
                <BarChart3 size={64} className="text-warning opacity-50 mx-auto mb-4" />
                <h3 className="fw-bold">Analytics & Enrollment Reports</h3>
                <p className="text-muted">Visualize student growth, course completion rates, and platform revenue.</p>
                <Button variant="primary" className="btn-primary-custom rounded-pill px-4 mt-3">Generate Monthly Report</Button>
              </div>
            )}

          </Col>
        </Row>
      </Container>
      <style>{`
        .custom-nav-pills .nav-link.active { background-color: var(--primary) !important; color: white !important; }
        .custom-nav-pills .nav-link:hover:not(.active) { background-color: var(--light); color: var(--primary) !important; }
        .stat-card { border-bottom: 3px solid transparent; }
        .stat-card:hover { transform: translateY(-5px); border-bottom-color: var(--primary); }
        .hide-caret::after { display: none !important; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
