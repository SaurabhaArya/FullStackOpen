const Persons = ({list, str}) => {
    const filteredList = list.filter(person => person.name.toLowerCase().includes(str.toLowerCase()))
    return (
      <>
        {filteredList.map(person => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </>
    )
}

export default Persons