import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import { PlayCircle, Award, Users, BookOpen, CheckCircle } from 'lucide-react';
import API from '../../services/api';

const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get('/courses');
        // Just take the first 3 for the home page
        setPopularCourses(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching popular courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center mb-5">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <Container className="position-relative z-1">
          <Row className="align-items-center gy-5">
            <Col lg={6} className="animate-slide-up">
              <div className="d-inline-block px-3 py-1 bg-white text-primary fw-bold rounded-pill shadow-sm mb-4 border border-light text-gradient pe-4">
                <span className="bg-primary text-white px-2 py-1 rounded-pill me-2 small">New</span> 
                Join 100k+ students learning today
              </div>
              <h1 className="display-4 fw-bolder mb-4 lh-base text-dark">
                Unlock Your Potential with <br/><span className="text-gradient">World-Class</span> Learning
              </h1>
              <p className="lead text-muted mb-5 pe-lg-5">
                Master the MERN stack and other cutting-edge technologies. Our industry-expert instructors will guide you from beginner to professional developer.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/register" size="lg" className="btn-primary-custom d-flex align-items-center gap-2 px-5 py-3 rounded-pill">
                  Start Learning Now
                </Button>
                <Button as={Link} to="/courses" size="lg" variant="outline-dark" className="d-flex align-items-center gap-2 px-5 py-3 rounded-pill bg-white border-light text-dark shadow-sm hover-overlay">
                  <PlayCircle size={20} className="text-primary" /> View Courses
                </Button>
              </div>
            </Col>
            <Col lg={6} className="position-relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="position-relative ms-lg-5">
                <div className="position-absolute bg-gradient-primary rounded-circle w-100 h-100 opacity-25 translate-middle top-50 start-50 filter-blur"></div>
                <img 
                  src="/src/assets/hero.png" 
                  alt="Students learning" 
                  className="img-fluid rounded-4 shadow-lg border border-4 border-white position-relative hover-3d"
                  style={{ zIndex: 2 }}
                />
                
                {/* Floating Stats Card */}
                <div className="glass-card position-absolute bottom-0 start-0 translate-middle-y ms-n4 px-4 py-3 pb-2 d-none d-md-block" style={{ zIndex: 3, marginLeft: '-30px', transform: 'translateY(30px)' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success text-white p-3 rounded-circle shadow">
                      <Users size={24} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0">10k+</h4>
                      <p className="text-muted small mb-0">Active Students</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card position-absolute top-100 end-0 ms-n4 px-4 py-3 pb-2 d-none d-md-block" style={{ zIndex: 3, marginRight: '-20px', transform: 'translateY(-60px)' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary text-white p-3 rounded-circle shadow">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0">High</h4>
                      <p className="text-muted small mb-0">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center w-75 mx-auto mb-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">Why Choose Us</h6>
            <h2 className="display-6 fw-bold">Build The Skills You Need to Succeed</h2>
          </div>
          <Row className="g-4">
            {[
              { icon: <BookOpen size={32} />, title: 'Expert Instructors', desc: 'Learn directly from industry professionals with years of real-world experience.', color: 'text-primary bg-primary' },
              { icon: <PlayCircle size={32} />, title: 'Lifetime Access', desc: 'Learn on your schedule. You can access the course materials anytime, anywhere.', color: 'text-success bg-success' },
              { icon: <Award size={32} />, title: 'Earn Certificates', desc: 'Showcase your new skills with personalized certificates upon course completion.', color: 'text-warning bg-warning' },
              { icon: <Users size={32} />, title: 'Interactive Community', desc: 'Engage with fellow learners, ask questions, and collaborate on exciting projects.', color: 'text-info bg-info' }
            ].map((feature, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div className="p-4 rounded-4 border border-light h-100 shadow-sm feature-card transition">
                  <div className={`d-inline-block p-3 rounded-4 bg-opacity-10 mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Popular Courses Section */}
      <section className="py-5 mb-5 bg-light pb-5">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-end mb-4 pb-2">
            <div>
              <h6 className="text-primary fw-bold text-uppercase tracking-wider">Top Picks</h6>
              <h2 className="display-6 fw-bold mb-0">Popular Courses</h2>
            </div>
            <Button as={Link} to="/courses" variant="outline-primary" className="rounded-pill px-4 d-none d-md-block">
              View All Courses
            </Button>
          </div>
          <Row className="g-4">
            {loading ? (
              <Col className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </Col>
            ) : popularCourses.map((course) => (
              <Col lg={4} md={6} key={course._id || course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4 pt-2 d-md-none">
            <Button as={Link} to="/courses" variant="outline-primary" className="rounded-pill px-5 w-100">
              View All Courses
            </Button>
          </div>
        </Container>
      </section>

      <style>{`
        .filter-blur { filter: blur(50px); }
        .hover-lift { transition: transform 0.4s ease, box-shadow 0.4s ease; cursor: pointer; }
        .hover-lift:hover { transform: translateY(-10px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2) !important; }
        .feature-card { transition: all 0.3s ease; background: white; }
        .feature-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important; border-color: rgba(79, 70, 229, 0.2) !important; }
        .hover-overlay:hover { background-color: var(--light) !important; color: var(--primary) !important; border-color: var(--gray-light) !important; }
      `}</style>
    </>
  );
};

export default Home;
