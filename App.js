import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Nav, Button, Offcanvas, Container, Row, Col } from "react-bootstrap";
import Login from "./login"; // Assuming you have a login component
import DiscussionForm from "./DiscussionForm";
import DiscussionList from "./DiscussionList";
import PostList from "./PostList";
import PostForm from "./PostForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const App = () => {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPopup, setShowPopup] = useState(false); // For copyright popup

  useEffect(() => {
    const savedDiscussions = JSON.parse(localStorage.getItem("discussions")) || [];
    setDiscussions(savedDiscussions);
  }, []);

  const saveDiscussions = (updatedDiscussions) => {
    setDiscussions(updatedDiscussions);
    localStorage.setItem("discussions", JSON.stringify(updatedDiscussions));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleAddDiscussion = (newDiscussion) => {
    if (!newDiscussion.trim()) {
      showMessage("error", "Discussion topic cannot be empty.");
      return;
    }

    const updatedDiscussions = [
      ...discussions,
      { topic: newDiscussion, posts: [] },
    ];
    saveDiscussions(updatedDiscussions);
    showMessage("success", "Discussion added successfully!");
  };

  const handleAddPost = (discussion, newPost) => {
    if (!newPost.trim()) {
      showMessage("error", "Post cannot be empty.");
      return;
    }

    const updatedDiscussions = discussions.map((d) =>
      d.topic === discussion.topic
        ? {
            ...d,
            posts: [...d.posts, { content: newPost, replies: [], count: 0 }], 
          }
        : d
    );

    saveDiscussions(updatedDiscussions);
    showMessage("success", "Post added successfully!");
  };

  const handleSelectDiscussion = (discussion) => setSelectedDiscussion(discussion);

  const handleDeleteDiscussion = (discussionToDelete) => {
    const updatedDiscussions = discussions.filter(
      (d) => d.topic !== discussionToDelete.topic
    );
    saveDiscussions(updatedDiscussions);
    setSelectedDiscussion(null);
    showMessage("success", "Discussion deleted successfully.");
  };

  const handleDeletePost = (discussion, postToDelete) => {
    const updatedDiscussions = discussions.map((d) =>
      d.topic === discussion.topic
        ? { ...d, posts: d.posts.filter((p) => p.content !== postToDelete.content) }
        : d
    );
    saveDiscussions(updatedDiscussions);
    showMessage("success", "Post deleted successfully.");
  };

  const handleAddReply = (discussion, post, newReply) => {
    const updatedDiscussions = discussions.map((d) =>
      d.topic === discussion.topic
        ? {
            ...d,
            posts: d.posts.map((p) =>
              p.content === post.content
                ? { ...p, replies: [...p.replies, newReply] }
                : p
            ),
          }
        : d
    );
    saveDiscussions(updatedDiscussions);
    showMessage("success", "Reply added successfully.");
  };

  const handleLikeDislike = (discussion, post, value) => {
    const updatedDiscussions = discussions.map((d) =>
      d.topic === discussion.topic
        ? {
            ...d,
            posts: d.posts.map((p) =>
              p.content === post.content ? { ...p, count: p.count + value } : p
            ),
          }
        : d
    );
    saveDiscussions(updatedDiscussions);
    showMessage("success", "Vote updated.");
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Ansh Soni</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/discussions">Discussions</Nav.Link>
              <Button variant="info" onClick={() => setShowPopup(true)}>
                Copyright
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Copyright Popup */}
        <Offcanvas show={showPopup} onHide={() => setShowPopup(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Copyright Information</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>&copy; 2025 Ansh Soni. All rights reserved.</p>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Hero Section */}
        <section
          style={{
            backgroundImage: "url('/Rajasthan.png')",
            backgroundSize: "cover",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <Container>
            <h1>Padharo Mahare Desh!</h1>
            <p><h3>RAJASTHAN</h3></p>
          </Container>
        </section>

        {/* Three-Column Section */}
        <section className="mt-5 mb-5">
          <Container>
            <Row>
              <Col xs={12} sm={6} md={4} className="mb-4">
                <div className="card shadow-sm">
                  <img src="/HAWAMAHAL.png" alt="Image 1" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">HAWA MAHAL</h5>
                    <p className="card-text">
                    Hawa Mahal, located in Jaipur, India, is a stunning five-story palace built in 1799 by Maharaja Sawai Pratap Singh. Known for its unique honeycomb-like structure, it was designed to allow royal women to observe street festivals without being seen.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-4">
                <div className="card shadow-sm">
                  <img src="/UDAIPUR.png" alt="Image 2" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">LAKE PICHOLA</h5>
                    <p className="card-text">
                      Lake Pichola is an artificial lake in Udaipur, Rajasthan, famous for its scenic beauty and historic palaces. It was created in the 14th century and is home to the iconic Lake Palace and Jag Mandir.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-4">
                <div className="card shadow-sm">
                  <img src="/JODHPUR.png" alt="Image 3" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">MEHRANGARH FORT</h5>
                    <p className="card-text">
                    Mehrangarh Fort, located in Jodhpur, Rajasthan, is one of the largest and most impressive forts in India. Built in the 15th century, it offers stunning views of the city and houses a museum showcasing Rajasthan's rich history and culture.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Main Content */}
        <main className="mt-5 pt-4">
          <div className="container">
            {message.text && (
              <div
                className={`alert alert-${
                  message.type === "error" ? "danger" : "success"
                } mt-3`}
              >
                {message.text}
              </div>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      minHeight: "80vh",
                      background: "linear-gradient(180deg, #f7f8fc, #eef2f3)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="login-container">
                      <Login />
                    </div>
                  </div>
                }
              />
              <Route
                path="/discussions"
                element={
                  <div className="row">
                    <div className="col-md-4">
                      <div
                        className="p-3 rounded"
                        style={{
                          backgroundColor: "#f8f9fa",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                      >
                        <DiscussionForm onAddDiscussion={handleAddDiscussion} />
                        <DiscussionList
                          discussions={discussions}
                          onSelectDiscussion={handleSelectDiscussion}
                          onDeleteDiscussion={handleDeleteDiscussion}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      {selectedDiscussion ? (
                        <div
                          className="p-3 rounded"
                          style={{
                            backgroundColor: "#ffffff",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <h4
                            className="text-primary"
                            style={{ borderBottom: "2px solid #6a11cb" }}
                          >
                            {selectedDiscussion.topic}
                          </h4>
                          <PostList
                            posts={selectedDiscussion.posts}
                            discussion={selectedDiscussion}
                            onDeletePost={handleDeletePost}
                            onAddReply={handleAddReply}
                            onLikeDislike={handleLikeDislike}
                          />
                          <PostForm
                            discussion={selectedDiscussion}
                            onAddPost={handleAddPost}
                          />
                        </div>
                      ) : (
                        <p>Select a discussion to view its posts.</p>
                      )}
                    </div>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="text-white text-center py-3"
          style={{
            background: "linear-gradient(90deg, #2575fc, #6a11cb)",
          }}
        >
          <p>&copy; 2025 Discussion Board | Created by Ansh Soni</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
