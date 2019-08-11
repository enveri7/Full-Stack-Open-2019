import React, { useState } from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const Authors = (props) => {

  const ALL_AUTHORS = gql`
  {
    allAuthors { name, born, bookCount }
  }
`

  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const authors = data.allAuthors

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors