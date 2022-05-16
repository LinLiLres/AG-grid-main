import React,{setState} from "react";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieData";
import ReactModal from 'react-modal';

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {},
    showModal: false
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }


  doSubmit = () => {
    const res = saveMovie(this.state.data);
    console.log(this.props.history);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <ReactModal 
        isOpen={true} 
        >
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text", "Please enter the name of movie", "required")}
          {this.renderInput("numberInStock", "Number in Stock", "number","Please enter a number",  "required")}
          {this.renderInput("dailyRentalRate", "Rate", "number", "Please enter a number" , "required")}
          {this.renderButton("Save")}
          </form>
        </div>
        </ReactModal>
    );
  }
}

export default MovieForm;
