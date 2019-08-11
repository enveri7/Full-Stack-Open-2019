import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const NewBook = (props) => {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");

  const ADD_NEW_BOOK = gql`
  mutation AddBook($title: String!, $author: String, $published: Int!, $genres: [String]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {title, author, published, genres}
  }
`;

  const ALL_AUTHORS = gql`
{
  allAuthors { name, born, bookCount }
}
`

  const ALL_BOOKS = gql`
{
  allBooks { title, author, published }
}
`

  const [addBook, { data }] = useMutation(ADD_NEW_BOOK, { refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }] });

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    addBook({ variables: { title: e.target.title.value, author: e.target.author.value, published: Number(e.target.published.value), genres: genres } });
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            name="title"
          />
        </div>
        <div>
          author
          <input
            name="author"
          />
        </div>
        <div>
          published
          <input
            type='number'
            name="published"
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook