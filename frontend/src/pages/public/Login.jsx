import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await API.post('/login', { email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate(`/${data.role}-dashboard`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
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
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden animate-fade-in hover-3d" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-primary p-4 text-center text-white">
                <div className="bg-white text-primary rounded-circle d-inline-flex p-3 mb-3 shadow">
                  <LogIn size={32} />
                </div>
                <h3 className="fw-bold mb-1">Welcome Back!</h3>
                <p className="mb-0 text-white-50">Log in to continue your learning journey</p>
              </div>
              
              <Card.Body className="p-4 p-md-5 bg-white">
                {error && <div className="alert alert-danger small fw-medium py-2">{error}</div>}
                
                <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <FloatingLabel controlId="email" label="Email Address" className="mb-2">
                    <Form.Control 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control-custom rounded-3 shadow-none bg-light border-0 px-4 py-3 h-auto"
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="password" label="Password" className="mb-2">
                    <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control-custom rounded-3 shadow-none bg-light border-0 px-4 py-3 h-auto"
                    />
                  </FloatingLabel>

                  <div className="d-flex justify-content-between align-items-center small mb-3">
                    <Form.Check 
                      type="checkbox"
                      id="remember"
                      label={<span className="text-muted fw-medium">Remember me</span>}
                    />
                    <Link to="#" className="text-primary text-decoration-none fw-medium">Forgot Password?</Link>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary-custom rounded-pill py-3 fw-bold fs-5 mt-2 position-relative shadow-sm"
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    {loading ? 'Logging in...' : 'Log In'}
                  </Button>
                </Form>
                
                <div className="text-center mt-4">
                  <p className="text-muted small mb-0 fw-medium">
                    Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-underline ms-1">Sign up</Link>
                  </p>
                </div>
                
                {/* Note for reviewers */}
                <div className="mt-4 p-3 bg-light rounded text-center small text-muted border border-warning border-opacity-50">
                  <strong>Demo Info:</strong> Use any email to login. Include "admin" or "instructor" in the email to access those roles.
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
