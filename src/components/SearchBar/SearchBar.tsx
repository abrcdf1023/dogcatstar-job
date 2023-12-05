import React from 'react'

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement>{

}

const SearchBar = (props: SearchBarProps) => {
  return (
    <input {...props}/>
  )
}

export default SearchBar