import { useSearchParams } from "react-router";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filterField, options}) {
  // useSearchParams is to read and modify the query parameters in the URL.
  // It returns an array with two elements: the current search parameters and a function to update them.
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value; // Default to the first option if no filter is applied

  function handleClick(value) {
    // kreiramo novi objekat sa istim vrednostima kao searchParams(da ne bi uzimali referencu tj. searchParams)
    // ovo { replace: true } nam sluzi da kada kliknemo na BACK dugme u browseru, da se vratimo na prethodnu stranicu, a ne na prethodni filter koji smo kliknuli
    const newParams = new URLSearchParams(searchParams); // nova instanca(objekat) isti kao searchParams
    newParams.set(filterField, value);
    setSearchParams(newParams, { replace: true });
    
    // searchParams.set(filterField, value);
    // setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          type="button"
          $active={currentFilter === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}

export default Filter
