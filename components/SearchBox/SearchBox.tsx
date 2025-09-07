import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (value: string) => void;
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      onChange={e => {
        onChange(e.target.value);
      }}
      className={css.input}
      type="text"
      name="search"
      placeholder=" Пошук...  "
    />
  );
};

export default SearchBox;
