import React, { useState } from 'react'

import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks';

const EditAuthor = (props) => {
    const [author, setAuthor] = useState('')
    const [born, setBorn] = useState('')

    const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {name, born}
    }
  `;

    const ALL_AUTHORS = gql`
  {
    allAuthors { name, born, bookCount }
  }
  `

    const [editAuthor, { data }] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] });

    const submit = async (e) => {
        e.preventDefault()
        console.log(`name ${author} born ${born}`)
        editAuthor({ variables: { name: author, setBornTo: Number(born) } });
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    <input
                        placeholder="Author name"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Born"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default EditAuthor