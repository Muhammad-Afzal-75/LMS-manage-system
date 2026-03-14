import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Linkedin, Heart, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer bg-white border-top mt-auto py-5" style={{ zIndex: 10 }}>
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <BookOpen className="text-primary" size={28} />
              <h4 className="mb-0 fw-bold text-gradient">EduLMS</h4>
            </div>
            <p className="text-muted pe-md-4">
              Empowering global learning with a modern, fully-featured Learning Management System designed to accelerate skill acquisition and mastery.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://www.instagram.com/shayanjuttt?igsh=MXFpa3IwYjVib3ltdQ==" target="_blank" rel="noopener noreferrer" className="social-icon text-muted transition">
                <Instagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@coding_with_jutt?_r=1&_t=ZS-94fpkxMdErh" target="_blank" rel="noopener noreferrer" className="social-icon text-muted transition">
                <MessageSquare size={24} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-afzal-818636311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-icon text-muted transition">
                <Linkedin size={24} />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mt-4 mt-lg-0">
            <h5 className="fw-bold mb-4">Explore</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/courses" className="text-muted text-decoration-none d-inline-block hover-translate-x">Our Courses</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none d-inline-block hover-translate-x">About Us</Link></li>
              <li><Link to="/" className="text-muted text-decoration-none d-inline-block hover-translate-x">Home</Link></li>
              <li><Link to="/register" className="text-muted text-decoration-none d-inline-block hover-translate-x">Join Now</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mt-4 mt-lg-0">
            <h5 className="fw-bold mb-4">Categories</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><a href="#" className="text-muted text-decoration-none d-inline-block hover-translate-x">Web Development</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-inline-block hover-translate-x">Data Science</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-inline-block hover-translate-x">Design</a></li>
              <li><a href="#" className="text-muted text-decoration-none d-inline-block hover-translate-x">Marketing</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mt-4 mt-lg-0">
            <h5 className="fw-bold mb-4">Contact</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0 text-muted">
              <li>Email: afzalofficial.dev@gmail.com</li>
              <li>Phone: 03070701703</li>
              <li>Address: P Block Sabzazar Lahore</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4 border-light" />
        <div className="d-md-flex align-items-center justify-content-between text-center">
          <p className="mb-0 text-muted small">
            &copy; {new Date().getFullYear()} EduLMS Platform. All rights reserved.
          </p>
          <p className="mb-0 text-muted small mt-2 mt-md-0 d-flex align-items-center justify-content-center gap-1">
            Made with <Heart size={14} className="text-danger mx-1" fill="currentColor" /> by <span className="fw-bold text-gradient">Muhammad Afzal</span>
          </p>
        </div>
      </Container>
      <style>{`
        .hover-translate-x { transition: transform 0.2s; }
        .hover-translate-x:hover { transform: translateX(5px); color: var(--primary) !important; }
        .social-icon { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 45px; 
          height: 45px; 
          background: #f8fafc; 
          border-radius: 12px; 
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .social-icon:hover { 
          background: var(--primary); 
          color: white !important; 
          transform: translateY(-8px) rotate(8deg) scale(1.1);
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
