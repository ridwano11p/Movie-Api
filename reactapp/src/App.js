import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    releaseYear: "",
    rating: "",
    image: "",
  });
  const [modal, setModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    populateMovieData();
  }, []);

  const populateMovieData = async () => {
    try {
      const response = await axios.get("https://localhost:7006/Movie");
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving movies:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7006/Movie",
        formData
      );
      console.log("Movie added successfully:", response.data);
      setMovies((prevMovies) => [...prevMovies, response.data]);
      setFormData({
        name: "",
        releaseYear: "",
        rating: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`https://localhost:7006/Movie/${id}`);
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== id)
        );
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
    window.location.reload();
  };

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    toggleModal();
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7006/Movie/${selectedMovie.id}`,
        selectedMovie
      );
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === selectedMovie.id ? response.data : movie
        )
      );
      toggleModal();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
    window.location.reload();
  };

  const getRatingBoxStyle = (rating) => {
    let color = "green";
    if (rating < 4) {
      color = "red";
    } else if (rating >= 4 && rating <= 6) {
      color = "yellow";
    }

    return {
      backgroundColor: color,
      width: "40px",
      height: "40px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
    };
  };

  const renderMovieGallery = () => (
    <Row>
      {movies.map((movie) => (
        <Col sm="4" key={movie.id}>
          <div className="movie-card">
            <img
              src={movie.image}
              alt={movie.name}
              onClick={() => handleEdit(movie)}
            />
            <div className="movie-info">
              <h5>{movie.name}</h5>
              <p>{movie.releaseYear}</p>
              <div style={getRatingBoxStyle(movie.rating)}>{movie.rating}</div>
              <br></br>
              <Button color="danger" onClick={() => handleDelete(movie.id)}>
                Delete
              </Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  const renderMovieModal = () => (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        {selectedMovie ? "Edit Movie" : "Add Movie"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={selectedMovie?.name || ""}
              onChange={(e) =>
                setSelectedMovie((prevMovie) => ({
                  ...prevMovie,
                  name: e.target.value,
                }))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="releaseYear">Release Year:</Label>
            <Input
              type="text"
              name="releaseYear"
              id="releaseYear"
              value={selectedMovie?.releaseYear || ""}
              onChange={(e) =>
                setSelectedMovie((prevMovie) => ({
                  ...prevMovie,
                  releaseYear: e.target.value,
                }))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating:</Label>
            <Input
              type="text"
              name="rating"
              id="rating"
              value={selectedMovie?.rating || ""}
              onChange={(e) =>
                setSelectedMovie((prevMovie) => ({
                  ...prevMovie,
                  rating: e.target.value,
                }))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Image URL:</Label>
            <Input
              type="text"
              name="image"
              id="image"
              value={selectedMovie?.image || ""}
              onChange={(e) =>
                setSelectedMovie((prevMovie) => ({
                  ...prevMovie,
                  image: e.target.value,
                }))
              }
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {selectedMovie ? (
          <Button color="warning" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button color="success" onClick={handleSubmit}>
            Add
          </Button>
        )}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <Container>
      <h1>Movie Gallery</h1>
      <p>This component demonstrates managing movies in a gallery.</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="releaseYear">Release Year:</Label>
          <Input
            type="text"
            name="releaseYear"
            id="releaseYear"
            value={formData.releaseYear}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Rating:</Label>
          <Input
            type="text"
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image URL:</Label>
          <Input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Add Movie
        </Button>
      </Form>
      <br />
      <br />

      {renderMovieGallery()}
      {renderMovieModal()}
    </Container>
  );
};

export default App;
/*link to get movie images
https://www.cinematerial.com/movies/star-trek-i796366
*/
