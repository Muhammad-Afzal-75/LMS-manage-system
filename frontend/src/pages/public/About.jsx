import { Container, Row, Col, Card } from 'react-bootstrap';
import { BookOpen, Users, Award, Shield, Globe, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-light pb-5">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--primary), #8b5cf6)' }}>
        <div className="hero-shape shape-1 bg-white opacity-10"></div>
        <Container className="position-relative z-1 py-5 text-center">
          <h1 className="display-4 fw-bold mb-4">Empowering Learning Globally</h1>
          <p className="lead text-white-50 mx-auto mb-0" style={{ maxWidth: '800px' }}>
            We believe that education should be accessible, engaging, and transformational. Our platform brings together world-class instructors and eager learners.
          </p>
        </Container>
      </div>

      <Container>
        {/* Mission Section */}
        <Row className="mb-5 align-items-center gy-5">
          <Col lg={6}>
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Our Mission" 
              className="img-fluid rounded-4 shadow-lg border border-4 border-white hover-3d"
            />
          </Col>
          <Col lg={6} className="ps-lg-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">Our Mission</h6>
            <h2 className="display-6 fw-bold mb-4">Transforming Lives Through Education</h2>
            <p className="text-muted lead mb-4 lh-base">
              EduLMS was founded with a simple yet powerful vision: to democratize education and provide high-quality learning experiences for everyone, regardless of their background or location.
            </p>
            <p className="text-muted mb-5">
              We partner with industry leaders and passionate educators to deliver courses that give our students practical, real-world skills they can use to advance their careers and achieve their goals.
            </p>
            
            <Row className="g-4">
              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="fw-bold mb-0">1M+</h3>
                    <p className="text-muted small mb-0">Learners</p>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="fw-bold mb-0">5K+</h3>
                    <p className="text-muted small mb-0">Premium Courses</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Core Values */}
        <div className="text-center w-75 mx-auto mb-5 mt-5 pt-5">
          <h6 className="text-primary fw-bold text-uppercase tracking-wider">Our Values</h6>
          <h2 className="display-6 fw-bold">What Drives Us Every Day</h2>
        </div>

        <Row className="g-4 mb-5 pb-5">
          {[
            { icon: <Award size={32} />, title: 'Excellence', desc: 'We strive for the highest quality in every course, platform feature, and student interaction.', color: 'text-warning bg-warning' },
            { icon: <Globe size={32} />, title: 'Accessibility', desc: 'Education should be available to everyone. We build for global reach and diverse learning needs.', color: 'text-info bg-info' },
            { icon: <Shield size={32} />, title: 'Trust', desc: 'We build a secure, reliable platform where learners and instructors can interact confidently.', color: 'text-success bg-success' },
            { icon: <TrendingUp size={32} />, title: 'Innovation', desc: 'We continuously improve our technology and pedagogy to deliver the most effective learning experience.', color: 'text-primary bg-primary' },
          ].map((value, idx) => (
            <Col lg={3} md={6} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 text-center p-4 value-card transition hover-3d">
                <Card.Body>
                  <div className={`d-inline-flex align-items-center justify-content-center p-4 rounded-circle bg-opacity-10 mb-4 ${value.color}`} style={{ width: '80px', height: '80px' }}>
                    {value.icon}
                  </div>
                  <h4 className="fw-bold mb-3">{value.title}</h4>
                  <p className="text-muted mb-0">{value.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <style>{`
        .value-card { background: white; transition: all 0.3s ease; }
        .value-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; border-bottom: 3px solid var(--primary); }
      `}</style>
    </div>
  );
};

export default About;
