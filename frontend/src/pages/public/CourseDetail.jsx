import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, ListGroup, Button, Badge, Spinner } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlayCircle, Award, Users, FileText, Check, Clock, ChevronRight, Share2, Heart, Award as CertificateIcon, CheckCircle2, Languages, MonitorPlay, Infinity } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/`);
        const foundCourse = data.find(c => (c._id === id || c.id === id));
        setCourse(foundCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      toast.info('Please login to enroll in this course');
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      await API.post('/enroll', { courseId: course._id || course.id });
      toast.success('Successfully enrolled in the course!');
      navigate('/student-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed. Try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleWishlist = () => {
    toast.success('Added to your wishlist! ❤️');
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (!course) return (
    <div className="text-center py-5 bg-light vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-muted">Course Not Found</h2>
      <Button as={Link} to="/courses" variant="primary" className="mt-3 rounded-pill">Back to Courses</Button>
    </div>
  );

  // Fallback mock values for missing database fields
  const displayData = {
    ...course,
    originalPrice: (course.price * 1.5).toFixed(2),
    rating: 4.8,
    reviews: '24,391',
    author: course.instructor?.name || 'Industry Expert',
    lastUpdated: new Date(course.updatedAt).toLocaleDateString() || 'Recently',
    language: 'English',
    whatYouWillLearn: [
      'Master the core concepts of ' + course.category,
      'Build professional-grade projects',
      'Learn industry best practices',
      'Advanced architectural patterns',
      'Optimization and performance techniques',
      'Deploying to production environments'
    ],
    curriculum: [
      { id: '1', title: 'Introduction', lessons: 12, duration: '2h 15m' },
      { id: '2', title: 'Fundamentals', lessons: 18, duration: '3h 45m' },
      { id: '3', title: 'Advanced Concepts', lessons: 24, duration: '5h 30m' }
    ],
    requirements: [
      'Basic knowledge of software development',
      'A computer with internet access'
    ]
  };

  return (
    <div className="bg-light pb-5">
      {/* Dark Header Banner */}
      <div className="bg-dark text-white pt-5 pb-5 position-relative overflow-hidden">
        <div className="position-absolute bg-gradient-primary w-100 h-100 top-0 start-0 opacity-10"></div>
        <Container className="position-relative pt-4 pb-sm-5" style={{ zIndex: 2 }}>
          <Row className="gy-4">
            <Col lg={8} className="pe-lg-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item"><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/courses" className="text-white-50 text-decoration-none">Development</Link></li>
                  <li className="breadcrumb-item"><Link to="/courses" className="text-white-50 text-decoration-none">{course.category}</Link></li>
                  <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Course Details</li>
                </ol>
              </nav>
              <h1 className="display-4 fw-bold mb-3">{course.title}</h1>
              <p className="lead fs-4 text-white-50 mb-4 lh-base">{course.description}</p>
              
              <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 mb-4 text-white-50 small">
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="warning" text="dark" className="fs-6 px-2 py-1"><Award size={14} className="me-1"/> Bestseller</Badge>
                </div>
                <div className="d-flex align-items-center gap-2 text-warning fw-bold">
                  {course.rating} 
                  <span className="d-flex ms-1">
                    <Heart size={14} fill="currentColor"/>
                  </span>
                  <span className="text-white-50 fw-normal">({course.reviews} ratings)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Users size={16} /> {displayData.students} students
                </div>
              </div>

              <div className="d-flex flex-wrap gap-4 text-white-50 small">
                <div className="d-flex align-items-center gap-2">
                  <Clock size={16} /> Created by <span className="text-white text-decoration-underline fw-medium">{course.author}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <CheckCircle2 size={16} /> Last updated {course.lastUpdated}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Languages size={16} /> {course.language}
                </div>
              </div>
            </Col>
            
            {/* Mobile View Sticky Card Place */}
            <Col lg={4} className="d-lg-none mt-4">
              {/* Similar card structure, kept brief for mock */}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="position-relative mt-n5" style={{ zIndex: 10 }}>
        <Row className="gy-4">
          <Col lg={8} className="order-2 order-lg-1">
            <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden pt-5 pt-lg-0 mt-5 mt-lg-0 bg-transparent card-body-bg-white">
              <Card.Body className="p-0">
                <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm">
                  <h3 className="fw-bold mb-4">What you'll learn</h3>
                  <Row className="g-3 mb-5">
                    {displayData.whatYouWillLearn.map((item, idx) => (
                      <Col md={6} key={idx}>
                        <div className="d-flex align-items-start gap-3">
                          <div className="text-success mt-1"><Check size={20} /></div>
                          <span className="text-muted">{item}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <hr className="mb-5 border-light" />

                  <h3 className="fw-bold mb-3">Course content</h3>
                  <div className="d-flex justify-content-between align-items-center mb-4 text-muted small">
                    <div>{displayData.curriculum.length} sections • {displayData.curriculum.reduce((acc, curr) => acc + curr.lessons, 0)} lectures • 12h total length</div>
                    <Button variant="link" className="text-primary p-0 shadow-none text-decoration-none fw-medium">Expand all sections</Button>
                  </div>

                  <Accordion defaultActiveKey="0" className="course-accordion mb-5 border-0">
                    {displayData.curriculum.map((section, idx) => (
                      <Accordion.Item eventKey={idx.toString()} key={idx} className="border bg-transparent mb-2 rounded border-light overflow-hidden">
                        <Accordion.Header className="bg-light">
                          <div className="d-flex justify-content-between w-100 pe-3 align-items-center">
                            <span className="fw-bold text-dark">{section.title}</span>
                            <span className="text-muted small fw-normal d-none d-sm-block">{section.lessons} lectures • {section.duration}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="p-0 border-top">
                          <ListGroup variant="flush">
                            {[...Array(3)].map((_, lessonIdx) => (
                              <ListGroup.Item key={lessonIdx} className="d-flex justify-content-between align-items-center py-3 border-bottom-0 border-light px-4 hover-bg-light">
                                <div className="d-flex align-items-center gap-3">
                                  <PlayCircle size={16} className="text-primary opacity-75" />
                                  <span className={lessonIdx === 0 ? "text-primary text-decoration-underline crsp" : "text-muted"}>
                                    Lesson {lessonIdx + 1}: Introduction to {section.title.split(' ')[0]}
                                  </span>
                                </div>
                                <span className="text-muted small">15:00</span>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>

                  <h3 className="fw-bold mb-4">Requirements</h3>
                  <ul className="text-muted ps-4 mb-5">
                    {displayData.requirements.map((req, idx) => (
                      <li key={idx} className="mb-2">{req}</li>
                    ))}
                  </ul>

                  <h3 className="fw-bold mb-4">Description</h3>
                  <div className="text-muted content-desc">
                    <p>{displayData.description}</p>
                    <p>Building real-world skills is our priority. This course is designed to take you from a curious learner to a proficient practitioner in {displayData.category}.</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="order-1 order-lg-2 d-none d-lg-block">
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden position-sticky" style={{ top: '100px' }}>
              <div className="position-relative">
                <Card.Img variant="top" src={displayData.image} style={{ height: '240px', objectFit: 'cover' }} />
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center cursor-pointer pulse-animation" style={{ width: '64px', height: '64px' }}>
                    <PlayCircle size={32} />
                  </div>
                </div>
              </div>
              
              <Card.Body className="p-4 p-xl-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <h2 className="mb-0 fw-bold">${displayData.price}</h2>
                  <span className="text-muted text-decoration-line-through fs-5">${displayData.originalPrice}</span>
                  <span className="text-white bg-danger rounded px-2 py-1 small fw-bold">33% off</span>
                </div>

                <div className="d-flex flex-column gap-3 mb-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="btn-primary-custom w-100 rounded-pill fs-5 py-3"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                  <Button 
                    variant="outline-dark" 
                    size="lg" 
                    className="w-100 rounded-pill py-3 hover-overlay d-flex align-items-center justify-content-center gap-2"
                    onClick={handleWishlist}
                  >
                    <Heart size={20} /> Add to Wishlist
                  </Button>
                </div>

                <div className="text-center small text-muted mb-4">
                  <p className="mb-0">30-Day Money-Back Guarantee</p>
                  <p className="mb-0">Full Lifetime Access</p>
                </div>

                <h6 className="fw-bold text-dark mb-3">This course includes:</h6>
                <ul className="list-unstyled text-muted small d-flex flex-column gap-3 mb-4">
                  <li className="d-flex align-items-center gap-3"><MonitorPlay size={18} className="text-secondary" /> 40 hours on-demand video</li>
                  <li className="d-flex align-items-center gap-3"><FileText size={18} className="text-secondary" /> 35 articles & coding exercises</li>
                  <li className="d-flex align-items-center gap-3"><Infinity size={18} className="text-secondary" /> Full lifetime access</li>
                  <li className="d-flex align-items-center gap-3"><MonitorPlay size={18} className="text-secondary" /> Access on mobile and TV</li>
                  <li className="d-flex align-items-center gap-3"><CertificateIcon size={18} className="text-secondary" /> Certificate of completion</li>
                </ul>

                <hr className="border-light mb-4" />
                
                <div className="d-flex justify-content-between text-primary fw-medium cursor-pointer">
                  <span>Share</span>
                  <span>Gift this course</span>
                  <span>Apply Coupon</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <style>{`
        .course-accordion .accordion-button:not(.collapsed) { background-color: var(--light); color: var(--dark); box-shadow: none; border-bottom: 1px solid var(--gray-light); }
        .course-accordion .accordion-button:focus { box-shadow: none; }
        .hover-bg-light:hover { background-color: var(--light); transition: 0.2s; }
        .pulse-animation { animation: pulse 2s infinite; }
        .crsp { cursor: pointer; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); } }
      `}</style>
    </div>
  );
};

export default CourseDetail;
