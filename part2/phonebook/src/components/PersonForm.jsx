const PersonForm = (props) => {
    const {submit, name, phone, handleName, handlePhone} = props
  
    return (
      <form onSubmit={submit}>
        <div>
          name: <input value={name} onChange={handleName}/>
        </div>
        <div>
          number: <input value={phone} onChange={handlePhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
  