import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Dropdown, Spinner } from 'react-bootstrap';
import { Search, Filter, SortDesc } from 'lucide-react';
import CourseCard from '../../components/CourseCard';
import API from '../../services/api';

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-light pb-5">
      <div className="bg-primary text-white py-5 mb-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--primary), #8b5cf6)' }}>
        <div className="hero-shape shape-1 bg-white opacity-10"></div>
        <Container className="position-relative z-1 py-4 text-center">
          <h1 className="display-5 fw-bold mb-3">Explore Our Courses</h1>
          <p className="lead mb-0 text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
            Find the perfect course to advance your career. We offer high-quality instruction across various technical fields.
          </p>
        </Container>
      </div>

      <Container>
        <Row className="mb-4 align-items-center gy-3">
          <Col lg={6}>
            <InputGroup className="shadow-sm rounded-pill overflow-hidden bg-white border">
              <InputGroup.Text className="bg-transparent border-0 ps-4 text-muted">
                <Search size={20} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search for courses, skills, or instructors..."
                className="border-0 shadow-none py-3"
                style={{ backgroundColor: 'transparent' }}
              />
            </InputGroup>
          </Col>
          <Col lg={6} className="d-flex gap-3 justify-content-lg-end">
            <Dropdown>
              <Dropdown.Toggle variant="white" className="border d-flex align-items-center gap-2 shadow-sm rounded-pill px-4 py-2">
                <Filter size={18} /> Category
              </Dropdown.Toggle>
              <Dropdown.Menu className="border-0 shadow-lg rounded-4 mt-2">
                <Dropdown.Item>All Categories</Dropdown.Item>
                <Dropdown.Item>Web Development</Dropdown.Item>
                <Dropdown.Item>Backend</Dropdown.Item>
                <Dropdown.Item>Database</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="white" className="border d-flex align-items-center gap-2 shadow-sm rounded-pill px-4 py-2">
                <SortDesc size={18} /> Sort By
              </Dropdown.Toggle>
              <Dropdown.Menu className="border-0 shadow-lg rounded-4 mt-2">
                <Dropdown.Item>Most Popular</Dropdown.Item>
                <Dropdown.Item>Newest</Dropdown.Item>
                <Dropdown.Item>Price: Low to High</Dropdown.Item>
                <Dropdown.Item>Price: High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {loading ? (
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading courses...</p>
            </Col>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Col lg={4} md={6} key={course._id || course.id}>
                <CourseCard course={course} />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h4 className="text-muted">No courses found.</h4>
            </Col>
          )}
        </Row>

        <div className="d-flex justify-content-center text-center mt-5">
          <button className="btn btn-outline-primary rounded-pill px-5 fw-bold d-inline-flex align-items-center gap-2">
            Load More Courses
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CourseListing;
