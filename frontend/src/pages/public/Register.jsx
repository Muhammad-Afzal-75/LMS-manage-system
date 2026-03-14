import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, FloatingLabel, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, User, Building, Book } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await API.post('/register', formData);
      login(data);
      toast.success('Account created successfully!');
      navigate(`/${data.role}-dashboard`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light pb-5 pt-5 min-vh-100 d-flex align-items-center position-relative">
      <div className="position-absolute top-0 start-0 w-100 h-50 bg-primary opacity-10" style={{ zIndex: 0 }}></div>
      <Container className="position-relative z-1 py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden animate-fade-in hover-3d">
              <div className="bg-gradient-primary p-4 text-center text-white">
                <div className="bg-white text-primary rounded-circle d-inline-flex p-3 mb-3 shadow">
                  <UserPlus size={32} />
                </div>
                <h3 className="fw-bold mb-1">Create an Account</h3>
                <p className="mb-0 text-white-50">Join our community and start learning today</p>
              </div>

              <Card.Body className="p-4 p-md-5 bg-white">
                {error && <div className="alert alert-danger small fw-medium py-2">{error}</div>}
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3 mb-4">
                    <Col sm={12}>
                      <FloatingLabel controlId="name" label="Full Name">
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          required
                          onChange={handleChange}
                          className="form-control-custom rounded-3 shadow-none bg-light border-0 px-4 py-3 h-auto"
                        />
                      </FloatingLabel>
                    </Col>
                    
                    <Col sm={12}>
                      <FloatingLabel controlId="email" label="Email Address">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          required
                          onChange={handleChange}
                          className="form-control-custom rounded-3 shadow-none bg-light border-0 px-4 py-3 h-auto"
                        />
                      </FloatingLabel>
                    </Col>

                    <Col sm={12}>
                      <FloatingLabel controlId="password" label="Password">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          required
                          onChange={handleChange}
                          className="form-control-custom rounded-3 shadow-none bg-light border-0 px-4 py-3 h-auto"
                        />
                      </FloatingLabel>
                      <Form.Text className="text-muted small">
                        Must be at least 6 characters long
                      </Form.Text>
                    </Col>
                  </Row>

                  <h6 className="fw-bold text-dark mb-3">Select your role:</h6>
                  <Row className="g-3 mb-4">
                    <Col sm={4}>
                      <label className={`d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 text-center cursor-pointer transition w-100 h-100 ${formData.role === 'student' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'border-light bg-light text-muted hover-bg-white'}`}>
                        <Form.Check 
                          type="radio"
                          name="role"
                          value="student"
                          className="d-none"
                          checked={formData.role === 'student'}
                          onChange={handleChange}
                        />
                        <Book size={24} className="mb-2" />
                        <span>Student</span>
                      </label>
                    </Col>
                    <Col sm={4}>
                      <label className={`d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 text-center cursor-pointer transition w-100 h-100 ${formData.role === 'instructor' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'border-light bg-light text-muted hover-bg-white'}`}>
                        <Form.Check 
                          type="radio"
                          name="role"
                          value="instructor"
                          className="d-none"
                          checked={formData.role === 'instructor'}
                          onChange={handleChange}
                        />
                        <User size={24} className="mb-2" />
                        <span>Instructor</span>
                      </label>
                    </Col>
                    <Col sm={4}>
                      <label className={`d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 text-center cursor-pointer transition w-100 h-100 ${formData.role === 'admin' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'border-light bg-light text-muted hover-bg-white'}`}>
                        <Form.Check 
                          type="radio"
                          name="role"
                          value="admin"
                          className="d-none"
                          checked={formData.role === 'admin'}
                          onChange={handleChange}
                        />
                        <Building size={24} className="mb-2" />
                        <span>Admin</span>
                      </label>
                    </Col>
                  </Row>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="btn-primary-custom w-100 rounded-pill py-3 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    {loading ? 'Creating Account...' : 'Sign Up Now'}
                  </Button>
                </Form>
              </Card.Body>
              
              <div className="card-footer bg-light border-0 py-4 text-center">
                <p className="mb-0 text-muted fw-medium">
                  Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-underline ms-1">Log In</Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <style>{`
        .cursor-pointer { cursor: pointer; }
        .hover-bg-white:hover { background-color: white !important; border-color: var(--gray-light) !important; }
      `}</style>
    </div>
  );
};

export default Register;
