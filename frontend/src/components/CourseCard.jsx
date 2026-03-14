import { Card, Badge, Button } from 'react-bootstrap';
import { Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative group hover-3d">
      <div className="position-relative overflow-hidden">
        <Card.Img 
          variant="top" 
          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          className="course-img"
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-hover" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <Badge bg="primary" className="position-absolute top-3 end-3 rounded-pill px-3 py-2 mt-3 me-3" style={{ fontSize: '0.85rem' }}>
          {course.category || 'Development'}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <div className="d-flex align-items-center gap-1">
            <Clock size={16} className="text-primary" />
            <span>{course.duration || '8 Weeks'}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <Users size={16} className="text-secondary" />
            <span>{course.students || '1,240'} Students</span>
          </div>
        </div>

        <Card.Title className="fw-bold mb-3 lh-base course-title">
          {course.title}
        </Card.Title>

        <p className="text-muted small mb-4 line-clamp-2 flex-grow-1">
          {course.description || "Master the skills needed to build production-ready applications with this comprehensive, hands-on, project-based course taught by industry experts."}
        </p>

        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="d-flex text-warning">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" className="opacity-50" />
          </div>
          <span className="text-dark fw-bold small">4.8</span>
          <span className="text-muted small">(124 reviews)</span>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top border-light">
          <div className="d-flex flex-column">
            <span className="text-muted small text-decoration-line-through">${(course.price * 1.5).toFixed(2) || '149.99'}</span>
            <span className="fw-bold text-primary fs-5 border-0 bg-transparent p-0 m-0">${course.price || '99.99'}</span>
          </div>
          <Button as={Link} to={`/courses/${course._id || course.id || 1}`} variant="outline-primary" className="rounded-pill px-4" style={{ fontWeight: 600 }}>
            Enroll Now
          </Button>
        </div>
      </Card.Body>

      <style>{`
        .course-img { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-3d:hover .course-img { transform: scale(1.1); }
        .opacity-hover { 
          opacity: 0; 
          transition: opacity 0.3s ease; 
          background: linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent) !important;
        }
        .hover-3d:hover .opacity-hover { opacity: 1; }
        .top-3 { top: 1rem; }
        .end-3 { right: 1rem; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .course-title { transition: color 0.2s; font-size: 1.25rem; }
        .hover-3d:hover .course-title { color: var(--primary); }
        .group:hover .btn-outline-primary { background: var(--primary); color: white; }
      `}</style>
    </Card>
  );
};

export default CourseCard;
