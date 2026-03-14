import { useState } from 'react';
import { Container, Row, Col, Nav, Card, Form, Button, Table, Badge, InputGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { User, PlusCircle, Edit, Trash2, Video, Search, Image as ImageIcon } from 'lucide-react';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('manage');

  const myCourses = [
    { id: 1, title: 'Complete React Developer in 2024', category: 'Web Dev', price: 99.99, students: 12450, status: 'Published' },
    { id: 2, title: 'Advanced CSS and Sass', category: 'Design', price: 49.99, students: 8200, status: 'Published' },
    { id: 3, title: 'Node.js Initial Draft', category: 'Backend', price: 0, students: 0, status: 'Draft' }
  ];

  return (
    <div className="bg-light pb-5 pt-4 min-vh-100">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-5 flex-wrap gap-4">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-info text-dark rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '60px', height: '60px' }}>
              <span className="fs-3 fw-bold">{user?.name?.charAt(0) || 'I'}</span>
            </div>
            <div>
              <h2 className="fw-bold mb-0">Instructor Portal</h2>
              <p className="text-muted mb-0">Manage your content and earnings</p>
            </div>
          </div>
          <Button 
            variant="primary" 
            className="btn-primary-custom rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
            onClick={() => setActiveTab('create')}
          >
            <PlusCircle size={20} /> New Course
          </Button>
        </div>

        <Row className="g-4">
          <Col lg={3}>
            <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
              <Card.Body className="p-0">
                <Nav className="flex-column nav-pills custom-nav-pills p-3">
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'manage'} 
                      onClick={() => setActiveTab('manage')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <Edit size={20} className={activeTab === 'manage' ? 'text-primary' : 'text-muted'} />
                      Manage Courses
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'create'} 
                      onClick={() => setActiveTab('create')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <PlusCircle size={20} className={activeTab === 'create' ? 'text-primary' : 'text-muted'} />
                      Create Course
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      active={activeTab === 'upload'} 
                      onClick={() => setActiveTab('upload')}
                      className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-2 fw-medium text-dark cursor-pointer transition"
                    >
                      <Video size={20} className={activeTab === 'upload' ? 'text-primary' : 'text-muted'} />
                      Upload Lessons
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            {activeTab === 'manage' && (
              <div className="animate-fade-in">
                <Card className="border-0 shadow-sm rounded-4 p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">My Courses</h4>
                    <InputGroup className="w-auto shadow-sm rounded-pill overflow-hidden border">
                      <InputGroup.Text className="bg-white border-0 ps-3 text-muted"><Search size={16}/></InputGroup.Text>
                      <Form.Control placeholder="Search..." className="border-0 shadow-none py-2" style={{ maxWidth: '200px' }} />
                    </InputGroup>
                  </div>
                  
                  <div className="table-responsive rounded-3 overflow-hidden border">
                    <Table hover className="mb-0 text-nowrap align-middle">
                      <thead className="bg-light text-muted">
                        <tr>
                          <th className="fw-bold py-3 px-4">Course Title</th>
                          <th className="fw-bold py-3 px-4">Status</th>
                          <th className="fw-bold py-3 px-4 text-center">Price</th>
                          <th className="fw-bold py-3 px-4 text-center">Students</th>
                          <th className="fw-bold py-3 px-4 text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myCourses.map(course => (
                          <tr key={course.id}>
                            <td className="py-3 px-4">
                              <div className="fw-bold text-dark">{course.title}</div>
                              <div className="small text-muted">{course.category}</div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge bg={course.status === 'Published' ? 'success' : 'warning'} className="bg-opacity-25 border rounded-pill text-dark px-3 py-1">
                                {course.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center fw-medium">${course.price}</td>
                            <td className="py-3 px-4 text-center text-muted">{course.students.toLocaleString()}</td>
                            <td className="py-3 px-4 text-end">
                              <div className="d-flex justify-content-end gap-2">
                                <Button variant="light" size="sm" className="rounded-circle btn-icon"><Edit size={16} className="text-primary"/></Button>
                                <Button variant="light" size="sm" className="rounded-circle btn-icon"><Trash2 size={16} className="text-danger"/></Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'create' && (
              <div className="animate-fade-in">
                <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
                  <h3 className="fw-bold border-bottom pb-4 mb-4">Create New Course</h3>
                  <Form>
                    <Row className="g-4">
                      <Col md={12}>
                        <Form.Label className="fw-medium text-muted">Course Title</Form.Label>
                        <Form.Control type="text" placeholder="E.g., Complete Python Bootcamp" className="form-control-custom bg-light border-0 py-3 rounded-3" />
                      </Col>
                      <Col md={6}>
                        <Form.Label className="fw-medium text-muted">Category</Form.Label>
                        <Form.Select className="form-control-custom bg-light border-0 py-3 rounded-3">
                          <option>Web Development</option>
                          <option>Data Science</option>
                          <option>Design</option>
                          <option>Marketing</option>
                        </Form.Select>
                      </Col>
                      <Col md={6}>
                        <Form.Label className="fw-medium text-muted">Price ($)</Form.Label>
                        <Form.Control type="number" placeholder="99.99" className="form-control-custom bg-light border-0 py-3 rounded-3" />
                      </Col>
                      <Col md={12}>
                        <Form.Label className="fw-medium text-muted">Course Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="What will students learn?" className="form-control-custom bg-light border-0 py-3 rounded-3" />
                      </Col>
                      <Col md={12}>
                        <Form.Label className="fw-medium text-muted">Course Thumbnail</Form.Label>
                        <div className="border border-dashed border-primary border-opacity-50 rounded-4 p-5 text-center bg-light">
                          <ImageIcon size={48} className="text-primary opacity-50 mb-3 mx-auto" />
                          <p className="fw-medium text-dark mb-1">Drag and drop an image, or click to browse</p>
                          <p className="small text-muted mb-0">1200x800 resolution recommended (JPG, PNG)</p>
                          <Button variant="outline-primary" className="rounded-pill mt-4 px-4 align-items-center gap-2">Browse Files</Button>
                        </div>
                      </Col>
                    </Row>
                    
                    <div className="d-flex justify-content-end gap-3 pt-5">
                      <Button variant="outline-danger" className="rounded-pill px-4 fw-medium">Cancel</Button>
                      <Button variant="secondary" className="btn-secondary-custom rounded-pill px-4 fw-bold">Save Draft</Button>
                      <Button variant="primary" className="btn-primary-custom rounded-pill px-5 fw-bold shadow-sm d-flex align-items-center gap-2">
                         Publish Course
                      </Button>
                    </div>
                  </Form>
                </Card>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="animate-fade-in">
                <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 text-center">
                  <div className="mb-4">
                    <Video size={48} className="text-primary opacity-75 mb-3" />
                    <h3 className="fw-bold">Upload Lessons</h3>
                    <p className="text-muted mx-auto" style={{ maxWidth: '400px' }}>Select an existing course to upload new video materials, assignments, or resources.</p>
                  </div>
                  
                  <Row className="justify-content-center">
                    <Col md={8}>
                      <Form.Select className="form-control-custom bg-light border-0 py-3 rounded-3 shadow-sm mb-4">
                        <option value="">-- Select a Course --</option>
                        {myCourses.filter(c => c.status === 'Published').map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </Form.Select>

                      <div className="border border-dashed border-secondary rounded-4 p-5 bg-light mb-4 text-center">
                        <p className="fw-medium text-dark mb-1">Drag video files here</p>
                        <p className="small text-muted mb-4">MP4, WebM up to 2GB</p>
                        <Button variant="primary" className="btn-primary-custom rounded-pill px-4 shadow-sm">Select Videos</Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <style>{`
        .custom-nav-pills .nav-link.active { background-color: var(--primary) !important; color: white !important; }
        .custom-nav-pills .nav-link:hover:not(.active) { background-color: var(--light); color: var(--primary) !important; }
        .btn-icon { width: 35px; height: 35px; display: inline-flex; justify-content: center; align-items: center; padding: 0; }
        .btn-icon:hover { background-color: var(--light) !important; transform: translateY(-2px); transition: 0.2s; }
        .border-dashed { border-style: dashed !important; border-width: 2px !important; }
      `}</style>
    </div>
  );
};

export default InstructorDashboard;
