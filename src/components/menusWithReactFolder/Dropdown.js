export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => {
  return (
      <select 
        id={id} 
        value={selectedValue} 
        onChange={event => onSelectedValueChange(event.target.value)}
      >
        {options.map(({value, label}, idKey) => (
          <option 
            key={idKey}
            value={value} 
          >
            {label}
          </option>
        ))}
      </select>
  )
}
