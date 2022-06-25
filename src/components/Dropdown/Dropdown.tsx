const Dropdown = ({ value, onChange, options }) => {
  return (
    <select value={value} onChange={(e) => onChange(e)}>
      {options.map((option, index) => (
        <option value={option.value} key={index}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
